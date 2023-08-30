import React, { useLayoutEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import { MessageAuthor } from '../../../utils/enums/MessageAuthor';
import { MessageType } from '../../../utils/types/MessageType';
import dropdown from '../../../assets/images/dropdown.svg';

export type MessagesProps = {
  messages: MessageType[];
};

const Messages: React.FC<MessagesProps> = ({ messages }) => {
  const messagesRef = useRef<any>(null);
  const [isShowMessages, setIsShowMessages] = useState<boolean>(true);

  useLayoutEffect(() => {
    if (messages.length > 1) {
      setIsShowMessages(false);
      setTimeout(() => (messagesRef.current.scrollTop = messagesRef.current.scrollHeight), 0);
    }
  }, [messages]);

  return (
    <>
      <img
        className={`${styles.dropdown} ${isShowMessages ? styles.open : ''}`}
        src={dropdown}
        onClick={() => setIsShowMessages(!isShowMessages)}
      />
      <div className={`${styles.messageWrapper} ${isShowMessages ? styles.hidden : ''}`}>
        <div className={styles.messages} ref={messagesRef}>
          {messages.map((item, index) => (
            <div
              key={index}
              className={`${styles.message} ${
                item.author === MessageAuthor.CALENDAR ? styles.left : styles.right
              }`}
            >
              <div className={styles.messageBody}>{item.message}</div>
              <div className={styles.messageAuthor}>{item.author}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Messages;
