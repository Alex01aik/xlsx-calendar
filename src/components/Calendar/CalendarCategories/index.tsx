import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useStore } from '../../../utils/store/useStore';
import { getEventsByCategory } from '../../../utils/store/store';

export type CalendarCategoriesProps = {
  categories?: string[];
  close: () => void;
};

const CalendarCategories: React.FC<CalendarCategoriesProps> = ({ categories, close }) => {
  const { state, dispatch } = useStore();
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const newSelected: any = {};
    state.categories.map((category) => {
      const res = state.events.some((event) => event.category === category);
      newSelected[category] = res;
    });
    const isEveryTrue = Object.values(newSelected).every((value) => value === true);
    if (!isEveryTrue) {
      setSelected({ ...selected, ...newSelected });
    }
  }, []);

  const toggle = (category: string) => {
    const value = Boolean(selected[category]);
    setSelected({
      ...selected,
      [category]: !value,
    });
  };

  const save = () => {
    const newCategories = Object.entries(selected)
      .filter(([key, value]) => {
        if (value) {
          return key;
        }
      })
      .map(([key]) => key);
    getEventsByCategory(dispatch, newCategories);
  };

  return (
    <div className={styles.root}>
      <div className={styles.calendarCategoriesWrapper}>
        <div className={styles.calendarCategories}>
          {categories?.map((category) => (
            <div
              key={category}
              className={styles.calendarCategory}
              onClick={() => toggle(category)}
            >
              <input
                className={`${styles.calendarCategoryCheckbox} ${
                  selected[category] ? styles.checked : ''
                }`}
                type="checkbox"
                checked={selected[category] ?? false}
                onChange={() => toggle(category)}
              />
              <p className={styles.calendarCategoryText}>{category}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.buttons}>
        <button className={`${styles.button} ${styles.cancelButton}`} onClick={close}>
          Cancel
        </button>
        <button
          className={`${styles.button} ${styles.saveButton}`}
          onClick={() => {
            save();
            close();
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CalendarCategories;
