import React, { useEffect, useState } from 'react';
import { days } from '../../utils/consts/days';
import { months } from '../../utils/consts/months';
import styles from './styles.module.css';

export type DateWeatherPanelProps = {};

const DateWeatherPanel: React.FC<DateWeatherPanelProps> = () => {
  const [dateData, setDateData] = useState<{
    day: string;
    month: string;
    date: number;
  }>();

  useEffect(() => {
    const date = new Date();
    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const dateOfMonth = date.getDate();
    setDateData({
      day,
      month,
      date: dateOfMonth,
    });
  }, []);

  return (
    <div className={styles.dateWeatherPanel}>
      Today is {dateData?.day}, {dateData?.month} {dateData?.date}
    </div>
  );
};

export default DateWeatherPanel;
