import { useDispatch, useSelector } from "react-redux";

import { toggleModal } from "../../store/modalsSlice";
import { deleteTask } from "../../store/tasksSlice";
import { AppDispatch, RootState } from "../../store/store";

import Button from "../Button";

// ----------------------  END IMPORTS ---------------------------------

function DeleteTaskConfirmModal() {
  
  const dispatch = useDispatch<AppDispatch>();
  const { taskIdToDelete } = useSelector((state: RootState) => state.modalsReducer);

  return (

    <div className="DeleteTaskConfirmModal bg-neutral-100 bordered h-fit w-[50%] pl-4 pr-2 pb-4 absolute right-0 left-0 top-0 bottom-0 m-auto">

      <div className="w-full flex justify-end">
        <i className="bi-x text-icon-large" onClick={() => dispatch(toggleModal({ modalName: "deleteTaskConfirmModal", showModal: false }))} />
      </div>

      <div className="mx-2 text-center">
        {/* Confirmation Message */}
        <p className="font-tabular font-medium text-regular">Are you sure you want to delete this task?</p>
        <p className="font-tabular text-small">This is an irreversible action</p>

        {/* "Delete Task" button */}
        <div className="w-full pt-4"> 
          <Button isDelete={true} text="Yes" handleClick={() => {
            // Delete task from DB
            dispatch(deleteTask(taskIdToDelete));

            // Close Delete Task Cofirm Modal
            dispatch(toggleModal({ modalName: "deleteTaskConfirmModal", showModal: false }));
          }} />
        </div>
      </div>

    </div>

  );

}

export default DeleteTaskConfirmModal;