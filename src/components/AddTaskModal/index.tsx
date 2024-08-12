import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";

import { toggleModal } from "../../store/modalsSlice";
import { addTask, fetchTasksByUserId } from "../../store/tasksSlice";
import { AppDispatch } from "../../store/store";
import { AddTaskFormSchema } from "../../schemas";
import { AddTaskFormValues } from "../../models";

import Button from "../Button";

// ----------------------  END IMPORTS ---------------------------------

function AddTaskModal() {

  const dispatch = useDispatch<AppDispatch>();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AddTaskFormValues>({ resolver: yupResolver(AddTaskFormSchema) });

  const onSubmit: SubmitHandler<AddTaskFormValues> = (data) => {
    // Save task to DB
    const token = localStorage.getItem("token");

    dispatch(addTask({ token: token!, newTask: { ...data, isCompleted: false } }))
      .then((response) => {
        if (response.type === "addTask/fulfilled") {
          // Reload tasks
          dispatch(fetchTasksByUserId({ token: token! }));

          // Close Add Task modal
          dispatch(toggleModal({ modalName: "addTaskModal", showModal: false }));
        }
      });
  }

  return (

    <div className="AddTaskModal bg-neutral-100 bordered h-fit w-[50%] pl-4 pr-2 pb-4 absolute right-0 left-0 top-0 bottom-0 m-auto">

      <div className="w-full flex justify-end">
        <i className="bi-x text-icon-large" onClick={() => dispatch(toggleModal({ modalName: "addTaskModal", showModal: false }))} />
      </div>

      <form className="mx-2" onSubmit={handleSubmit(onSubmit)}>

        {/* Details */}
        <div className="TextBoxInput flex flex-col mb-1 md:mb-3 pt-4">
          <input
            {...register("details", { required: true })}
            type="text"
            className="font-tabular font-medium text-inputText w-full p-1.5 border border-neutral-0 rounded-md focus:outline-none placeholder:italic placeholder:text-neutral-40 placeholder:font-normal"
            placeholder="Task description"></input>
          <p className={"font-tabular text-small " + (errors.details ? "text-red-pure" : "invisible")}>
            {errors.details?.message || "Placeholder"}
          </p>
        </div>

        {/* "Important" Checkbox */}
        <div className="CheckBoxInput flex items-center">
          <input
            id="isImportant"
            type="checkbox"
            {...register("isImportant")} />
          <label htmlFor="isImportant" className="font-tabular text-small ml-2">Mark as important</label>
        </div>

        {/* "Add Task" button */}
        <div className="w-full text-center pt-4">
          <Button text="Add Task" />
        </div>

      </form>

    </div>

  );

}

export default AddTaskModal;