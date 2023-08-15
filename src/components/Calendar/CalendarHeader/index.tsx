import React, { useState } from 'react';
import calendar from '../../../assets/images/calendar.svg';
import dropdown from '../../../assets/images/dropdown.svg';
import setting from '../../../assets/images/settings.svg';
import styles from './styles.module.css';
import CalendarCategories from '../CalendarCategories';
import BetaComponent from '../../BetaComponent';

export type CalendarHeaderProps = {
  categories?: string[];
};

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ categories }) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  return (
    <>
      <div className={styles.calendarHeader}>
        <div
          className={`${styles.calendarFilter} ${isOpened ? styles.checked : ''}`}
          onClick={() => setIsOpened(!isOpened)}
        >
          <img src={calendar} className={styles.calendarIcon} />
          <p className={styles.calendarFilterTitle}>Calendars</p>
          <img src={dropdown} className={isOpened ? styles.open : ''} />
        </div>
        {isOpened && (
          <CalendarCategories categories={categories} close={() => setIsOpened(false)} />
        )}
        <BetaComponent>
          <img src={setting} className={`${styles.calendarIcon} ${styles.settings}`} />
        </BetaComponent>
      </div>
      {isOpened && <div className={styles.cover} onClick={() => setIsOpened(false)} />}
    </>
  );
};

export default CalendarHeader;
