import React, { useState, useContext } from 'react';
import styles from './styles/TaskBoardPopup.module.css';
import { ExpContext } from './ExpContext';

interface TaskBoardPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const TaskBoardPopup: React.FC<TaskBoardPopupProps> = ({ isOpen, onClose }) => {
  const [words, setWords] = useState<string[]>([]);
  const [newWord, setNewWord] = useState<string>('');
  const { exp, addExp } = useContext(ExpContext) || { exp: 0, addExp: () => {} };

  const handleAddWord = () => {
    if (newWord.trim() && words.length < 6) {
      setWords([...words, newWord.trim()]);
      setNewWord('');
    }
  };

  const handleNewWordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewWord(event.target.value);
  };

  const handleDeleteWord = (index: number) => {
    setWords(words.filter((_, i) => i !== index));
  };

  const handleCheckboxChange = (index: number) => {
    addExp(20);
    handleDeleteWord(index);
  };

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
            value={newWord}
            onChange={handleNewWordChange}
            className={styles.textInput}
          />
          <button onClick={handleAddWord} className={styles.addButton}>Add</button>
        </div>
        <ul className={styles.popupList}>
          {words.map((word, index) => (
            <li key={index} className={styles.wordItem}>
              <label>
                <input type="checkbox" onChange={() => handleCheckboxChange(index)} />
                {word}
              </label>
              <button onClick={() => handleDeleteWord(index)} className={styles.deleteButton}>
                &times;
              </button>
            </li>
          ))}
          {words.length >= 6 && (
            <li className={styles.limitReached}>Please delete a task before making a new one!</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TaskBoardPopup;