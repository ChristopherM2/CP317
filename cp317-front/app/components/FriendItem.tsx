/*
Simple component, just represents a userItem to render in friends tab
*/

import React, { useEffect, useState } from 'react';
import styles from './styles/FriendItem.module.css';

interface FriendProps {
    token: string;
    hasX?: boolean;
}

const FriendItem: React.FC<FriendProps>  = ({ token, hasX = false}) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [name, setName] = useState<string>('');

  useEffect(() => {
    console.log(JSON.stringify({friendPublicToken:token}))
    const setDetails = async() => {
        const response = await fetch("http://127.0.0.1:8000/api/getPublicUser/",
                                              { method: 'POST',
                                                headers: {
                                                  'Content-Type': 'application/json'
                                                },
                                                body: JSON.stringify({friendPublicToken:token})
                                              });


        const data = await response.json();
        const {message} = data;
        console.log(data);
        setName(data.username)
        setImageUrl(data.pfp)
    }
    
    setDetails();
  }, [token])



  return (
    <div className={styles.card}>
      <img src={imageUrl} alt="Profile" className={styles.image} />
      <span className={styles.text}>{name}</span>
    </div>
  );
};

export default FriendItem;
