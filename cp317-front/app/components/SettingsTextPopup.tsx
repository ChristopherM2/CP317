'use client';
import React from 'react'
import styles from './styles/SettingsTextPopup.module.css'

interface PopupProps {
    onClose: () => void;
    placeholder: string;
    api: string;
    runApi: () => void;
}

const SettingsTextPopup: React.FC<PopupProps> = ({ onClose, placeholder, api, runApi }) => {
   

    return (
        <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
                <h3 className={styles.title}>Change {placeholder}</h3>
                <input type="text" placeholder={'Enter new' + placeholder} />
                <button onClick={onClose} className={styles.closeButton} >×</button>
                <button onClick={runApi}>Change</button>
            </div>
        </div>
    )
}

export default SettingsTextPopup;
