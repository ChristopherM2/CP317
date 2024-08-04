/*
Simple component, just represents a userItem to render in friends tab
*/

import React, { useEffect, useState, useContext } from 'react';
import styles from './styles/FriendItem.module.css';
import AuthContext from './AuthContext';

interface FriendProps {
    token: string;
    hasX?: boolean;
}

const FriendItem: React.FC<FriendProps>  = ({ token, hasX = false}) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [show, setShow] = useState<boolean>(true);
  const Context = useContext(AuthContext);

  useEffect(() => {
    // sets the detail for each follower/folllowing item
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
       //data being set
        setName(data.username)
        setImageUrl(data.pfp)
    }
    
    setDetails();
  }, [token])

  const handleClick = async() =>{ // unfollow a person 
    if(!Context?.user?.id) return
    try{
      const response = await fetch("http://127.0.0.1:8000/api/friends/",
                                             { method: 'DELETE',
                                              headers: {
                                                'Content-Type': 'application/json'
                                              },
                                              body: JSON.stringify({token:Context.user.id, friendPublicToken:token})
                                            });

        if(!response.ok) throw new Error('Network response was not ok');
        setShow(false);
    }catch(error){
      console.error('Failed to fetch user details:', error);
    }
  }



  return (
    <div>
      {show && <div className={styles.card}>
        <img src={imageUrl} alt="Profile" className={styles.image} />
        <span className={styles.text}>{name}</span>
        {hasX && (
          <button className={styles.xButton} onClick={handleClick}>
            X
          </button>
        )}
      </div>}
    </div>
  );
};

export default FriendItem;
