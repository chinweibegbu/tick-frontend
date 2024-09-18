import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchTasksByUserId } from "../../store/tasksSlice";
import { toggleModal } from "../../store/modalsSlice";
import { AppDispatch, RootState } from "../../store/store";

import ButtonWithIcons from "../../components/ButtonWithIcon";
import Task from "../../components/Task";
import AddTaskModal from "../../components/AddTaskModal";
import EditTaskModal from "../../components/EditTaskModal";
import DeleteTaskConfirmModal from "../../components/DeleteTaskConfirmModal";
import SpinningLoader from "../../components/SpinningLoader";
import { notifyError } from "../../utils/notifications";

// ----------------------  END IMPORTS ---------------------------------

function Dashboard() {

    const dispatch = useDispatch<AppDispatch>();
    const { tasks, loading } = useSelector((state: RootState) => state.tasksReducer);
    const { showAddTaskModal, showEditTaskModal, showDeleteTaskConfirmModal } = useSelector((state: RootState) => state.modalsReducer);

    useEffect(() => {
        // Fetch tasks by userId
        const token = localStorage.getItem("token");
        dispatch(fetchTasksByUserId({ token: token! }))
            .then((response) => {
                if (response.type === "fetchTasksByUserId/rejected") {
                    // Toggle error toast
                    notifyError("Error while loading user's tasks");
                  }
            });
    }, []);

    return (
        <>
            <div className={"Dashboard h-full" + ((showAddTaskModal || showEditTaskModal || showDeleteTaskConfirmModal) ? " blur-lg" : "")}>
                <div className="flex flex-col-reverse md:flex-row md:items-center justify-between mb-3">
                    <div>
                        <p className="font-exo font-medium text-heading mt-3 md:mt-0">My Tasks</p>
                        <p className="font-tabular text-small">KEY: Bold border - Important</p>
                    </div>
                    <ButtonWithIcons
                        text="Add Task"
                        iconClass="plus"
                        handleClick={() => dispatch(toggleModal({ modalName: "addTaskModal", showModal: true }))}
                    />
                </div>

                {
                    (loading)
                        ? <div className="w-full flex justify-center py-10">
                            <SpinningLoader />
                        </div>
                        : (tasks.length > 0)
                            ? <div className="last:mb-4">
                                {tasks.map((task, key) => {
                                    return <Task
                                        key={key}
                                        {...task} />
                                })}
                            </div>
                            : <div className="flex flex-col justify-center items-center min-h-[calc(100%-100px)]">
                                <img className="h-[20vh] mr-4" src="no-data.png" alt="Black person with an afro sitting" />
                                <p className="font-tabular text-small mb-5">No Tasks Yet</p>
                            </div>
                }

            </div>
            {
                showAddTaskModal && <AddTaskModal />
            }
            {
                showEditTaskModal && <EditTaskModal />
            }
            {
                showDeleteTaskConfirmModal && <DeleteTaskConfirmModal />
            }
        </>
    );
}

export default Dashboard;