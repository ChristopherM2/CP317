/*
 /group page
 unfinished
*/

"use client"; // Add this at the top of your file

import { useState, useEffect, useContext } from "react";
import NavBar from "../components/NavBar";
import AuthContext from "../components/AuthContext";
import { useRouter } from 'next/navigation';
import styles from '../components/styles/Group.module.css';
import GroupMember from "../components/GroupMember";

//component to export


const Group = () => {
    const Context = useContext(AuthContext);
    const [GroupName, setGroupName] = useState<string|null>(null)
    const [Members, setMembers] = useState<[]>([]);
    const router = useRouter();

    useEffect(() => {
    const isInGroup = async() =>{
        if (!Context?.user?.id) return // return when not logged in
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/getuser/`, // get group name
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
            
            setGroupName(message.group); // set group name
            //console.log(message.group);
            
            const response2 = await fetch(`http://127.0.0.1:8000/api/getGroupMembers/`, // get member list
                                        { method: 'POST',
                                        headers: {
                                          'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({ name:message.group })
                                      });

            if (!response2.ok) {
                throw new Error('Network response2 was not ok');
            }
            const data2 = await response2.json(); 
            const {message2} = data2;
            setMembers(data2.message); // set member list

        } catch (error) {
            console.error('Failed to fetch user details:', error);
        }
        }
        isInGroup();
        
    
    },[Context?.user?.id]);

   

    const LeaveGroup = async() => {
        if (!Context?.user?.id) return
        try{
            const response3 = await fetch(`http://127.0.0.1:8000/api/removeUserFromGroup/`, // get member list
                                        { method: 'DELETE',
                                        headers: {
                                          'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({token:Context.user.id})
                                      });

          if (!response3.ok) {
            throw new Error('Network response2 was not ok');
          }
          router.push('/home');
        }catch(error){
            console.error('Failed to leave group:', error);
        }
    }






    return (


        <div>
            {Context?.isAuthenticated ? (
                <div className={styles.container}>
                    <h1>Group Page</h1>
                    <div className={styles.groupContainer}>
                        <div className={styles.GroupInfo}>
                            <h3>Group Name: {GroupName}</h3>
                            <button onClick={LeaveGroup}>Leave Group</button>
                        </div>
                        <div className={styles.GroupMembers}>
                            <div>
                                <ul className={styles.listMembers}>
                                    {Members.map((tok, index) => (
                                    <GroupMember key={index} token={tok}/>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
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