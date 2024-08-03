import React, { useState, useEffect, useRef} from 'react'
import Link from 'next/link'
import styles from './styles/HomeMenus.module.css'

const HomeMenu = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupOpen2, setIsPopupOpen2] = useState(false);
  const [words, setWords] = useState<string[]>([]);
  const [newWord, setNewWord] = useState<string>('');
  const [timer, setTimer] = useState<number>(1500); // hiii set the timer duration here!! (25 min = 1500)
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [exp, setExp] = useState<number>(0); // Initialize exp state variable
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timer > 0) {
      timerRef.current = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) { // set some alarm here or something lol
      setIsRunning(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, timer]);

  const handleButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handleButtonClick2 = () => {
    setIsPopupOpen2(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleClosePopup2 = () => {
    setIsPopupOpen2(false);
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
    setExp(exp - 5); // Decrease exp by 5 when a word is deleted
  };

  const handleCheckboxChange = (index: number) => {
    setExp(exp + 20); // Increase exp by 20 when a checkbox is marked
    setWords(words.filter((_, i) => i !== index));
  };

  const handleStartTimer = () => {
    setIsRunning(true);
  };

  const handleStopTimer = () => {
    setIsRunning(false);
  };

  const handleResetTimer = () => {
    setIsRunning(false);
    setTimer(1500); // remember to change this number to match the duration!
  };

  const handleBreakTimer = () => {
    setIsRunning(false);
    setTimer(300); // 5 min break
  };

  const formatTime = (seconds: number) => {
    const getMinutes = `0${Math.floor(seconds / 60)}`.slice(-2);
    const getSeconds = `0${seconds % 60}`.slice(-2);
    return `${getMinutes}:${getSeconds}`;
  };

  return (
    <div className={styles.homeMenu}>
      <div className={styles.homeMenu}>
        <img src="images/BackgroundLvl1Animated.gif" alt="Lvl 1 Home Menu" className={styles.Menu} />
      </div>
      <div className={styles.expDisplay}>EXP: {exp} / 100</div> {/* Display the exp variable */}
      <Link href='/group'>
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
              <p>Welcome to the Task Board!</p>
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
                      <input type="checkbox" onChange={() => handleCheckboxChange(index)}/> 
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
        )}
        <div className={styles.navContainer}>
          <img src="/images/Lvl1Clock1.png" alt="Button for Pom Timer" className={styles.clockButton} onClick={handleButtonClick2} />
          {isPopupOpen2 && (
            <div className={styles.popup}>
              <div className={styles.popupContent}>
                <span className={styles.closeButton} onClick={handleClosePopup2}>
                  &times;
                </span>
                <p>Pomodoro Timer, use the Break button for a 5 minutes break after each session</p>
                <div className={styles.timerDisplay}>{formatTime(timer)}</div>
                <div className={styles.timerControls}>
                  <button onClick={handleStartTimer} className={styles.startButton}>Start</button>
                  <button onClick={handleStopTimer} className={styles.stopButton}>Stop</button>
                  <button onClick={handleResetTimer} className={styles.resetButton}>Reset</button>
                  <button onClick={handleBreakTimer} className={styles.breakButton}>Break</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeMenu