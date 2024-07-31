import React from 'react'
import Link from 'next/link'
import styles from './styles/NavBar.module.css'

const NavBar = () => {
  return (
    <div className={styles.navBar}>
      <Link href ='/profile'>
            <div className={styles.navContainer}>
                <img src="/images/Nav-profile.png" alt="Profile button in Navbar" id={styles.i1}/>
            </div>
      </Link>
      <Link href ='/chat'>
            <div className={styles.navContainer}>
                <img src="/images/Nav-chat.png" alt="Chat button in Navbar" id={styles.i2}/>
            </div>
            
      </Link>
      <Link href ='/home'>
           <div className={styles.navContainer}>
                <img src="/images/Nav-home.png" alt="Home button in Navbar" id={styles.i3} />
            </div>
            
      </Link>
      <Link href ='/friends'>
            <div className={styles.navContainer}>
                <img src="/images/Nav-friends.png" alt="Friends button in Navbar" id={styles.i4} />
            </div>
            
      </Link>
      <Link href ='/settings'>
            <div className={styles.navContainer}>
                <img src="/images/Nav-settings.png" alt="Settings button in Navbar" id={styles.i5} />
            </div>
            
      </Link>
    </div>
  )
}

export default NavBar
