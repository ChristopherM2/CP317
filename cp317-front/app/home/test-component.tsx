/*
pretty sure this is no longer used, pleaes delete before final
*/

'use client';
import { useState, useEffect } from 'react';
import TimeFetcher from '../classes/TimeFetcher';

const TestComponent = () => {
  const [showComponent, setShowComponent] = useState(false);

  return (
    <div>
      <button onClick={() => setShowComponent(!showComponent)}>
        Show Time
      </button>
      {showComponent && <CurrentTime />}
    </div>
  );
};

const CurrentTime = () => {
    const [time, setTime] = useState('');
    const tf = new TimeFetcher();

    useEffect(() => {
        const fetchAndUpdateTime = async () => {
      try {
        const fetchedTime = await tf.fetchTime();
        setTime(fetchedTime);
      } catch (error) {
        console.error("Error in fetching time:", error);
      }
    }

    fetchAndUpdateTime();

    const intervalId = setInterval(fetchAndUpdateTime, 1000); // update every second
    return () => clearInterval(intervalId);

    }, []);

    return (
        <>
        <p>The current time is: {time}</p>
        </>
    );
};

export default TestComponent; // test