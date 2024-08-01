import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import styles from './styles/HomeMenus.module.css'

const HomeMenu = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [words, setWords] = useState<string[]>([]);
  const [newWord, setNewWord] = useState<string>('');

  const handleButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleAddWord = () => {
    if (newWord.trim()) {
      setWords([...words, newWord.trim()]);
      setNewWord('');
    }
  }

  const handleNewWordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewWord(event.target.value);
  };

  const handleDeleteWord = (index: number) => {
    setWords(words.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.homeMenu}>
      <div className={styles.homeMenu}>
       <img src="images/BackgroundLvl1Animated.gif" alt="Lvl 1 Home Menu" className={styles.Menu}/>
      </div>
    <Link href ='/group'>
      <div className={styles.homeMenu}>
        <img src="/images/Nav-group.png" alt="Group button in Home Menu" className={styles.floatingButton} />
      </div>
    
    </Link>
    <div className={styles.navContainer}>
        <img src="/images/Board1.png" alt="Button for tasks" className={styles.boardButton} onClick={handleButtonClick} />
        {isPopupOpen && (
          <div className={styles.popup}>
            <div className={styles.popupContent}>
              <span className={styles.closeButton} onClick={handleClosePopup}>
                &times;
              </span>
              <p> Welcome to the Task Board! </p>
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  value={newWord}
                  onChange={(e) => setNewWord(e.target.value)}
                  className={styles.textInput}
                />
                <button onClick={handleAddWord} className={styles.addButton}>Add</button>
              </div>
              <ul className={styles.popupList}>
                {words.map((word, index) => (
                  <li key={index} className={styles.wordItem}>
                    <label>
                      <input type="checkbox" />
                      {word}
                    </label>
                    <button onClick={() => handleDeleteWord(index)} className={styles.deleteButton}>
                      &times;
                    </button>
                  </li>
                ))}
                {words.length >= 6 && (
                  <li className={styles.limitReached}>Limit of 6 Tasks reached</li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
  </div>

  )
}

export default HomeMenu