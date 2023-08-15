import React, { ReactNode } from 'react';
import styles from './styles.module.css';

export type BetaComponentProps = {
  children: ReactNode;
};

const BetaComponent: React.FC<BetaComponentProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.trigger}>{children}</div>
      <div className={styles.content}>Not available in the beta version</div>
    </div>
  );
};

export default BetaComponent;
