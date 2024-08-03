/*
 /group page
 unfinished
*/

"use client"; // Add this at the top of your file

import { useState, useEffect, useContext } from "react";
import NavBar from "../components/NavBar";
import AuthContext from "../components/AuthContext";

//component to export


const Group = () => {
    const Context = useContext(AuthContext);
    return (


        <div>
            {Context?.isAuthenticated ? (
                <div>
                    <h1>Group Page</h1>
                    <p>
                        
                    </p>
                    <NavBar/>

                </div>
                
            )
            :
            (

            <h1>GroupPage</h1>

            )}
        </div>
    );
};

export default Group;