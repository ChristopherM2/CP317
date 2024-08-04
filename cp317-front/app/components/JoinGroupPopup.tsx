import React, {useContext, useEffect, useState} from 'react'
import styles from './styles/GroupPopup.module.css'
import AuthContext from './AuthContext';

interface PopupProps{
    onClose: () => void;
}

const JoinGroupPopup: React.FC<PopupProps>= ({onClose}) => {
    const Context = useContext(AuthContext);
    const [Input, setInput] = useState<string>('');
    const [NameIssue, setNameIssue] = useState<string>('');
    const [AvailGroups, setAvailGroups] = useState<[]>([])


    useEffect(() => {
        const listGroups = async() => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/getAvailableGroups/`,{method: 'GET'});

                if(!response.ok) throw new Error("network response not ok")

                const data = await response.json();
                const {message} = data;
                setAvailGroups(message);
                console.log(message);

            } catch(Error){
                console.log("Error:" , Error);
            }
            
        }
        listGroups();
    }, [])
    

    const joinGroup = async() =>{
        if(!Context?.user?.id) return;
        try{
            const response = await fetch(`http://127.0.0.1:8000/api/addUserToGroup/`,
                                        { method: 'POST',
                                        headers: {
                                          'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({ token: Context.user.id, name:Input })
                                      });
            
            if(!response.ok) throw new Error("network response was not ok");

            const data = await response.json();
            const {message} = data;
            console.log("joined group")

        }catch(Error){
            setNameIssue("That group doesnt exist, try another one");
        }
    }

  return (
    <div className={styles.popupOverlay}>
        <div className={styles.popupContent}>
            <h3 className={styles.title}>Join a Group</h3>
            <input type="text" placeholder={'Enter a Group name'} onChange={(e) => setInput(e.target.value)} />
            <button onClick={onClose} className={styles.closeButton} >×</button>
            <button onClick={joinGroup}>Create</button>
            <p>{NameIssue}</p>
            <div className={styles.list}>
                <ul>
                    
                </ul>
            </div>
        </div>
    </div>
  )
}

export default JoinGroupPopup
