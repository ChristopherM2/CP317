import React, { useState, useEffect, useRef } from 'react';
import styles from './styles/ClockPopup.module.css';

interface ClockPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ClockPopup: React.FC<ClockPopupProps> = ({ isOpen, onClose }) => {
  const [timer, setTimer] = useState<number>(1500); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timer > 0) {
      timerRef.current = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsRunning(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, timer]);

  const handleStartTimer = () => {
    setIsRunning(true);
  };

  const handleStopTimer = () => {
    setIsRunning(false);
  };

  const handleResetTimer = () => {
    setIsRunning(false);
    setTimer(1500); // Reset to 25 minutes
  };

  const formatTime = (seconds: number) => {
    const getMinutes = `0${Math.floor(seconds / 60)}`.slice(-2);
    const getSeconds = `0${seconds % 60}`.slice(-2);
    return `${getMinutes}:${getSeconds}`;
  };

  if (!isOpen) return null;

  return (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        <span className={styles.closeButton} onClick={onClose}>
          &times;
        </span>
        <p>Timer</p>
        <div className={styles.timerDisplay}>{formatTime(timer)}</div>
        <div className={styles.timerControls}>
          <button onClick={handleStartTimer} className={styles.startButton}>Start</button>
          <button onClick={handleStopTimer} className={styles.stopButton}>Stop</button>
          <button onClick={handleResetTimer} className={styles.resetButton}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default ClockPopup;