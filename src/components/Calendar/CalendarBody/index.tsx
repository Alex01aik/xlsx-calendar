import React, { useEffect, useRef } from 'react';
import styles from './styles.module.css';
import clock from '../../../assets/images/clock.svg';
import location from '../../../assets/images/location.svg';
import { CalendarDate } from '../CalendarDate';
import { EventType } from '../../../utils/types/EventType';
import { useModal } from '../../../utils/modal/useModal';
import { observer } from 'mobx-react';
import EventDetails from '../../EventDetails';

export type CalendarBodyProps = {
  events: EventType[];
  isRunTopScroll?: boolean;
};

const CalendarBody: React.FC<CalendarBodyProps> = ({ events, isRunTopScroll }) => {
  const eventsRef = useRef<any>(null);
  const modalManager = useModal();

  const scrollToTop = () => {
    if (eventsRef.current) {
      eventsRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToTop();
  }, [isRunTopScroll]);

  return (
    <div className={styles.eventsWrapper} ref={eventsRef}>
      <div className={styles.events}>
        {events.map((item, index) => (
          <div
            key={index}
            className={styles.event}
            onClick={() => modalManager.open(<EventDetails event={item} />)}
          >
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
                  {item.address.split(',', 1)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default observer(CalendarBody);
