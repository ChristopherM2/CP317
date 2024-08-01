import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import styles from './styles/HomeMenus.module.css'

const HomeMenu = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
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
    <div className={styles.homeMenu}>
      <img src="/images/Board1.png" alt="Button for tasks" className={styles.boardButton} onClick={handleButtonClick}/>
    </div>

    {isPopupOpen && (
      <div className={styles.popup}>
        <div className={styles.popupContent}>
          <span className={styles.closeButton} onClick={handleClosePopup}>
            &times;
          </span>
          <p>This is the popup content!</p>
        </div>
      </div>
    )}
  </div>

  )
}

export default HomeMenu