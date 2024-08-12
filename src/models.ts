import { AxiosError, AxiosResponse } from "axios"
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
export type AddTaskFormValues = {
    details: string
    isImportant: boolean
}

export type EditTaskFormValues = {
    details: string
    isImportant: boolean
}

export type showModalModel = {
    modalName: string
    showModal: boolean
    potentialTaskId?: number
}

// UI Components
export type ContainerProps = {
    children: ReactNode
}

export interface TaskModel {
    taskId?: number
    details: string
    isImportant: boolean
    isCompleted: boolean
}

export type TaskProps = {
    taskId?: number
    details: string
    isImportant: boolean
    isCompleted: boolean
}

export type UserModel = {
    defaultRole: number
    defaultRoleMeaning: string
    email: string
    expiresIn: number
    expiryDate: string
    firstName: string
    id: string
    isActive: boolean
    isLoggedIn: boolean
    jwToken: string
    lastLoginTime: string
    lastName: string
    username: string
}


export type HeaderProps = {
    goToPage: MouseEventHandler
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

// API Calls
export interface ApiCallResponse<T> {
    data?: ApiResponse<T>;
    error?: AxiosError;
}

// How Victor would approach it:
//
// export type GetTasksByUserIdApiResponse = ApiResponse<TaskModel[]>
// export interface ApiCallResponse<T> {
//     data?: GetTasksByUserIdResponse;
//     error?: AxiosError;
// }

export interface ApiResponse<T> {
    code: number
    data: T
    errors: AxiosError
    message: string
    succeeded: boolean
    pageMeta?: PageMeta
}

export interface PageMeta {
    pageNumber: number
    pageSize: number
    totalRecords: number
    totalPages: number
}