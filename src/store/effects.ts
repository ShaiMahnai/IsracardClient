import {ThunkAction} from 'redux-thunk';
import {ApplicationState, ApplicationAction} from './types';
import {addTaskError, addTaskRequest, addTaskSuccess} from "./actions";
import axios from "axios";
import React from "react";
import {API_URI} from "../Consts";

type Effect = ThunkAction<any, ApplicationState, any, ApplicationAction>;

export const addTask = (formData: FormData, success: () => void,
                        failed: (e: React.FormEvent<HTMLInputElement>) => void):
    Effect => (dispatch, getState) => {
    dispatch(addTaskRequest(formData));
    const promise = axios.post(`${API_URI}/Task`, formData);
    return promise
        .then(response => {
            dispatch(addTaskSuccess(response.data));
            success();
        })
        .catch((ex) => {
                dispatch(addTaskError(ex?.response?.data));
                failed(ex);
            }
        )

};