
import LoginFields from '../components/LoginFields'
import Link from 'next/link';

const Login = () => {
    const back:string = 'http://127.0.0.1:8000/api/login/'
    return (
        <>
        <LoginFields api={back} headerText='Login Page' buttonText='Login' buttonColor = 'orange' signupText='SignUp' isLoggingin={true}/>
        </>
    );
};

export default Login;