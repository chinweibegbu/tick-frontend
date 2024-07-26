import { useEffect, useState } from "react";

import ButtonWithIcons from "../../components/ButtonWithIcon";
import Task from "../../components/Task";
import AddTaskModal from "../../components/AddTaskModal";
import EditTaskModal from "../../components/EditTaskModal";
import DeleteTaskConfirmModal from "../../components/DeleteTaskConfirmModal";

type DashboardProps = {
    setIsLoggedIn: Function
}

const tasks = [
    {
        details: "Design a simple to-do list application with login functionality",
        isImportant: false
    },
    {
        details: "Implement the frontend of the designed to-do list application",
        isImportant: false
    },
    {
        details: "Implement the backend of the designed to-do list application",
        isImportant: false
    },
    {
        details: "See Mr Awe for an update of Week 1",
        isImportant: true
    },
    {
        details: "Go to the bank",
        isImportant: true
    }
];

function Dashboard({ setIsLoggedIn }: DashboardProps) {
    const [showAddTaskModal, setShowAddTaskModal] = useState(false);
    const toggleAddTaskModal = (mode: boolean) => {
        // console.log(showAddTaskModal ? "Hid add modal" : "Showed add modal")
        setShowAddTaskModal(mode);
    }

    const [showEditTaskModal, setShowEditTaskModal] = useState(false);
    const toggleEditTaskModal = (mode: boolean) => {
        // console.log(showEditTaskModal ? "Hid edit modal" : "Showed edit modal")
        setShowEditTaskModal(mode);
    }

    const [showDeleteTaskConfirmModal, setShowDeleteTaskConfirmModal] = useState(false);
    const toggleDeleteTaskConfirmModal = (mode: boolean) => {
        // console.log(showDeleteTaskConfirmModal ? "Hid delete confirm modal" : "Showed delete confirm modal")
        setShowDeleteTaskConfirmModal(mode);
    }

    useEffect(()=> {
        setIsLoggedIn(true);
    });

    return (
        <>
            <div className={"Dashboard h-full" + ((showAddTaskModal || showEditTaskModal || showDeleteTaskConfirmModal) ? " blur-lg" : "")}>
                <div className="flex flex-col-reverse md:flex-row md:items-center justify-between mb-3">
                    <p className="font-exo font-medium text-heading mt-3 md:mt-0">My Tasks</p>
                    <ButtonWithIcons text="Add Icon" iconClass="plus" handleClick={() => toggleAddTaskModal(true)} />
                </div>
                <div className="last:mb-4">
                    {
                        tasks.map((task, key) => {
                            return <Task
                                toggleEditTaskModal={toggleEditTaskModal}
                                toggleDeleteTaskConfirmModal={toggleDeleteTaskConfirmModal}
                                key={key}
                                {...task} />
                        })
                    }
                </div>
            </div>
            {
                showAddTaskModal ?
                    <AddTaskModal toggleAddTaskModal={toggleAddTaskModal} />
                    : null
            }
            {
                showEditTaskModal ?
                    <EditTaskModal toggleEditTaskModal={toggleEditTaskModal} />
                    : null
            }
            {
                showDeleteTaskConfirmModal ?
                    <DeleteTaskConfirmModal toggleDeleteTaskConfirmModal={toggleDeleteTaskConfirmModal} />
                    : null
            }
        </>
    );
}

export default Dashboard;