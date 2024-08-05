import React from 'react'
import styles from './styles/TaskItem.module.css'

interface TaskProps {
    Title: string;
    Description: string;
    onComplete: () => void;
}

const TaskItem:React.FC<TaskProps> = ({Title, Description, onComplete}) => {
  return (
    <div className={styles.member}>
            <h3>{Title}</h3>
            <div className={styles.attributes}>
                <p>{Description}</p>
                <button onClick={onComplete}>Complete Task</button>
            </div>
    </div>
  )
}

export default TaskItem
