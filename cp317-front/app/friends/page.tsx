"use client"; // Add this at the top of your file

import { useState, useEffect, useContext } from "react";
import NavBar from "../components/NavBar";
import AuthContext from "../components/AuthContext";

//component to export


const Friends = () => {
    const Context = useContext(AuthContext);
    return (


        <div>
            {Context?.isAuthenticated ? (
                <div>
                    <h1>FriendsPage</h1>
                    <p>
                        meowwww ur logged in, {Context?.user?.id}!
                    </p>
                    <NavBar/>

                </div>
                
            )
            :
            (

            <h1>FriendsPage</h1>

            )}
        </div>
    );
};

export default Friends;