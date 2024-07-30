'use client';// Add this at the top of your file
import Link from 'next/link'
import { useContext, useState, useEffect } from 'react';
import AuthContext from '../components/AuthContext';
//component to export

interface HelloWorldResponse{
    time: string;
}


const HelloWorld = () => {
    const Context = useContext(AuthContext);
    const [data, setData] = useState<HelloWorldResponse>({time:'loading..'});
    

    useEffect(() => {
        const fetchData = async () => {
       
            const response = await fetch("http://127.0.0.1:8000/api/time/");
            const result: HelloWorldResponse = await response.json();
            setData(result);
        }
        

        fetchData();
    }, []);

    
    
    

    
    return (


        <div>

            {Context?.isAuthenticated ? (
                <p>
                    meowwww ur logged in, {Context?.user?.id}!
                </p>
            )
            :
            (
                <div>
                    <h1>You are not logged in</h1>
                    <p>{data.time}</p>
                    <ul>
                        <li> 
                            <Link href='/home'>Home Page</Link>
                        </li>

                        <li>
                            <Link href='/friends'>Friends Page</Link>
                        </li>
                            
                        <li>
                            <Link href='/login'>Login Page</Link>
                        </li>

                        <li>
                            <Link href='/profile'>Profile Page</Link>
                        </li>

                        <li>
                            <Link href='/signup'>Signup Page</Link>
                        </li>
                        
                    </ul>
                 </div>
            )
        
        
            }



            
            
        </div>
    );
};

export default HelloWorld;