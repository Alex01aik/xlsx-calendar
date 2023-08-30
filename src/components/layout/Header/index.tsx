import React from 'react';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';
import HeaderNavigation from '../navigation/HeaderNavigation';

export type HeaderProps = {
  isCloseNav: boolean;
  setIsCloseNav: React.Dispatch<React.SetStateAction<boolean>>;
  runScroll: () => void;
};

const Header: React.FC<HeaderProps> = ({ isCloseNav, setIsCloseNav, runScroll }) => {
  return (
    <header className={styles.header}>
      <div>
        <Link
          to="/"
          onClick={() => {
            runScroll();
            setIsCloseNav(true);
          }}
        >
          <h1 className={styles.mainTitle}>CALENDAR</h1>
        </Link>
        <h2 className={styles.subTitle}>OF ALEX01AIK</h2>
      </div>
      <HeaderNavigation isCloseNav={isCloseNav} setIsCloseNav={setIsCloseNav} />
    </header>
  );
};

export default Header;
