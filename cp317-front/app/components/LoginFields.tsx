'use client';
import React from 'react'
import styles from './styles/loginFields.module.css'
import { useState, useEffect, ReactEventHandler } from "react";

interface UserDetails{
    email: string;
    password: string;
}

const LoginFields = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPass] = useState<string>('');
    const api: string = 'http://127.0.0.1:8000/api/login/'

    //handle submission
    const handleSubmission = async (event: React.FormEvent) => {
        event.preventDefault();

        const userDetails: UserDetails = {email, password};

        try{
            const res = await fetch(api,
                                {   method : 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(userDetails)
                                });
            if (!res.ok){
                console.log('login response not ok')
            }
            const data = await res.json();
            console.log('Success:', data);

        }catch(error){
            console.log('error posting login details: ', error);
        }
    }



  return (
    <div className = {styles.container}>
        <div className={styles.box}>

            <h1 className={styles.header}>Loginpage</h1>
            <form onSubmit={handleSubmission} id ={styles.UserForm}>
                <div className = {styles.emailInput}>
                    <label htmlFor="email">Email: </label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className= {styles.passInput}>
                    <label htmlFor="password">Password: </label>
                    <input value={password} onChange={(e) => setPass(e.target.value)} />
                </div>
                
                <button type='submit' className= {styles.loginButton}>Login</button>


            </form>

        </div>
    </div>
  )
}

export default LoginFields
