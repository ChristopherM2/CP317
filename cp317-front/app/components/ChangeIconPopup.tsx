/* 
Settings popups to change user icon
*/

'use client';
import React, { useContext, useState, useEffect, ChangeEvent } from 'react'
import styles from './styles/SettingsIconPopup.module.css'
import AuthContext from './AuthContext';


interface PopupProps {
    onClose: () => void;
}

const ChangeIconPopup: React.FC<PopupProps> = ({ onClose}) => {
    const Context = useContext(AuthContext)

    const [imageLink, setImageLink] = useState<string>('')
    const [file, setFile] = useState<File | null>(null);
    const [ranSetImg, setRanSetimg] = useState<boolean>(false)

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
                    setImageLink(message.settings.image);
                }
            }catch (error) {
                console.error('Failed to fetch user details:', error);
            }
        }
        getPfp();
        
    }, [Context?.user?.id])

     // 
    // function runs on click of 'set image' and puts link in imageLink
    // then it should set the image in database
    const run = async () => {
        if(imageLink == '' || !Context?.user?.id) return;

        try{ // fetch user image
                const response = await fetch(`http://127.0.0.1:8000/api/updateImage/`,
                                                { method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json'
                                                },
                                                body: JSON.stringify({ token: Context?.user?.id, image:imageLink})
                                                });

                if(response.ok){ // set user image
                    setRanSetimg(true);
                    onClose()
                }
        }catch (error) {
                console.error('Failed to fetch user details:', error);
        }


        
    }

    //show image to user
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        setRanSetimg(false);
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]); // set the file
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageLink(reader.result as string); // show the image
                //console.log(reader.result as string)
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };
   

    return (
        <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
                <h3 className={styles.title}>Change Your Icon</h3>
                <button onClick={onClose} className={styles.closeButton} >×</button>
                <img className = {styles.pfp} src={imageLink || ""} alt="" />
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <button
                    className={styles.bottomButtons}
                    onClick={() => document.getElementById('fileInput')?.click()}
                >
                    Choose Image
                </button>
                <button className={styles.bottomButtons} onClick={run}>
                    Set Image
                </button>

                {ranSetImg && <p className={styles.set}>Image set!</p>}
            </div>
        </div>
    )
}

export default ChangeIconPopup;
