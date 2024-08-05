import React, { useState, useContext } from 'react';
import styles from './styles/TaskBoardPopup.module.css';
import { ExpContext } from './ExpContext';
import TaskItem from './TaskItem'
import AuthContext from './AuthContext';

interface TaskBoardPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const TaskBoardPopup: React.FC<TaskBoardPopupProps> = ({ isOpen, onClose }) => {
  const [Descriptions, setDescriptions] = useState<string[]>([]);
  const [NewDescription, setNewDescription] = useState<string>('');
  const [Titles, setTitles] = useState<string[]>([]);
  const [NewTitle, setNewTitle] = useState<string>('');

  const { exp, addExp } = useContext(ExpContext) || { exp: 0, addExp: () => {} };
  const Context = useContext(AuthContext);

  // add title and description to arrays
  const handleAddTask = () => {
    if (NewDescription.trim() && Descriptions.length < 6) {
      setTitles(arr => [...arr, NewTitle]);
      setDescriptions([...Descriptions, NewDescription.trim()]);
      setNewDescription('');
      setNewTitle('');
    }
  };
  const completeTask = async(index:number) =>{
    setDescriptions(prevDescriptions => prevDescriptions.filter((_, i) => i !== index));
    setTitles(prevTitles => prevTitles.filter((_, i) => i !== index));
    
    try{
      if(!Context?.user?.id) return
       const response = await fetch(`http://127.0.0.1:8000/api/completeTask/`,
                                        { method: 'POST',
                                        headers: {
                                          'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({ token: Context.user.id })
                                      });

         if (!response.ok) {
              throw new Error('Network response was not ok');
          }

    } catch (error) {
          console.error('Failed to fetch user details:', error);
    }
    

  }

/*
  const handleNewWordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewWord(event.target.value);
  };

  const handleDeleteWord = (index: number) => {
    setWords(words.filter((_, i) => i !== index));
  };

  const handleCheckboxChange = (index: number) => {
    addExp(20);
    handleDeleteWord(index);
  };*/
  /*<label>
                <input type="checkbox" onChange={() => handleCheckboxChange(index)} />
                {word}
              </label>
              <button onClick={() => handleDeleteWord(index)} className={styles.deleteButton}>
                &times;
              </button>*/


  if (!isOpen) return null;

  return (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        <span className={styles.closeButton} onClick={onClose}>
          &times;
        </span>
        <p>Welcome to the Task Board!</p>
        <div className={styles.inputContainer}>
          <input
            type="text"
            value={NewTitle}
            placeholder="Enter Task's title"
            onChange={(e) =>  setNewTitle(e.target.value)}
            className={styles.textInputTitle}
          />
          <input
            type="text"
            value={NewDescription}
            placeholder="Enter Task's description"
            onChange={(e) =>  setNewDescription(e.target.value)}
            className={styles.textInput}
          />
          <button onClick={handleAddTask} className={styles.addButton}>Add</button>
        </div>
        
        <ul className={styles.popupList}>
          {Titles.map((title, index) => (<TaskItem key={index} Title = {title}
           Description={Descriptions[index]} onComplete={() => completeTask(index)}/>))}
          
        </ul>
            
        
      </div>
    </div>
  );
};

export default TaskBoardPopup;