"use client"; // Add this at the top of your file

import { useContext } from "react";
import NavBar from "../components/NavBar";
import AuthContext from "../components/AuthContext";
import FriendItem from "../components/FriendItem";
import styles from "../components/styles/Friends.module.css"

const Friends = () => {
    const Context = useContext(AuthContext);

    return (
        <div>
            {Context?.isAuthenticated ? (
                <div className={styles.background}>
                    <NavBar />
                    <div className={styles.container}>
                        <div className={styles.border}>
                            <h2 className={styles.header}>Following</h2>
                            <ul className={styles.list}>
                                <FriendItem name='RAWRRR' imageUrl="https://firebasestorage.googleapis.com/v0/b/cp317-69ff0.appspot.com/o/images%2Fdesktop-wallpaper-default-pfp-aesthetic-default-pfp.jpg?alt=media&token=98cdee9b-009c-47b1-a97f-197390691ffb" />
                            </ul>
                        </div>
                        <div className={styles.border}>
                            <h2 className={styles.header}>Followers</h2>
                            <ul className={styles.list}>
                                <FriendItem name='RAWRRR' imageUrl="https://firebasestorage.googleapis.com/v0/b/cp317-69ff0.appspot.com/o/images%2Fdesktop-wallpaper-default-pfp-aesthetic-default-pfp.jpg?alt=media&token=98cdee9b-009c-47b1-a97f-197390691ffb" />
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
