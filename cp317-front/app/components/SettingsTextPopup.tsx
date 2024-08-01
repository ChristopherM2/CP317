'use client';
import React, { useContext, useState } from 'react'
import styles from './styles/SettingsTextPopup.module.css'
import AuthContext from './AuthContext';

interface PopupProps {
    onClose: () => void;
    placeholder: string;
    api: string;
}

const SettingsTextPopup: React.FC<PopupProps> = ({ onClose, placeholder, api }) => {
    const Context = useContext(AuthContext)
    const [input, setInput] = useState<string>('');
    const run = async () => {
        console.log("run with " +  api);
        if (!Context?.user?.id) return;
        console.log('' + JSON.stringify({ token: Context?.user?.id, [placeholder]:input}));
        try {
            const response = await fetch(api,
                                            { method: 'POST',
                                            headers: {
                                            'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify({ token: Context?.user?.id, [placeholder]:input})
                                        });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            } 
            } catch (error) {
                console.error('Failed to fetch user details:', error);
            }
    }
   

    return (
        <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
                <h3 className={styles.title}>Change {placeholder}</h3>
                <input type="text" placeholder={'Enter new ' + placeholder} onChange={(e) => setInput(e.target.value)} />
                <button onClick={onClose} className={styles.closeButton} >×</button>
                <button onClick={run}>Change</button>
            </div>
        </div>
    )
}

export default SettingsTextPopup;
