import LoginFields from '../components/LoginFields'

const Login = () => {
    const back:string = 'http://127.0.0.1:8000/api/login/'
    return (
        <>
        <LoginFields api={back} headerText='Login Page' buttonText='Login' buttonColor = 'orange'/>
        </>
    );
};

export default Login;