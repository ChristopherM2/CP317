"use client"; // Add this at the top of your file

import { useState, useEffect, useContext } from "react";
import AuthContext from "../components/AuthContext";
import NavBar from "../components/NavBar";

//component to export


const Profile = () => {
    const Context = useContext(AuthContext)
    return (
        
        <div>
            {Context?.isAuthenticated ? (
                <div>
                    <h1>ProfilePage</h1>
                    <p>
                        meowwww ur logged in, {Context?.user?.id}!
                    </p>
                    <NavBar/>

                </div>
                
            )
            :
            (



            <h1>ProfilePage</h1>
            )
            }
        </div>
    );
};

export default Profile;