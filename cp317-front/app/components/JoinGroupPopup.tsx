import React, {useState} from 'react'
import styles from './styles/GroupPopup.module.css'

interface PopupProps{
    onClose: () => void;
}

const JoinGroupPopup: React.FC<PopupProps>= ({onClose}) => {
    const [Input, setInput] = useState<string>('');
    const [NameIssue, setNameIssue] = useState<string>('');


    const joinGroup = async() =>{
        console.log("join the group ");
        try{
            throw new Error("issue");

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
