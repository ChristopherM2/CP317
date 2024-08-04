/*
 /friends file
 shows all of users followers and following, havent added functionality to follow people yet tho : (
*/

"use client"; 

import { useContext, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import AuthContext from "../components/AuthContext";
import FriendItem from "../components/FriendItem";
import styles from "../components/styles/Friends.module.css"
import FollowBlock from "../components/FollowBlock"

const Friends = () => {
    const Context = useContext(AuthContext);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);

    const [isPopupVisible, setIsPopupVisible] = useState(false);

    useEffect(() => { // run on load
        const fetchUserDetails = async () => {
            if (!Context?.user?.id) return; // return when not logged in

            try { // fetch user's details
                const response = await fetch(`http://127.0.0.1:8000/api/getuser/`,
                                             { method: 'POST',
                                              headers: {
                                                'Content-Type': 'application/json'
                                              },
                                              body: JSON.stringify({ token: Context.user.id })
                                            });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json(); 
                const {message} = data;

                //message.followers is public tokens of followers, fetch username & pfp in frienditem
                setFollowers(message.followers) // sets the array with followers
                setFollowing(message.following) // sets the array with following

            } catch (error) {
                console.error('Failed to fetch user details:', error);
            }
        };

        fetchUserDetails();
    }, [Context?.user?.id]);

    const handleClick = () => {
        setIsPopupVisible(true);
    }

    const handleClosePopup = () => {
        setIsPopupVisible(false);
    }







    return (
        <div>
            {Context?.isAuthenticated ? (
                <div>
                    <div className={styles.background}>
                    <NavBar />

                    <div className={styles.findUserBlock}>
                        <button className={styles.findButton} onClick={handleClick}>Find a user</button>
                    </div>

                    <div className={styles.container}>
                        <div className={styles.border}>
                            <h2 className={styles.header}>Following</h2>
                            <ul className={styles.list}>
                                {following.map((friend, index) => (
                                    <FriendItem
                                        key={index}
                                        token={friend}
                                        hasX={true}
                                    />
                                ))}
                            </ul>
                        </div>
                        <div className={styles.border}>
                            <h2 className={styles.header}>Followers</h2>
                            <ul className={styles.list}>
                                {followers.map((friend, index) => (
                                    <FriendItem
                                        key={index}
                                        token={friend}
                                    />
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                    {isPopupVisible && <FollowBlock onClose={handleClosePopup}/>}
                </div>
                

                


            

            ) : (
                <h1>FriendsPage</h1>
            )}
        </div>
    );
};

export default Friends;
