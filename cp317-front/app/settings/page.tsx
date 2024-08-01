'use client'
import React from 'react'
import { useContext, useState } from 'react'
import styles from '../components/styles/Settings.module.css'
import ToggleSetting from '../components/ToggleSetting'
import AuthContext from '../components/AuthContext'
import Link from 'next/link'
import NavBar from '../components/NavBar'
import SettingsTextPopup from '../components/SettingsTextPopup'


const Settings = () => {
    const Context = useContext(AuthContext);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [popupContent, setPopupContent] = useState({
        placeholder: '',
        api: '',
        runApi: () => {},
    });
 // onClose: () => void; placeholder: string; api: string; runApi: () => void;
    const handleClick = (placeholder: string, api: string, runApi: () => void) => 
    (event: React.MouseEvent<HTMLLIElement>) =>{
        event.preventDefault()
        setPopupContent({ placeholder, api, runApi });
        setIsPopupVisible(true);
    }
    const handleClosePopup = () => {
        setIsPopupVisible(false);
    }
    const run = async() =>{
        const { api } = popupContent;
        console.log('this api was run:', api)
    }




  return (
    <div>
        {Context?.isAuthenticated ? (
            <div className={styles.background}>
                <NavBar/>
                <div className={styles.border}>
                <div className={styles.box}>
                    <h2 className={styles.header}>Settings</h2>
                    <ul className={styles.list}>
                        <li className={styles.change} onClick={handleClick('Icon', 'apiForChangeIcon', run)}>
                            Change Icon
                        </li>
                        <li className={styles.change} onClick={handleClick('Display Name', 'apiForChangeName', run)}>
                            Change Display Name
                        </li>
                        <li className={styles.change} onClick={handleClick('Email', 'apiForChangeEmail', run)}>
                            Change Email
                        </li>
                        <li className={styles.change} onClick={handleClick('Password', 'apiForChangePassword', run)}>
                            Change Password
                        </li>
                        <li>
                            <ToggleSetting label = 'Dark Mode' api = 'http://127.0.0.1:8000/api/time/'/>
                        </li>
                        <li>
                            <ToggleSetting label='Allow Tracking' api='http://127.0.0.1:8000/api/time/'/>
                        </li>
                        
                    </ul>
                    <button onClick= {Context?.logout}className={styles.logoutButton}>Logout</button>
                </div>
            </div>
            {isPopupVisible && <SettingsTextPopup 
                        onClose={handleClosePopup}
                        placeholder={popupContent.placeholder}
                        api={popupContent.api}
                        runApi={popupContent.runApi}
                    />}
            
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
