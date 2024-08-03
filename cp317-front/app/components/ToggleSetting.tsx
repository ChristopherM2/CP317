/*
Settings page has toggle based settings, and this is the item component for them
*/

'use client';
import React, { useState } from 'react'
import styles from './styles/ToggleSetting.module.css'
interface props{
    label : string;
    api : string;
}


const ToggleSetting = ({label = 'PleaseProvideALabel', api = ''}) => {
    const [selected, setSelected] = useState<boolean>(false)
    //load state of settings first

    const handleSubmission = async() => {
        setSelected(!selected);
        console.log('pinged: ', api)

    }
    

  return (
    <div className={styles.toggleSetting}>
      <p>{label}</p>
      <input type="checkbox" checked={selected} onChange={handleSubmission} className={styles.in} />
    </div>
  )
}

export default ToggleSetting
