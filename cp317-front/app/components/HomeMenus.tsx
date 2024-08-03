import React, { useState, useContext, useEffect, useRef} from 'react'
import Link from 'next/link'
import styles from './styles/HomeMenus.module.css'
import TaskBoardPopup from './TaskBoardPopup'; // Import the new popup component
import { ExpContext } from './ExpContext';
import ClockPopup from './ClockPopup';


const HomeMenu = () => {
  const { exp } = useContext(ExpContext) || { exp: 0 };
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupOpen2, setIsPopupOpen2] = useState(false);

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
        <TaskBoardPopup isOpen={isPopupOpen} onClose={handleClosePopup} /> 
        <div className={styles.navContainer}>
          <img src="/images/Lvl1Clock1.png" alt="Button for Pom Timer" className={styles.clockButton} onClick={handleButtonClick2} />
          <ClockPopup isOpen={isPopupOpen2} onClose={handleClosePopup2} />
        </div>
      </div>
    </div>
  );
}

export default HomeMenu