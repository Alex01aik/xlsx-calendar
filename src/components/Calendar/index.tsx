import React, { useEffect } from 'react';
import styles from './styles.module.css';
import mainStyles from '../layout/Main/styles.module.css';
import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';
import { useStore } from '../../utils/store/useStore';
import { getEvents } from '../../utils/store/store';

export type CalendarProps = {};

const Calendar: React.FC<CalendarProps> = () => {
  const { state, dispatch } = useStore();

  useEffect(() => {
    getEvents(dispatch).catch();
  }, [dispatch]);

  return (
    <div className={`${mainStyles.block} ${styles.calendar}`}>
      <CalendarHeader categories={state.categories} />
      <CalendarBody events={state.events} />
    </div>
  );
};

export default Calendar;
