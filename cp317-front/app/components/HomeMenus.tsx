import React, { useState, useContext, useEffect, useRef} from 'react'
import Link from 'next/link'
import styles from './styles/HomeMenus.module.css'
import TaskBoardPopup from './TaskBoardPopup'; // Import the new popup component
import { ExpContext } from './ExpContext';
import ClockPopup from './ClockPopup';
import AuthContext from './AuthContext';
import JoinGroupPopup from './JoinGroupPopup'
import CreateGroupPopup from './CreateGroupPopup'

const HomeMenu = () => {
  const [GroupName, setGroupName] = useState<string|null>(null);
  const Context = useContext(AuthContext);

  const { exp } = useContext(ExpContext) || { exp: 0 };

  const [isBoardPopup, setBoardPopup] = useState<boolean>(false);
  const [isClockPopup, setClockPopup] = useState<boolean>(false);
  const [isCreatePopup, setCreatePopup] = useState<boolean>(false);
  const [isJoinPopup, setJoinPopup] = useState<boolean>(false);
  

  //fetch to find if user is in a group,
  useEffect(() => {
    isInGroup();
  },[Context?.user?.id]);

  const isInGroup = async() =>{
      if (!Context?.user?.id) return; // return when not logged in
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
          console.log("group name:" + message.group);
          setGroupName(message.group || null); // set group name
      } catch (error) {
          console.error('Failed to fetch user details:', error);
      }
  }

  const createAndJoin = () =>{
    setCreatePopup(false)
    isInGroup();
  }



/*
  const formatTime = (seconds: number) => {
    const getMinutes = `0${Math.floor(seconds / 60)}`.slice(-2);
    const getSeconds = `0${seconds % 60}`.slice(-2);
    return `${getMinutes}:${getSeconds}`;
  };
*/
   if(GroupName){ // if in a group, return group visuals
    return (
   
    <div className={styles.homeMenu}>
      <div className={styles.homeMenu}>
        <img src="images/BackgroundLvl1Animated.gif" alt="Lvl 1 Home Menu" className={styles.Menu} />
      </div>
      <div className={styles.expDisplay}>EXP: {exp} / 100</div> {/* Display the exp variable */}
      <Link href='/group'>
        <div className={styles.homeMenu}>
          <img src="/images/Nav-group.png" alt="Group button in Home Menu" className={styles.floatingButton} />
        </div>
      </Link>
      <div className={styles.boardButton}>
        <img src="/images/Board1.png" alt="Button for tasks"  onClick={() => setBoardPopup(true)} />
        
      </div>
      <div className={styles.clockButton}>
          <img src="/images/Lvl1Clock1.png" alt="Button for Pom Timer"  onClick={() => setClockPopup(true)} />
      </div>

      
      <TaskBoardPopup isOpen={isBoardPopup} onClose={() => setBoardPopup(false)} /> 
      <ClockPopup isOpen={isClockPopup} onClose={() => setClockPopup(false)} />
      
    </div>
  );

   } else {// else show group join/create buttons
    return(
      <div>
        <div className={styles.homeMenu}>
          <img src="images/BackgroundLvl1Animated.gif" alt="Lvl 1 Home Menu" className={styles.Menu} />
        </div>

        <div className={styles.lonely}>
          <p className={styles.lonelytext}>It looks a little lonely out here...</p>
          <div className={styles.NoGroupButtons}>
            <button onClick={() => {setCreatePopup(true)}}>Create a Group</button>
            <button onClick={() => {setJoinPopup(true)}}>Join a Group</button>
          </div>
        </div>

        <div>
          {isCreatePopup && <CreateGroupPopup onClose={createAndJoin}/>}
          {isJoinPopup && <JoinGroupPopup onClose= {() => setJoinPopup(false)}/>}
        </div>
        
      </div>
      
    );
   }
  
}

export default HomeMenu