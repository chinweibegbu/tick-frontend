import { useEffect, useState } from "react";

import { DashboardProps, TaskModel } from "../../models";
import ButtonWithIcons from "../../components/ButtonWithIcon";
import Task from "../../components/Task";
import AddTaskModal from "../../components/AddTaskModal";
import EditTaskModal from "../../components/EditTaskModal";
import DeleteTaskConfirmModal from "../../components/DeleteTaskConfirmModal";

const fetchedTasks: Array<TaskModel> = [
    {
        taskId: 1,
        details: "Design a simple to-do list application with login functionality",
        isImportant: false,
        isCompleted: false
    },
    {
        taskId: 2,
        details: "Implement the frontend of the designed to-do list application",
        isImportant: false,
        isCompleted: false
    },
    {
        taskId: 3,
        details: "Implement the backend of the designed to-do list application",
        isImportant: false,
        isCompleted: false
    },
    {
        taskId: 4,
        details: "See Mr Awe for an update of Week 1",
        isImportant: true,
        isCompleted: false
    },
    {
        taskId: 5,
        details: "Go to the bank",
        isImportant: true,
        isCompleted: false
    },
    {
        taskId: 6,
        details: "Complete yesterday's task",
        isImportant: false,
        isCompleted: true
    }
];

function Dashboard({ setIsLoggedIn }: DashboardProps) {

    // Load user's tasks
    const [tasks, setTasks] = useState(Array<TaskModel>);
    useEffect(() => {
        // Fetch all tasks
        setTasks(fetchedTasks);

        // Update logged in status
        setIsLoggedIn(true);
    }, []);

    const [showModals, setShowModals] = useState({
        "addTask": false,
        "editTask": false,
        "deleteTaskConfirm": false
    });

    const [taskIdToEdit, setTaskIdToEdit] = useState(-1);
    const [taskIdToDelete, setTaskIdToDelete] = useState(-1);

    const toggleModal = (mode: boolean, modalToOpen: string, potentialTaskId?: number) => {
        switch (modalToOpen) {
            case "addTask":
                // Show the "Add Task" modal
                setShowModals({
                    ...showModals,
                    "addTask": mode
                });

                // Break out of case
                break;
            case "editTask":
                // Update the taskToEdit
                setTaskIdToEdit(potentialTaskId!);

                // Show the Edit Task modal
                // Show the "Add Task" modal
                setShowModals({
                    ...showModals,
                    "editTask": mode
                });

                // Break out of case
                break;
            case "deleteTaskConfirm":
                // Update taskIdToDelete
                setTaskIdToDelete(potentialTaskId!);

                // Show the Delete Task Confirm modal
                // Show the "Add Task" modal
                setShowModals({
                    ...showModals,
                    "deleteTaskConfirm": mode
                });

                // Break out of case
                break;
            default:

        }
    }

    const addTask = (newTaskData: any) => {
        // Add new Task to array of tasks
        setTasks((prevState: any) => [{taskId:7, isCompleted:false, ...newTaskData}, ...prevState]);
    }  

    const editTask = (updatedTaskData: any) => {
        // Replace task or keep depending on whether it is being edited
        setTasks((prevState: any) => prevState.map((task: any) => {
            if (task.taskId === taskIdToEdit) {
                return updatedTaskData;
            } else {
                return task;
            }
        }));
    }

    const deleteTask = () => {
        // Delete task from the DB
        setTasks(tasks.filter((task => task.taskId != taskIdToDelete)));

        // Hide the Delete Task Confirm modal
        setShowModals({
            ...showModals,
            "deleteTaskConfirm": false
        });
    }

    return (
        <>
            <div className={"Dashboard h-full" + ((showModals["addTask"] || showModals["editTask"] || showModals["deleteTaskConfirm"]) ? " blur-lg" : "")}>
                <div className="flex flex-col-reverse md:flex-row md:items-center justify-between mb-3">
                    <div>
                        <p className="font-exo font-medium text-heading mt-3 md:mt-0">My Tasks</p>
                        <p className="font-tabular text-small">KEY: Bold border - Important</p>
                    </div>
                    <ButtonWithIcons text="Add Task" iconClass="plus" handleClick={() => toggleModal(true, "addTask")} />
                </div>
                <div className="last:mb-4">
                    {
                        tasks.map((task, key) => {
                            return <Task
                                key={key}
                                {...task}
                                toggleModal={toggleModal}
                                tasks={tasks}
                                setTasks={setTasks} />
                        })
                    }
                </div>
            </div>
            {
                showModals["addTask"] ?
                    <AddTaskModal toggleModal={toggleModal} addTask={addTask} />
                    : null
            }
            {
                showModals["editTask"] ?
                    <EditTaskModal toggleModal={toggleModal} taskId={taskIdToEdit} tasks={tasks} editTask={editTask} />
                    : null
            }
            {
                showModals["deleteTaskConfirm"] ?
                    <DeleteTaskConfirmModal toggleModal={toggleModal} deleteTask={deleteTask} />
                    : null
            }
        </>
    );
}

export default Dashboard;