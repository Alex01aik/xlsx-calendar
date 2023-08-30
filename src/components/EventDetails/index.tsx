import React from 'react';
import { EventType } from '../../utils/types/EventType';
import styles from './styles.module.css';
import clock from '../../assets/images/clock-yellow.svg';
import location from '../../assets/images/location-yellow.svg';
import close from '../../assets/images/close.svg';
import { formatDate } from '../../utils/funcs/formatDate';
import { days } from '../../utils/consts/days';
import { useModal } from '../../utils/modal/useModal';

export type EventDetailsProps = {
  event: EventType;
};

const EventDetails: React.FC<EventDetailsProps> = ({ event }) => {
  const modalManager = useModal();
  const [month, date] = formatDate(event.date);
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <img src={close} className={styles.close} onClick={() => modalManager.close()} />
      </div>
      <div className={styles.main}>
        <div className={styles.date}>
          <span>
            {month.toUpperCase()} {date}
          </span>
          <div className={styles.point} />
          <span>{days[new Date(event.date).getDay()].toUpperCase()}</span>
        </div>
        <h4 className={styles.title}>{event.title}</h4>
        <div className={styles.info}>
          <span className={styles.description}>{event.description}</span>
          <span className={styles.description}>{event.details}</span>
          <div className={styles.orgs}>
            {event.organization} <div className={styles.orgPoint} /> {event.subOrganization}
          </div>
        </div>
      </div>

      <div className={styles.extra}>
        <div className={styles.extraItem}>
          <img src={location} color="black" className={styles.eventIcon} />
          <span className={styles.extraText}>{event.address}</span>
        </div>
        <div className={styles.extraItem}>
          <img src={clock} className={styles.eventIcon} />
          <span className={styles.extraText}>{event.time}</span>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
