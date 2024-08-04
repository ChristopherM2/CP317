/*
 /group page
 unfinished
*/

"use client"; // Add this at the top of your file

import { useState, useEffect, useContext } from "react";
import NavBar from "../components/NavBar";
import AuthContext from "../components/AuthContext";
import { useRouter } from 'next/navigation';

//component to export


const Group = () => {
    const Context = useContext(AuthContext);
    const [GroupName, setGroupName] = useState<string| null>(null)
    const router = useRouter();

    useEffect(() => {
    const isInGroup = async() =>{
      if (!Context?.user?.id){
        router.push('/login');
        return;
       } // return when not logged in
      try {
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
          setGroupName(message.settings.group || null); // set group name
      } catch (error) {
          console.error('Failed to fetch user details:', error);
      }
    }
    isInGroup();
  },[Context?.user?.id]);





    return (


        <div>
            {Context?.isAuthenticated ? (
                <div>
                    <h1>Group Page</h1>
                    <p>
                        Group's name, group members n other stuff
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