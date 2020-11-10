import {AddTaskRequest, AddTaskError, AddTaskSuccess, SetUploadStatus} from './types';
import {Task} from "../models/Task";
import {UploadStatus} from "../components";


export const addTaskRequest = (formData: FormData): AddTaskRequest => ({
    type: 'AddTaskRequest',
    payload: formData,
});

export const addTaskSuccess = (task: Task): AddTaskSuccess => ({
    type: 'AddTaskSuccess',
    task,
});

export const addTaskError = (error: string): AddTaskError => ({
    type: 'AddTaskError',
    error
});
export const setUploadStatus = (uploadStatus: UploadStatus): SetUploadStatus => ({
    type: 'SetUploadStatus',
    uploadStatus
});

