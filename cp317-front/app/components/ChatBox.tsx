import React, {useState} from 'react'
import styles from './styles/ChatBox.module.css'

// unfinished class, document on completion !


const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() !== '') {
      setInput('');
    }
  };
   return (
    <div className={styles.chatContainer}>
        <h2 className={styles.title}>Group Chat</h2>
      <div className={styles.border}>
        <div className={styles.box}>
          <div className={styles.chatWindow}>
            
              <div className={styles.chatMessage}>
                This is an example text message 123456789, it should wrap after hitting the end
              </div>
    
          </div>
          <div className={styles.chatInput}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              maxLength={150}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      </div>
    </div>
   );
};

export default ChatBox
