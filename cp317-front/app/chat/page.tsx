'use client';
import React from 'react'
import AuthContext from '../components/AuthContext';
import { useContext } from 'react';
import Link from 'next/link';
import NavBar from '../components/NavBar';
import styles from '../components/styles/Chat.module.css'
import ChatBox from '../components/ChatBox';

const page = () => {
    const Context = useContext(AuthContext);
  return (
    <div>
      {Context?.isAuthenticated ? (
        <div>
            <div className={styles.navBar}>
                <NavBar />
            </div>
            <div className={styles.bg}>
                <ChatBox/>
            </div>
            
            
        </div>
      ):(
        <div>
            
            <Link href='/login'>login</Link>
        </div>

      )
      }
    </div>
      
  )
}

export default page
