import React, { useState} from "react";

import styles from './TaskUpload.module.css';
import {useDispatch, useSelector} from "react-redux";
import {addTask, ApplicationState, setUploadStatus} from "../../store";


export enum UploadStatus {
    Ready,
    Success,
    Failed,
}

export const TaskUpload = () => {
    const [file, setFile] = useState<File>();
    const [text, setText] = useState<string>('');
    const [inputKey, setInputKey] = useState<number>(Date.now()); //ensure that in every change of the file the state will change
    const [error, setError] = useState<string>('');
    const uploadStatus = useSelector((state: ApplicationState) => state.tasksReducer.uploadStatus);

    const dispatch = useDispatch();
    const errorDiv = uploadStatus === UploadStatus.Failed ?
        <div className={`${styles.error} ${styles.uploadResult}`}>
            {error}
        </div>
        : uploadStatus === UploadStatus.Success ?
            <div className={`${styles.success} ${styles.uploadResult}`}>
                Upload successfully!
            </div>
            : '';


    const saveFile = (e: any) => {
        setFile(e.target.files[0]);
        dispatch(setUploadStatus(UploadStatus.Ready))
    };

    const handleUploadSuccess = () => {
        setFile(undefined);
        setText('');
        setInputKey(Date.now);
    }
    const handleUploadFailed = (res: any) => {
        setError(res?.response?.data)
    }

    const validForm = () => file && file.name && text;

    const uploadFile = async () => {
        if (validForm()) {
            const formData = new FormData();
            // @ts-ignore - checked in validForm
            formData.append("formFile", file);
            // @ts-ignore - checked in validForm
            formData.append("fileName", file.name);
            // @ts-ignore - checked in validForm
            formData.append("Text", text);

            dispatch(addTask(formData, handleUploadSuccess, handleUploadFailed))

        }
    };

    const handleTextChanged = (e: React.FormEvent<HTMLInputElement>) =>
        setText(e.currentTarget.value)


    return (
        <div className={styles.taskUpload}>
            <div className='title'>Add New Task</div>

            <div className={styles.addTask}>
                <input type="file" key={inputKey} onChange={saveFile}/>
                <input type="text" placeholder={'Text'}
                       value={text}
                       onChange={handleTextChanged}/>

            </div>
            <input className={styles.addButton}
                   disabled={!validForm()}
                   type="button" value="Add" onClick={uploadFile}/>

            {errorDiv}

        </div>
    );
}
