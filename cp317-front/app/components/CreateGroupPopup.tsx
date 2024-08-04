import React, {useState} from 'react'
import styles from './styles/GroupPopup.module.css'

interface PopupProps {
    onClose: () =>void;
}

const CreateGroupPopup:React.FC<PopupProps>  = ({onClose}) => {
    const [Input, setInput] = useState<string>('');
    const [NameIssue, setNameIssue] = useState<string>('');


    const createGroup = async() =>{
        console.log("make the group ");
        try{
            throw new Error("issue");

        }catch(Error){
            setNameIssue("Name is not unique, try another one");
        }
    }

  return (
    <div className={styles.popupOverlay}>
        <div className={styles.popupContent}>
            <h3 className={styles.title}>Create a Group</h3>
            <input type="text" placeholder={'Enter a Group name'} onChange={(e) => setInput(e.target.value)} />
            <button onClick={onClose} className={styles.closeButton} >×</button>
            <button onClick={createGroup}>Create</button>
            <p>{NameIssue}</p>
        </div>
    </div>
  )
}

export default CreateGroupPopup
