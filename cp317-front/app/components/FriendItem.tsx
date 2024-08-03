/*
Simple component, just represents a userItem to render in friends tab
*/

import React from 'react';
import styles from './styles/FriendItem.module.css';

interface FriendProps {
    name: string;
    imageUrl: string;
}

const FriendItem: React.FC<FriendProps>  = ({ name, imageUrl }) => {
  return (
    <div className={styles.card}>
      <img src={imageUrl} alt="Profile" className={styles.image} />
      <span className={styles.text}>{name}</span>
    </div>
  );
};

export default FriendItem;
