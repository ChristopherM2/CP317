/*
 /home page
 houses group progress, and group functionality
*/

'use client';// Add this at the top of your file
import Link from 'next/link'
import { useContext, useState, useEffect } from 'react';
import AuthContext from '../components/AuthContext';
import NavBar from '../components/NavBar';
import HomeMenu from '../components/HomeMenus';
import { ExpProvider } from '../components/ExpContext';
import {useRouter} from 'next/navigation';
import styles from '../components/styles/Settings.module.css'
//component to export

interface HelloWorldResponse{
    time: string;
}


const HelloWorld = () => {
    const Context = useContext(AuthContext);
    const [data, setData] = useState<HelloWorldResponse>({time:'loading..'});
    const router = useRouter();
    

    useEffect(() => { // this was a test, please remove before final
        if(!Context?.user?.id){
            //router.push('/login');
            return;
        }
    }, []);

    
    
    

    
    return (


        <div>

            {Context?.isAuthenticated ? (
                <div>
                    {/* <h1>Home!</h1>
                    <p>
                    meowwww ur logged in, {Context?.user?.id}!
                    </p>     */}
                    <HomeMenu/>
                    <NavBar/>
               
                </div>
                
            )
            :
            (
                <div className={styles.login}>
                    <h1>Login to continue!</h1>
                    <button className={styles.loginButton} onClick={() => router.push('/login')}> login</button>
                </div>
            )
        
        
            }



            
            
        </div>
    );
};

export default HelloWorld;