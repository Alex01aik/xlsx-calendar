import React from 'react';
import styles from './styles.module.css';
import { formatDate } from '../../../utils/funcs/formatDate';

export type CalendarDateProps = {
  date: string;
  isFirst?: boolean;
  isCurrentDay?: boolean;
};

export const CalendarDate: React.FC<CalendarDateProps> = ({ date, isFirst, isCurrentDay }) => {
  const [month, dayDate] = formatDate(date);

  return (
    <div className={styles.eventDateWrapper}>
      <div className={styles.eventDate}>
        {!isCurrentDay && (
          <>
            <span className={styles.eventDateMonth}>{month.toUpperCase().slice(0, 3)}</span>
            <span className={styles.eventDateDate}>{dayDate}</span>
          </>
        )}
      </div>

      <div className={`${styles.timeLine} ${isFirst ? styles.first : ''}`} />
      {!isCurrentDay && <div className={styles.point} />}
    </div>
  );
};
