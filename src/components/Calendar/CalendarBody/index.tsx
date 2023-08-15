import React, { useEffect, useRef } from 'react';
import styles from './styles.module.css';
import clock from '../../../assets/images/clock.svg';
import location from '../../../assets/images/location.svg';
import { CalendarDate } from '../CalendarDate';
import { EventType } from '../../../utils/types/EventType';

export type CalendarBodyProps = {
  events: EventType[];
};

const CalendarBody: React.FC<CalendarBodyProps> = ({ events }) => {
  const eventsRef = useRef<any>(null);
  useEffect(() => {
    eventsRef.current.scrollTop = eventsRef.current.scrollHeight;
  }, [events]);

  return (
    <div className={styles.eventsWrapper}>
      <div className={styles.events} ref={eventsRef}>
        {events.map((item, index) => (
          <div key={index} className={styles.event}>
            <CalendarDate
              date={item.date}
              isFirst={index === 0}
              isCurrentDay={index > 0 ? item.date === events[index - 1].date : false}
            />
            <div className={styles.eventData}>
              <h6 className={styles.eventTitle}>{item.title}</h6>
              <div className={styles.eventInfo}>
                <div className={`${styles.eventTime} ${styles.eventExtra}`}>
                  <img src={clock} className={styles.eventIcon} />
                  {item.time}
                </div>
                <div className={`${styles.eventLocation} ${styles.eventExtra}`}>
                  <img src={location} className={styles.eventIcon} />
                  {item.address}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarBody;
