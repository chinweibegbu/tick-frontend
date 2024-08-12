import { useState } from "react";
import { useDispatch } from "react-redux";

import { toggleCompleteTask, getTaskById, fetchTasksByUserId } from "../../store/tasksSlice";
import { toggleModal } from "../../store/modalsSlice";
import { AppDispatch } from "../../store/store";
import { TaskProps } from "../../models";

// ----------------------  END IMPORTS ---------------------------------

function Task({ id, details, isImportant, isCompleted }: TaskProps) {

    const dispatch = useDispatch<AppDispatch>();

    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    return (
        <div className={"Task flex items-center justify-between content-center bg-neutral-20 rounded-md mb-2 p-3 " + (isImportant ? " border-neutral-0 border-2" : "")}>
            <div className="flex dropdown">
                <i
                    className={"mr-2" + (isCompleted ? " bi-check-square-fill" : " bi-square")}
                    onClick={() => {
                        const token = localStorage.getItem("token");
                        dispatch(toggleCompleteTask({ token: token!, taskId: id! }))
                        .then((response) => {
                            if (response.type === "toggleCompleteTask/fulfilled") {
                              // Reload tasks
                              dispatch(fetchTasksByUserId({ token: token! }));
                            }
                          });
                    }}
                />
                <p className={"font-tabular font-medium" + (isCompleted ? " line-through" : "") + (isDropdownVisible ? " font-bold" : "")}>
                    {details}
                </p>
            </div>

            <div className="TaskOptions">
                <i
                    className="bi-three-dots-vertical text-icon-regular ml-2"
                    id="taskOptionsButton"
                    aria-expanded={isDropdownVisible}
                    aria-haspopup="true"
                    onClick={toggleDropdown}
                />
                {
                    isDropdownVisible &&
                    (
                        <div
                            className="absolute ruonded-md bg-neutral-100 border border-neutral-70 rounded-md"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="taskOptionsButton"
                            tabIndex={-1}>
                            <div role="none">
                                <div
                                    className="flex p-2 text-green-light border border-neutral-100 rounded-t-md hover:cursor-pointer hover:text-green hover:bg-neutral-20"
                                    role="menuitem"
                                    tabIndex={-1}
                                    onClick={() => {
                                        // Update the id to get
                                        dispatch(getTaskById(id!));

                                        // Toggle EditTask Modal to show
                                        dispatch(toggleModal({ modalName: "editTaskModal", showModal: true, potentialTaskId: id }));

                                        // Hide dropdown
                                        setIsDropdownVisible(false);
                                    }}>
                                    <i className="bi-pencil"></i> <p className="ms-2">Edit</p>
                                </div>
                                <div
                                    className="flex p-2 text-red-light border border-neutral-100 rounded-b-md hover:cursor-pointer hover:text-red hover:bg-neutral-20"
                                    role="menuitem"
                                    tabIndex={-1}
                                    onClick={() => {
                                        // Toggle DeleteTaskConfirm Modal to show
                                        dispatch(toggleModal({ modalName: "deleteTaskConfirmModal", showModal: true, potentialTaskId: id }));

                                        // Hide dropdown
                                        setIsDropdownVisible(false);
                                    }}>
                                    <i className="bi-trash"></i> <p className="ms-2">Delete</p>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Task;
