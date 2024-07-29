import { MouseEventHandler, ReactNode } from "react"

// Landing Forms
export type SigninProps = {
    goToPage: Function
}

export type SigninFormValues = {
    email: string
    password: string
}

export type SignupProps = {
    goToPage: Function
}

export type SignupFormValues = {
    firstName: string
    lastName: string
    email: string
    password: string
}

// Dashboard Forms
export type DashboardProps = {
    setIsLoggedIn: Function
}

export type AddTaskModalProps = {
    toggleModal: Function
    addTask: Function
}

export type AddTaskFormValues = {
    details: string
    isImportant: boolean
}

export type EditTaskModalProps = {
    toggleModal: Function
    taskId: number
    tasks: Array<TaskModel>
    editTask: Function
}

export type EditTaskFormValues = {
    details: string
    isImportant: boolean
}

export type DeleteTaskConfirmModalProps = {
    toggleModal: Function
    deleteTask: MouseEventHandler
}

// UI Components
export type ContainerProps = {
    children: ReactNode
}

export interface TaskModel {
    taskId: number
    details: string
    isImportant: boolean
    isCompleted: boolean
}

export type TaskProps = {
    taskId: number
    details: string
    isImportant: boolean
    isCompleted: boolean
    toggleModal: Function
    tasks: Array<TaskModel>
    setTasks: Function
}


export type HeaderProps = {
    goToPage: MouseEventHandler
    isLoggedIn: boolean
}

export type LandingProps = {
    setIsLoggedIn: Function
}

export type ButtonProps = {
    text: string
    handleClick?: MouseEventHandler
    isDelete?: boolean
}

export type ButtonWithIconsProps = {
    text: string
    iconClass: string
    handleClick?: MouseEventHandler
}

export type LinkTextProps = {
    text: string
    path?: string
    goToPage: Function
}