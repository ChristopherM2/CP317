// Add this at the top of your file
import Link from 'next/link'
//component to export

interface HelloWorldResponse{
    time: string;
}


const HelloWorld = async () => {

    const response = await fetch("http://127.0.0.1:8000/api/time/", {next : {revalidate: 1}})
    const j: HelloWorldResponse = await response.json();
    

    
    return (
        <div>
            <h1>Home</h1>
            <p>{j.time}</p>
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
    );
};

export default HelloWorld;