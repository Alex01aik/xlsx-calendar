import React from 'react';
import SearchInput from './SearchInput';
// import Messages from './Messages'; TODO when realise chat support
import styles from './styles.module.css';
import mainStyles from '../../pages/calendar/styles.module.css';
import { useStore } from '../../utils/store/useStore';
import { search } from '../../utils/store/store';

export type ChatProps = {};

const Chat: React.FC<ChatProps> = () => {
  const { state, dispatch } = useStore();

  return (
    <div className={styles.chatWrapper}>
      <div className={`${styles.chat} ${mainStyles.block}`}>
        {/* TODO when realise chat support <Messages messages={state.messages} /> */}
        <SearchInput
          onSearch={async (message) => {
            await search(dispatch, state, message);
          }}
        />
      </div>
    </div>
  );
};

export default Chat;
