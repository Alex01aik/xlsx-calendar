import React from 'react';
import Calendar from '../../Calendar';
import Chat from '../../Chat';
import styles from './styles.module.css';

export type MainProps = {};

const Main: React.FC<MainProps> = () => {
  return (
    <main className={styles.main}>
      <Calendar />
      <Chat />
    </main>
  );
};

export default Main;
