import { useDispatch, useSelector } from "react-redux";

import { toggleModal } from "../../store/modalsSlice";
import { deleteTask, fetchTasksByUserId } from "../../store/tasksSlice";
import { AppDispatch, RootState } from "../../store/store";

import Button from "../Button";
import ButtonWithLoader from "../ButtonWithLoader";
import { notifyError } from "../../utils/notifications";

// ----------------------  END IMPORTS ---------------------------------

function DeleteTaskConfirmModal() {

  const dispatch = useDispatch<AppDispatch>();
  const { taskIdToDelete } = useSelector((state: RootState) => state.modalsReducer);
  const { loading } = useSelector((state: RootState) => state.tasksReducer);

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
          {
            loading
              ? <ButtonWithLoader isDelete={true} text="Deleting Task" />
              : <Button isDelete={true} text="Yes" handleClick={() => {
                // Edit task in DB
                const token = localStorage.getItem("token");
                dispatch(deleteTask({ token: token!, taskId: taskIdToDelete }))
                  .then((response) => {
                    if (response.type === "deleteTask/fulfilled") {
                      // Reload tasks
                      dispatch(fetchTasksByUserId({ token: token! }));

                      // Close Edit Task modal
                      dispatch(toggleModal({ modalName: "deleteTaskConfirmModal", showModal: false }));
                    }

                    if (response.type === "deleteTask/rejected") {
                      // Toggle error toast
                      notifyError("Error while deleting task");
                    }
                  });
              }} />
          }

        </div>
      </div>

    </div>

  );

}

export default DeleteTaskConfirmModal;