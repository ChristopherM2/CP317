import React from 'react'
import Link from 'next/link'
import styles from './styles/HomeMenus.module.css'


const HomeMenu = () => {
  return (
    <div className={styles.homeMenu}>
      <div className={styles.homeMenu}>
       <img src="images/BackgroundLvl1Home1.png" alt="Lvl 1 Home Menu" className={styles.Menu}/>
      </div>
    <Link href ='/group'>
      <div className={styles.homeMenu}>
        <img src="/images/Nav-group.png" alt="Group button in Home Menu" className={styles.floatingButton} />
      </div>
    
    </Link>
  </div>
  )
}

export default HomeMenu