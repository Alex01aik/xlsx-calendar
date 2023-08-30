import React, { ReactNode } from 'react';
import styles from './styles.module.css';

export type MainProps = {
  children: ReactNode;
};

const Main: React.FC<MainProps> = ({ children }) => {
  return <main className={styles.main}>{children}</main>;
};

export default Main;
