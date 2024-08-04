'use client';
import React, {useContext, useState} from 'react'
import styles from './styles/FollowBlock.module.css'
import AuthContext from './AuthContext';

interface PopupProps{
    onClose: () => void;
}

const FollowBlock: React.FC<PopupProps>= ({onClose}) => {
    const [input, setInput] = useState<string>('');
    const [isNotValid, setIsNotValid] = useState<boolean>(false);
    const Context = useContext(AuthContext)

    const run = async () =>{
        //console.log(JSON.stringify({email:input}));
        try{
            if(!Context?.user?.id) return;
            const response = await fetch("http://127.0.0.1:8000/api/findPublicToken/",
                                             { method: 'POST',
                                              headers: {
                                                'Content-Type': 'application/json'
                                              },
                                              body: JSON.stringify({email:input})
                                            });

            if(!response.ok){
                throw new Error('Network response was not ok');
                 
            }
            const data = await response.json();
            const {message} = data; // message is the token to add to follow
            //user_id = request.data['token']
            //firendToken = request.data['friendPublicToken']
            //console.log("got the token." + JSON.stringify({token:Context.user.id, friendPublicToken:message}))

            const response2 = await fetch("http://127.0.0.1:8000/api/friends/",
                                             { method: 'POST',
                                              headers: {
                                                'Content-Type': 'application/json'
                                              },
                                              body: JSON.stringify({token:Context.user.id, friendPublicToken:message})
                                            });

            const data2 = response2.json();
            console.log(data2);
            onClose();



        }catch (error) {
            console.error('Failed to fetch user details:', error);
            setIsNotValid(true);
        }
        
    }

    return (
        <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
                <h3 className={styles.title}>Find a user</h3>
                <input type="text" placeholder={"Enter a user's email"} onChange={(e) => setInput(e.target.value)} />
                <button onClick={onClose} className={styles.closeButton} >×</button>
                <button onClick={run}>Follow</button>
                {isNotValid && <p>Email is not valid!</p>}
            </div>
        </div>
    )
}

export default FollowBlock
