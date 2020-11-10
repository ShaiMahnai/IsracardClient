import {Action} from 'redux';
import {Task} from "../models/Task";
import {TasksState} from "./reducer";
import {UploadStatus} from "../components";

export interface ApplicationState {
    tasksReducer: TasksState;
}


export interface AddTaskRequest extends Action {
    type: 'AddTaskRequest';
    payload: FormData;
}

export interface AddTaskSuccess extends Action {
    type: 'AddTaskSuccess';
    task: Task;
}

export interface AddTaskError extends Action {
    type: 'AddTaskError';
    error: string
}

export interface SetUploadStatus extends Action {
    type: 'SetUploadStatus';
    uploadStatus: UploadStatus
}


export type ApplicationAction =
    | AddTaskRequest
    | AddTaskSuccess
    | AddTaskError
    | SetUploadStatus