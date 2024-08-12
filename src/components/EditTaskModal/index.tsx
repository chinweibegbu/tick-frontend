import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";

import { toggleModal } from "../../store/modalsSlice";
import { getTaskById, editTask, fetchTasksByUserId } from "../../store/tasksSlice";
import { AppDispatch, RootState } from "../../store/store";
import { EditTaskFormSchema } from "../../schemas";
import { EditTaskFormValues } from "../../models";

import Button from "../Button";

// ----------------------  END IMPORTS ---------------------------------

function EditTaskModal() {

  const dispatch = useDispatch<AppDispatch>();
  const { currentTask } = useSelector((state: RootState) => state.tasksReducer);
  const { taskIdToEdit } = useSelector((state: RootState) => state.modalsReducer);

  const [details, setDetails] = useState(currentTask.details);
  const [isImportant, setIsImportant] = useState(currentTask.isImportant);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<EditTaskFormValues>({
    defaultValues: {
      details: currentTask.details,
      isImportant: currentTask.isImportant
    },
    resolver: yupResolver(EditTaskFormSchema)
  });

  const onSubmit: SubmitHandler<EditTaskFormValues> = (data) => {
    // Edit task in DB
    const token = localStorage.getItem("token");
    dispatch(editTask({ token: token!, updatedTask: { ...currentTask, details: data.details, isImportant: data.isImportant } }))
      .then((response) => {
        if (response.type === "editTask/fulfilled") {
          // Reload tasks
          dispatch(fetchTasksByUserId({ token: token! }));

          // Close Edit Task modal
          dispatch(toggleModal({ modalName: "editTaskModal", showModal: false }));
        }
      });
  }

  // Load Task data
  useEffect(() => {
    // Fetch the potential Task to be edited
    dispatch(getTaskById(taskIdToEdit));
    setDetails(currentTask.details);
    setIsImportant(currentTask.isImportant);
  }, [taskIdToEdit]);

  return (

    <div className="EditTaskModal bg-neutral-100 bordered h-fit w-[50%] pl-4 pr-2 pb-4 absolute right-0 left-0 top-0 bottom-0 m-auto">

      <div className="w-full flex justify-end">
        <i className="bi-x text-icon-large" onClick={() => dispatch(toggleModal({ modalName: "editTaskModal", showModal: false }))} />
      </div>

      <form className="mx-2" onSubmit={handleSubmit(onSubmit)}>

        {/* Details */}
        <div className="TextBoxInput flex flex-col mb-1 md:mb-3 pt-4">
          <input
            {...register("details", { required: true })}
            type="text"
            className={"font-tabular font-medium text-inputText w-full p-1.5 border border-neutral-0 rounded-md focus:outline-none placeholder:italic placeholder:text-neutral-40 placeholder:font-normal" + (currentTask.isCompleted ? " line-through" : "")}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          ></input>
          <p className={"font-tabular text-small " + (errors.details ? "text-red-pure" : "invisible")}>
            {errors.details?.message || "Placeholder"}
          </p>
        </div>

        {/* "Important" Checkbox */}
        <div className="CheckBoxInput flex items-center">
          <input
            {...register("isImportant")}
            id="isImportant"
            type="checkbox"
            checked={isImportant}
            onChange={(e) => setIsImportant(e.target.checked)}
          />
          <label htmlFor="isImportant" className="font-tabular text-small ml-2">Mark as important</label>
        </div>

        {/* "Edit Task" button */}
        <div className="w-full text-center pt-4">
          <Button text="Edit Task" />
        </div>

      </form>

    </div>

  );

}

export default EditTaskModal;