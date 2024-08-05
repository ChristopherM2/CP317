/*
/settings page
*/

'use client'
import React from 'react'
import { useContext, useState,useCallback,useEffect } from 'react'
import styles from '../components/styles/Settings.module.css'
import ToggleSetting from '../components/ToggleSetting'
import AuthContext from '../components/AuthContext'
import Link from 'next/link'
import NavBar from '../components/NavBar'
import SettingsTextPopup from '../components/SettingsTextPopup'
import ChangeIconPopup from '../components/ChangeIconPopup'


const Settings = () => {
    const Context = useContext(AuthContext);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isPopupVisibleIcon, setIsPopupIconVisible] = useState(false);
    const [popupContent, setPopupContent] = useState({
        placeholder: '',
        api: ''
    });
    //const runRef = useRef<() => void>(() => {});

 // onClose: () => void; placeholder: string; api: string; runApi: () => void;
    const handleClick = (placeholder: string, api: string) => 
    (event: React.MouseEvent<HTMLLIElement>) =>{
        event.preventDefault()
        setPopupContent({ placeholder, api});

        if(placeholder == 'Icon'){
            setIsPopupIconVisible(true);
        } else {
            setIsPopupVisible(true);
            }
    }
       
    const handleClosePopup = () => {
        setIsPopupVisible(false);
        setIsPopupIconVisible(false);
    }

/*
<li>
                            <ToggleSetting label = 'Dark Mode' api = 'http://127.0.0.1:8000/api/time/'/>
                        </li>
                        <li>
                            <ToggleSetting label='Allow Tracking' api='http://127.0.0.1:8000/api/time/'/>
                        </li>
*/


  return (
    <div>
        {Context?.isAuthenticated ? (
            <div className={styles.background}>
                <NavBar/>
                <div className={styles.border}>
                <div className={styles.box}>
                    <h2 className={styles.header}>Settings</h2>
                    <ul className={styles.list}>
                        <li className={styles.change} onClick={handleClick('Icon', 'apiForChangeIcon')}>
                            Change Icon
                        </li>
                        <li className={styles.change} onClick={handleClick('username', 'http://127.0.0.1:8000/api/updateUsername/')}>
                            Change Display Name
                        </li>
                        <li className={styles.change} onClick={handleClick('email', 'http://127.0.0.1:8000/api/updateEmail/')}>
                            Change Email
                        </li>
                        <li className={styles.change} onClick={handleClick('password', 'http://127.0.0.1:8000/api/updatePassword/')}>
                            Change Password
                        </li>
                        
                        
                    </ul>
                    <button onClick= {Context?.logout}className={styles.logoutButton}>Logout</button>
                </div>
            </div>
            {isPopupVisible && <SettingsTextPopup 
                        onClose={handleClosePopup}
                        placeholder={popupContent.placeholder}
                        api={popupContent.api}
                    />}

            {isPopupVisibleIcon && <ChangeIconPopup 
                        onClose={handleClosePopup}
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
