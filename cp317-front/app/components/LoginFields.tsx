'use client';
import React from 'react'
import styles from './styles/loginFields.module.css'
import { useState, useContext } from "react";
import Link from 'next/link';
import AuthContext from './AuthContext';
import { useRouter } from 'next/navigation';


interface UserDetails{
    email: string;
    password: string;
}

interface FieldProps {
    api: string;
    headerText: string;
    buttonText: string;
    buttonColor: string;
    signupText?: string;
}

const LoginFields : React.FC<FieldProps> = ({api,
                                             headerText = "Login Page",
                                             buttonText = "Login",
                                             buttonColor = 'orange',
                                             signupText = "" 
                                            }) => {
    
    const router = useRouter();
    const [email, setEmail] = useState<string>('');
    const [password, setPass] = useState<string>('');
    const Context = useContext(AuthContext);
    

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
                

            } else { // login happens here
                const data = await res.json();
                console.log('Success:', data);
                const id = data.id;
                Context?.login({email, password, id});
                router.push('/home');
                
                
            }
            

        }catch(error){
            console.log('error posting login details: ', error);
        }
    }



  return (
    <div className = {styles.container}>
        <div className={styles.box}>

            <h1 className={styles.header}>{headerText}</h1>
            <form onSubmit={handleSubmission} id ={styles.UserForm}>
                <div className = {styles.emailInput}>
                    <label htmlFor="email">Email: </label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className= {styles.passInput}>
                    <label htmlFor="password">Password: </label>
                    <input type="password" value={password} onChange={(e) => setPass(e.target.value)} />
                </div>
                
                <button type='submit' className= {styles.loginButton} style={{ backgroundColor: buttonColor }}>
                            {buttonText}
                </button>

                <div className={styles.linksign}>
                    <Link href='/signup' >{signupText}</Link>
                </div>
                


            </form>

        </div>
    </div>
  )
}

export default LoginFields
