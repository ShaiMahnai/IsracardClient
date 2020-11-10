import React from "react";
import {Task} from "../../../models/Task";
import styles from './TaskDisplay.module.css'


interface ListItemProps {
    task: Task;
}

function ListItem(props: ListItemProps) {
    // Correct! There is no need to specify the key here:
    const {task} = props;
    return <li className={styles.listItem}>
        <span>{task.text}</span>
        <img alt={'Task image'} src={task.imagePath}></img>
    </li>
}


interface TasksDisplayProps {
    tasks: Task[];
}

export const TasksDisplay = (props: TasksDisplayProps) => {
    const {tasks} = props;
    return (
        <div className={styles.taskDisplay}>

            <ol className={styles.list}>
                {tasks ? tasks.map((task, index) =>
                    <ListItem key={index} task={task}/>) : ''}
            </ol>
        </div>
    )

}
