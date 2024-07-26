import { useForm, SubmitHandler } from "react-hook-form";

import Button from "../Button";

type DeleteTaskConfirmModalProps = {
  toggleDeleteTaskConfirmModal: Function
}

type FormValues = {
  details: string
  isImportant: boolean
}

function DeleteTaskConfirmModal({ toggleDeleteTaskConfirmModal }: DeleteTaskConfirmModalProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>();


  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // Delete task from DB
    console.log(data);

    // Go to dashboard
    toggleDeleteTaskConfirmModal(false);
  }

  return (

    <div className="DeleteTaskConfirmModal bg-neutral-100 bordered h-fit w-[50%] pl-4 pr-2 pb-4 absolute right-0 left-0 top-0 bottom-0 m-auto">

      <div className="w-full flex justify-end">
        <i className="bi-x text-icon-large" onClick={() => toggleDeleteTaskConfirmModal(false)} />
      </div>

      <form className="mx-2 text-center" onSubmit={handleSubmit(onSubmit)}>

        {/* Confirmation Message */}
        <p className="font-tabular font-medium text-regular">Are you sure you want to delete this task?</p>
        <p className="font-tabular text-small">This is an irreversible action</p>

        {/* "Add Task" button */}
        <div className="w-full pt-4">
          <Button isDelete={true} text="Yes" />
        </div>

      </form>

    </div>

  );

}

export default DeleteTaskConfirmModal;