'use client'
import React from 'react'
import { useContext } from 'react'
import styles from '../components/styles/Profile.module.css'
import ToggleSetting from '../components/ToggleSetting'
import AuthContext from '../components/AuthContext'
import Link from 'next/link'
import NavBar from '../components/NavBar'

const Settings = () => {
    const Context = useContext(AuthContext);
  return (
    <div>
        {Context?.isAuthenticated ? (
            <div className={styles.background}>
                <NavBar/>
                <div className={styles.border}>
                <div className={styles.box}>
                    <ul className={styles.list}>
                        
                    </ul>
                </div>
            </div>
            </div>
            
             
        ):(
            <div className={styles.login}>
                <h1 >You are not logged in</h1>
                <Link href = '/login'>login</Link>
            </div>
            
        )
        }
     
    </div>
  )
}

export default Settings
