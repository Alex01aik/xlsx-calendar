import React from 'react';
import SearchInput from './SearchInput';
import Messages from './Messages';
import styles from './styles.module.css';
import mainStyles from '../layout/Main/styles.module.css';
import { useStore } from '../../utils/store/useStore';
import { search } from '../../utils/store/store';

export type ChatProps = {};

const Chat: React.FC<ChatProps> = () => {
  const { state, dispatch } = useStore();

  return (
    <div className={`${styles.chat} ${mainStyles.block}`}>
      <Messages messages={state.messages} />
      <SearchInput
        onSearch={async (message) => {
          await search(dispatch, state, message);
        }}
      />
    </div>
  );
};

export default Chat;
