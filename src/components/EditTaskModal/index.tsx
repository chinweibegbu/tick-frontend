import { useForm, SubmitHandler } from "react-hook-form";

import Button from "../Button";

type EditTaskModalProps = {
  toggleEditTaskModal: Function
}

type FormValues = {
  details: string
  isImportant: boolean
}

function EditTaskModal({ toggleEditTaskModal }: EditTaskModalProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // Edit task in DB
    console.log(data);

    // Go to dashboard
    toggleEditTaskModal(false);
  }

  return (

    <div className="EditTaskModal bg-neutral-100 bordered h-fit w-[50%] pl-4 pr-2 pb-4 absolute right-0 left-0 top-0 bottom-0 m-auto">

      <div className="w-full flex justify-end">
        <i className="bi-x text-icon-large" onClick={() => toggleEditTaskModal(false)} />
      </div>

      <form className="mx-2" onSubmit={handleSubmit(onSubmit)}>

        {/* Details */}
        <div className="TextBoxInput flex flex-col mb-1 md:mb-3 pt-4">
          <input
            {...register("details", { required: true })}
            type="text"
            className="font-tabular font-medium text-inputText w-full p-1.5 border border-neutral-0 rounded-md focus:outline-none placeholder:italic placeholder:text-neutral-40 placeholder:font-normal"
            placeholder="Task description"></input>
          <p className={"font-tabular text-small " + (errors.details ? "text-red-pure" : "text-neutral-100")}>
            This field is required
          </p>
        </div>

        {/* "Important" Checkbox */}
        <div className="CheckBoxInput flex items-center">
          <input 
          id="isImportant"
          type="checkbox"
          value="" className=""
          {...register("isImportant")} />
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