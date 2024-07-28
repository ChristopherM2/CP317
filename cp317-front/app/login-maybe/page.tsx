"use client"; // Add this at the top of your file

import { useState, useEffect } from "react";

//component to export

interface HelloWorldResponse{
    message: string;
}


const Login = () => {
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null)


    useEffect(()=>{
        fetch('http://127.0.0.1:8000/api/login/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: 'admin', password: 'password'})

        })
        .then(response => response.json())
        .then((data: HelloWorldResponse) => {
            setMessage(data.message);
            setLoading(false);
        })
        .catch(error => {
            setError(error.message);
            setLoading(false);
        });
    }, []);

    if (loading) return <p> loading.. please wait </p>
    if (error) return <p> idk man go kys it doesnt work</p>
    return (
        <div>
            <h1>Hello,</h1>
            <p>{message}</p>
        </div>
    );
};

export default Login;