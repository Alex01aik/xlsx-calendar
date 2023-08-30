import React from 'react';
import styles from './styles.module.css';
import burger from '../../../../assets/images/burger.svg';
import close from '../../../../assets/images/x-close.svg';
import { Link } from 'react-router-dom';

export type HeaderNavigationProps = {
  isCloseNav: boolean;
  setIsCloseNav: React.Dispatch<React.SetStateAction<boolean>>;
};

const HeaderNavigation: React.FC<HeaderNavigationProps> = ({ isCloseNav, setIsCloseNav }) => {
  return (
    <>
      <div className={`${styles.navigation} ${styles.headerNavigation}`}>
        <Link className={styles.navLink} to="/about">
          About
        </Link>
        <Link className={styles.navLink} to="/contact">
          Contact
        </Link>
      </div>
      <img
        className={styles.navMenu}
        src={isCloseNav ? burger : close}
        onClick={() => setIsCloseNav(!isCloseNav)}
      />
    </>
  );
};

export default HeaderNavigation;
