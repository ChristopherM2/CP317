'use client'
import React from 'react'
import { useContext } from 'react'
import styles from '../components/styles/Profile.module.css'
import ToggleSetting from '../components/ToggleSetting'
import AuthContext from '../components/AuthContext'
import Link from 'next/link'
import NavBar from '../components/NavBar'

const Profile = () => {
    const Context = useContext(AuthContext);
  return (
    <div>
        {Context?.isAuthenticated ? (
            <div className={styles.background}>
                <NavBar/>
                <div className={styles.border}>
                    <div className={styles.box}>
                        <h2 className={styles.header}>Profile</h2>
                        <div className={styles.profileTop}>
                            <img src="images/Nav-profile.png" alt="your pfp" className={styles.pfp}/>
                            <Link href='/settings'><button className={styles.profileButton}>Edit Profile</button></Link>
                        </div>
                        <ul className={styles.list}>
                            <li>
                                Display Name: {}
                            </li>
                            <li>
                                Email: {}
                            </li>
                            <li>
                                Total Contributions Made: {}
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

export default Profile
