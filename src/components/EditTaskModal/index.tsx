import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import { EditTaskFormSchema } from "../../schemas";
import { EditTaskModalProps, EditTaskFormValues } from "../../models";
import Button from "../Button";

function EditTaskModal({ toggleModal, taskId, tasks, editTask }: EditTaskModalProps) {
  // Load Task data
  const [taskData, setTaskData] = useState({
    taskId: 0,
    details: "N/A",
    isImportant: false,
    isCompleted: false
  });
  useEffect(() => {
    setTaskData((tasks.find(task => task.taskId === taskId))!);
  }, [taskId, tasks]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<EditTaskFormValues>({
    defaultValues: {
      details: taskData.details,
      isImportant: taskData.isImportant
    }, 
    resolver: yupResolver(EditTaskFormSchema)
  });

  const onSubmit: SubmitHandler<EditTaskFormValues> = (data) => {
    // Edit task in DB
    editTask({ ...taskData, details: data.details, isImportant: data.isImportant });

    // Close Edit Task modal
    toggleModal(false, "editTask");
  }

  return (

    <div className="EditTaskModal bg-neutral-100 bordered h-fit w-[50%] pl-4 pr-2 pb-4 absolute right-0 left-0 top-0 bottom-0 m-auto">

      <div className="w-full flex justify-end">
        <i className="bi-x text-icon-large" onClick={() => toggleModal(false, "editTask")} />
      </div>

      <form className="mx-2" onSubmit={handleSubmit(onSubmit)}>

        {/* Details */}
        <div className="TextBoxInput flex flex-col mb-1 md:mb-3 pt-4">
          <input
            {...register("details", { required: true })}
            type="text"
            className={"font-tabular font-medium text-inputText w-full p-1.5 border border-neutral-0 rounded-md focus:outline-none placeholder:italic placeholder:text-neutral-40 placeholder:font-normal" + (taskData.isCompleted ? " line-through" : "")}
            value={taskData.details}
            onChange={(e) => setTaskData({ ...taskData, details: e.target.value })}
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
            checked={taskData.isImportant ? true : false}
            onChange={(e) => setTaskData({ ...taskData, isImportant: e.target.checked })}
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