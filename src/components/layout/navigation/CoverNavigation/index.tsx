import React from 'react';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';

export type CoverNavigationProps = {
  close: () => void;
};

const CoverNavigation: React.FC<CoverNavigationProps> = ({ close }) => {
  return (
    <div className={styles.coverNavigation}>
      <Link className={styles.coverNavLink} to="/about" onClick={close}>
        About
      </Link>
      <Link className={styles.coverNavLink} to="/contact" onClick={close}>
        Contact
      </Link>
    </div>
  );
};

export default CoverNavigation;
