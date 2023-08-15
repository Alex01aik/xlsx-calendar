import React from 'react';
import styles from './styles.module.css';

export type CalendarDateProps = {
  date: string;
  isFirst?: boolean;
  isCurrentDay?: boolean;
};

export const CalendarDate: React.FC<CalendarDateProps> = ({ date, isFirst, isCurrentDay }) => {
  const formatDate = (date: string) => {
    const [monthDate] = date.split(',', 1);
    const [month, dayDate] = monthDate.split(' ', 2);

    return [month.toUpperCase().slice(0, 3), dayDate];
  };

  const [month, dayDate] = formatDate(date);

  return (
    <div className={styles.eventDateWrapper}>
      <div className={styles.eventDate}>
        {!isCurrentDay && (
          <>
            <span className={styles.eventDateMonth}>{month}</span>
            <span className={styles.eventDateDate}>{dayDate}</span>
          </>
        )}
      </div>

      <div className={`${styles.timeLine} ${isFirst ? styles.first : ''}`} />
      {!isCurrentDay && <div className={styles.point} />}
    </div>
  );
};
