import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchTasks } from "../../store/tasksSlice";
import { toggleModal } from "../../store/modalsSlice";
import { AppDispatch, RootState } from "../../store/store";
import { DashboardProps } from "../../models";

import ButtonWithIcons from "../../components/ButtonWithIcon";
import Task from "../../components/Task";
import AddTaskModal from "../../components/AddTaskModal";
import EditTaskModal from "../../components/EditTaskModal";
import DeleteTaskConfirmModal from "../../components/DeleteTaskConfirmModal";

// ----------------------  END IMPORTS ---------------------------------

function Dashboard({ setIsLoggedIn }: DashboardProps) {
    const dispatch = useDispatch<AppDispatch>();

    // Load user's tasks
    const { tasks } = useSelector((state: RootState) => state.tasksReducer);
    const { showAddTaskModal, showEditTaskModal, showDeleteTaskConfirmModal } = useSelector((state: RootState) => state.modalsReducer);

    useEffect(() => {
        // Fetch all tasks
        dispatch(fetchTasks()).then(() => {
            // Update logged in status
            setIsLoggedIn(true);
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
                <div className="last:mb-4">
                    {
                        // tasks?.map(...) --> Map tasks only when tasks is not `undefined`
                        tasks?.map((task, key) => {
                            return <Task
                                key={key}
                                {...task} />
                        })
                    }
                </div>
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