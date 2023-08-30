import React from 'react';
import Calendar from '../../components/Calendar';
import Chat from '../../components/Chat';
import styles from './styles.module.css';
import DateWeatherPanel from '../../components/DateWeatherPanel';

export type CalendarPageProps = {
  isRunTopScroll?: boolean;
};

const CalendarPage: React.FC<CalendarPageProps> = ({ isRunTopScroll }) => {
  return (
    <div className={styles.root}>
      <div className={styles.mobileWrapper}>
        <DateWeatherPanel />
        <div className={styles.wrapper}>
          <Calendar isRunTopScroll={isRunTopScroll} />
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
