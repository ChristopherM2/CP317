/*
 /signup page
 user can enter details to signup, uses loginfields 
*/
import LoginFields from "../components/LoginFields";
const Signup = () => {
    const back = 'http://127.0.0.1:8000/api/signup/'
    return (
        <>
            <LoginFields api={back} headerText='Signup Page' buttonText='Signup' buttonColor = 'blue' isLoggingin={true}/>
        </>
    );
};


export default Signup;