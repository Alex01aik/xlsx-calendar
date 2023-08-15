import React from 'react';
import styles from './styles.module.css';
import profile from '../../../assets/images/profile.svg';
import DateWeatherPanel from '../../DateWeatherPanel';
import BetaComponent from '../../BetaComponent';

export type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className={styles.headerWrapper}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.mainTitle}>Whensy</h1>
          <h2 className={styles.subTitle}>of Moorestown</h2>
        </div>
        <BetaComponent>
          <img className={styles.profile} src={profile} alt="profile" />
        </BetaComponent>
      </div>
      <DateWeatherPanel />
    </header>
  );
};

export default Header;
