import React from 'react';
import './global.css';
import styles from './styles.module.css';
import Header from '../layout/Header';
import Main from '../layout/Main';
import { StoreProvider } from '../../utils/store/StoreProvider';

export type AppProps = {};

const App: React.FC<AppProps> = () => {
  return (
    <StoreProvider>
      <div className={styles.root}>
        <Header />
        <Main />
      </div>
    </StoreProvider>
  );
};

export default App;
