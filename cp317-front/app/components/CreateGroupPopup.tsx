import React, {useContext, useState} from 'react'
import styles from './styles/GroupPopup.module.css'
import AuthContext from './AuthContext';

interface PopupProps {
    onClose: () =>void;
}

const CreateGroupPopup:React.FC<PopupProps>  = ({onClose}) => {
    const Context = useContext(AuthContext);
    const [Input, setInput] = useState<string>('');
    const [NameIssue, setNameIssue] = useState<string>('');


    const createGroup = async() =>{
        //console.log(JSON.stringify({ token: Context?.user?.id, name:Input }));
        if (!Context?.user?.id || Input == '') return;
        try{
            const response = await fetch(`http://127.0.0.1:8000/api/newGroup/`,
                                        { method: 'POST',
                                        headers: {
                                          'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({ token: Context.user.id, name:Input })
                                      });

            if(!response.ok) throw new Error("issue");

            const data = await response.json();
            const {message} = data;
            onClose();


        }catch(Error){
            console.log(Error);
            setNameIssue("Name is not unique, try another name");
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
