import React from 'react';
import { observer } from 'mobx-react';
import { useModal } from '../../../utils/modal/useModal';
import styles from './styles.module.css';

const ModalBoundary: React.FC = observer(() => {
  const modalManager = useModal();

  return modalManager.isOpen ? (
    <div className={styles.root}>
      <div className={styles.content}>{modalManager.component}</div>
      <div className={styles.cover} onClick={() => modalManager.close()} />
    </div>
  ) : null;
});

export default ModalBoundary;
