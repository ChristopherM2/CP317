/* 
Settings popups to change user icon
*/

'use client';
import React, { useContext, useState } from 'react'
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
    // usecontext, in progress :3

    
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
                <img className = {styles.pfp} src={imageLink || "https://firebasestorage.googleapis.com/v0/b/cp317-69ff0.appspot.com/o/images%2Fdesktop-wallpaper-default-pfp-aesthetic-default-pfp.jpg?alt=media&token=98cdee9b-009c-47b1-a97f-197390691ffb"} alt="" />
                <button className={styles.bottomButtons} onClick={uploadImage}>Upload Image</button>
                <button className={styles.bottomButtons}  onClick={run}>Set Image</button>
            </div>
        </div>
    )
}

export default ChangeIconPopup;
