import React from 'react'
import styles from './styles/TaskItem.module.css'

interface TaskProps {
    Title: string;
    Description: string;
}

const TaskItem:React.FC<TaskProps> = ({Title, Description}) => {
  return (
    <div className={styles.member}>
            <h3>{Title}</h3>
            <div className={styles.attributes}>
                <p>{Description}</p>
                <button>Complete Task</button>
            </div>
    </div>
  )
}

export default TaskItem
