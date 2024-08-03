/* 
Settings popups to change user icon
*/

'use client';
import React, { useContext, useState, useEffect } from 'react'
import styles from './styles/SettingsIconPopup.module.css'
import AuthContext from './AuthContext';


interface PopupProps {
    onClose: () => void;
    placeholder: string;
    api: string;
}

const ChangeIconPopup: React.FC<PopupProps> = ({ onClose, placeholder, api }) => {
    const [imageLink, setImage] = useState<string>('')
    const Context = useContext(AuthContext)
    const [input, setInput] = useState<string>('');

    //get user's current image 
    useEffect(() =>{
        const getPfp = async() =>{
            if (!Context?.user?.id) return; 

            try{ // fetch user image
                const response = await fetch(`http://127.0.0.1:8000/api/getuser/`,
                                                { method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json'
                                                },
                                                body: JSON.stringify({ token: Context.user.id })
                                                });

                if(response.ok){ // set user image
                    const data =  await response.json();
                    const {message} = data;
                    setImage(message.settings.image);
                }
            }catch (error) {
                console.error('Failed to fetch user details:', error);
            }
        }
        getPfp();
        
    }, [Context?.user?.id])

    
    // function runs on click of 'set image', uploads image link to database
    const run = async () => {
        if(imageLink == '') return;
        console.log("Icon change run" +  api);
    }

    //uploads the image to firebase store, and puts link in imageLink
    const uploadImage = async() => {

    }
   

    return (
        <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
                <h3 className={styles.title}>Change Your Icon</h3>
                <button onClick={onClose} className={styles.closeButton} >×</button>
                <img className = {styles.pfp} src={imageLink || ""} alt="" />
                <button className={styles.bottomButtons} onClick={uploadImage}>Upload Image</button>
                <button className={styles.bottomButtons}  onClick={run}>Set Image</button>
            </div>
        </div>
    )
}

export default ChangeIconPopup;
