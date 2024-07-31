'use client'
import React from 'react'
import { useContext } from 'react'
import styles from '../components/styles/Settings.module.css'
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
                    <h2 className={styles.header}>Settings</h2>
                    <ul className={styles.list}>
                        <li className={styles.change}>Change Icon</li>
                        <li className={styles.change}>Change Display Name</li>
                        <li className={styles.change}>Change Email</li>
                        <li className={styles.change}>Change Password</li>
                        <li>
                            <ToggleSetting label = 'Dark Mode' api = 'http://127.0.0.1:8000/api/time/'/>
                        </li>
                        <li>
                            <ToggleSetting label='Allow Tracking' api='http://127.0.0.1:8000/api/time/'/>
                        </li>
                        
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
