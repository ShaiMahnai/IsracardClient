import React, {useEffect, useState} from "react";
import axios from "axios";
import {Task} from "../../models/Task";
import {TasksDisplay} from "./TasksDisplay/TasksDisplay";
import {RadioButtons, RadioButtonsGenericType} from "../RadioButtons/RadioButtons";
import styles from './Tasks.module.css';
import {useSelector} from "react-redux";
import {ApplicationState} from "../../store";

enum TasksDisplayed {
    My,
    All
}

export const Tasks = () => {

    const [displayedTasks, setDisplayedTasks] = useState<Task[]>([]);
    const [tasksDisplayed, setTasksDisplayed] = useState<TasksDisplayed>(TasksDisplayed.My);
    const sessionTasks = useSelector((state: ApplicationState) => state.tasksReducer.tasks);

    useEffect(() => {
        switch (tasksDisplayed) {
            case TasksDisplayed.All: // all tasks- from server
                getTasks().then(setDisplayedTasks);
                break;
            default:// current session only - from state
                setDisplayedTasks(sessionTasks);
                break;
        }
    }, [tasksDisplayed, sessionTasks]);

    const displayChanged = (e: React.FormEvent<HTMLInputElement>) => {
        const value = parseInt(e.currentTarget.value) as TasksDisplayed;
        setTasksDisplayed(value);
    };
    const displayOptions: RadioButtonsGenericType[] = [
        {value: TasksDisplayed.My, name: "Current Session's Tasks"},
        {value: TasksDisplayed.All, name: 'All Tasks'}];

    return <div className={styles.tasks}>
        <div className='title'>Tasks</div>

        <RadioButtons
            options={displayOptions}
            setSelected={displayChanged}/>
        <TasksDisplay tasks={displayedTasks}/>

    </div>


};

const getTasks = async (): Promise<Task[]> => {
    const promise = axios.get("https://localhost:44379/api/Task");
    return promise.then((response) => response.data)
}
