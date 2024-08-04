import React, {useState, useEffect} from 'react';
import styles from "./styles/GroupMember.module.css"

interface MemberProps {
    token: string;
}


const GroupMember:React.FC<MemberProps> = ({token}) => {
    const [UserName, setUserName] = useState<string>('chrissy');
    const [Pfp, setPfp] = useState<string>('https://firebasestorage.googleapis.com/v0/b/cp317-69ff0.appspot.com/o/images%2Fdesktop-wallpaper-default-pfp-aesthetic-default-pfp.jpg?alt=media&token=98cdee9b-009c-47b1-a97f-197390691ffb');
    const [Count, setCount] = useState<string>('400');


    useEffect(() => {
    // sets the detail for each follower/folllowing item from public token
    const setDetails = async() => {
        const response = await fetch("http://127.0.0.1:8000/api/getPublicUser/",
                                              { method: 'POST',
                                                headers: {
                                                  'Content-Type': 'application/json'
                                                },
                                                body: JSON.stringify({friendPublicToken:token})
                                              });


        const data = await response.json();
        const {message} = data;
       //data being set
        setUserName(data.username)
        setPfp(data.pfp)
        setCount(data.count)
    }
    
    setDetails();
  }, [token])
    
  return (
    <div className={styles.member}>
            <img src={Pfp} alt="your pfp" className={styles.pfp} />
            <div className={styles.attributes}>
                <p>{UserName}</p>
                <p>{Count}</p>
            </div>
        </div>
  )
}

export default GroupMember
