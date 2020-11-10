import {ApplicationAction, ApplicationState} from './types';
import {Task} from "../models/Task";
import {combineReducers} from 'redux'
import {UploadStatus} from "../components";


export type TasksState = Readonly<{
    tasks: Task[];
    uploadStatus: UploadStatus;
}>;
export const initialState: TasksState = {
    tasks: [],
    uploadStatus: 0,
};

export const tasksReducer = (state: TasksState = initialState,
                             action: ApplicationAction) => {
    switch (action.type) {
        case "AddTaskRequest":
            return {
                uploadStatus: UploadStatus.Ready,
                tasks: [...state.tasks]
            }
        case "AddTaskSuccess":
            return {
                uploadStatus: UploadStatus.Success,
                tasks: [...state.tasks, action.task]
            }
        case "AddTaskError":
            return {
                uploadStatus: UploadStatus.Failed,
                tasks: [...state.tasks]
            }
        default: // need this for default case
            return {...state};

    }
}

export const rootReducer = combineReducers<ApplicationState>({
     tasksReducer,
});
