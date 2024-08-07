/*
 /profile page 
*/
'use client'
import React, { useState } from 'react'
import { useContext, useEffect } from 'react'
import styles from '../components/styles/Profile.module.css'
import ToggleSetting from '../components/ToggleSetting'
import AuthContext from '../components/AuthContext'
import Link from 'next/link'
import NavBar from '../components/NavBar'


const Profile = () => {
    const Context = useContext(AuthContext);
    const [Name, setName] = useState<string>('PlaceholderName');
    const [Email, setEmail] = useState<string>('PlaceholderEmail');
    const [Contributions, setContributions] = useState<string>('0');
    const [ImageLink, setImageLink] = useState<string>('');
    const [GroupName, setGroupName] = useState<string>('');

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (!Context?.user?.id) return; // return when not logged in

            try {
                const response = await fetch(`http://127.0.0.1:8000/api/getuser/`,
                                             { method: 'POST',
                                              headers: {
                                                'Content-Type': 'application/json'
                                              },
                                              body: JSON.stringify({ token: Context.user.id })
                                            });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json(); // data should have .name, .email, .contributions
                //console.log(data)
                const {message} = data;
                setName(message.settings?.username);
                setEmail(message.email);
                setContributions(message.count || '0');
               // console.log(message.settings.image);
                setImageLink(message.settings.image);
                setGroupName(message.group || 'null');
            } catch (error) {
                console.error('Failed to fetch user details:', error);
            }
        };

        fetchUserDetails();
    }, [Context?.user?.id]);

  return (
    <div className={styles.background}>
        {Context?.isAuthenticated ? (
            <div className={styles.background}>
                <NavBar/>
                <div className={styles.border}>
                    <div className={styles.box}>
                        <h2 className={styles.header}>Profile</h2>
                        <div className={styles.profileTop}>
                            <img src={ImageLink} alt="your pfp" className={styles.pfp}/>
                            <Link href='/settings'><button className={styles.profileButton}>Edit Profile</button></Link>
                        </div>
                        <ul className={styles.list}>
                            <li>
                                Display Name: {Name}
                            </li>
                            <li>
                                Email: {Email}
                            </li>
                            <li>
                                Group: {GroupName}
                            </li>
                            <li>
                                Total Contributions Made: {Contributions}
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
