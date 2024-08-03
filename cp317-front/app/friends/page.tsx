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

const Friends = () => {
    const Context = useContext(AuthContext);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);

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

                const data = await response.json(); // data should have .name, .email, .contributions
                //console.log(data)
                const {message} = data;
                console.log(message);
                setFollowers(message.followers) // sets the array with followers
                setFollowing(message.following) // sets the array with following

            } catch (error) {
                console.error('Failed to fetch user details:', error);
            }
        };

        fetchUserDetails();
    }, [Context?.user?.id]);


    return (
        <div>
            {Context?.isAuthenticated ? (
                <div className={styles.background}>
                    <NavBar />
                    <div className={styles.container}>
                        <div className={styles.border}>
                            <h2 className={styles.header}>Following</h2>
                            <ul className={styles.list}>
                                {following.map((friend, index) => (
                                    <FriendItem
                                        key={index}
                                        name={friend}
                                        imageUrl="https://firebasestorage.googleapis.com/v0/b/cp317-69ff0.appspot.com/o/images%2Fdesktop-wallpaper-default-pfp-aesthetic-default-pfp.jpg?alt=media&token=98cdee9b-009c-47b1-a97f-197390691ffb"
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
                                        name={friend}
                                        imageUrl="https://firebasestorage.googleapis.com/v0/b/cp317-69ff0.appspot.com/o/images%2Fdesktop-wallpaper-default-pfp-aesthetic-default-pfp.jpg?alt=media&token=98cdee9b-009c-47b1-a97f-197390691ffb"
                                    />
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            ) : (
                <h1>FriendsPage</h1>
            )}
        </div>
    );
};

export default Friends;
