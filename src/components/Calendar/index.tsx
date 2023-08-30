import React, { useEffect } from 'react';
import styles from './styles.module.css';
import mainStyles from '../../pages/calendar/styles.module.css';
import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';
import { useStore } from '../../utils/store/useStore';
import { getEvents } from '../../utils/store/store';

export type CalendarProps = {
  isRunTopScroll?: boolean;
};

const Calendar: React.FC<CalendarProps> = ({ isRunTopScroll }) => {
  const { state, dispatch } = useStore();

  useEffect(() => {
    getEvents(dispatch).catch();
  }, [dispatch]);

  return (
    <div className={`${mainStyles.block} ${styles.calendar}`}>
      <CalendarHeader />
      <CalendarBody events={state.events} isRunTopScroll={isRunTopScroll} />
    </div>
  );
};

export default Calendar;
