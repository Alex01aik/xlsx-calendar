import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useStore } from '../../../utils/store/useStore';
import { getEventsByCategory } from '../../../utils/store/store';
import dropdown from '../../../assets/images/dropdown.svg';
import { OrganizationType } from '../../../utils/types/OrganizationType';

export type CalendarCategoriesProps = {
  close: () => void;
};

const CalendarCategories: React.FC<CalendarCategoriesProps> = ({ close }) => {
  const { state, dispatch } = useStore();
  const [opened, setOpened] = useState<Record<string, boolean>>({});
  const [selected, setSelected] = useState<OrganizationType[]>([]);
  const [isSelectedAll, setIsSelectedAll] = useState<boolean>(false);
  const [isCleanedAll, setIsCleanedAll] = useState<boolean>(false);

  useEffect(() => {
    setSelected(state.actualOrganizations);
  }, [state]);

  useEffect(() => {
    const isAllMatch = state.organizations.every((item) =>
      selected.find((selOrg) =>
        item.subs
          ? selOrg.name === item.name && item.subs.every((iSub) => selOrg.subs?.includes(iSub))
          : selOrg.name === item.name,
      ),
    );
    setIsSelectedAll(isAllMatch);
    setIsCleanedAll(Boolean(!selected.length));
  }, [selected, state]);

  const toggleSubOrg = (org: OrganizationType, subOrg: string) => {
    const selectedOrg = selected.find((selectedOrg) => org.name === selectedOrg.name);
    if (selectedOrg) {
      const newSelectedSubOrgs = selectedOrg?.subs?.includes(subOrg)
        ? selectedOrg.subs.filter((sub) => sub !== subOrg)
        : [...(selectedOrg.subs ?? []), subOrg];

      newSelectedSubOrgs.length
        ? setSelected([
            ...selected.filter((item) => item.name !== org.name),
            {
              name: selectedOrg.name,
              subs: newSelectedSubOrgs,
            },
          ])
        : toggleOrg(org.name);
    } else {
      const newOrg = state.organizations.find(
        (item) => item.name === org.name && item.subs?.includes(subOrg),
      );
      if (newOrg) {
        setSelected([
          ...selected,
          {
            name: newOrg.name,
            subs: [subOrg],
          },
        ]);
      }
    }
  };

  const toggleOrg = (orgName: string) => {
    const selectedOrg = selected.find((selectedOrg) => orgName === selectedOrg.name);
    if (selectedOrg) {
      setSelected([...selected.filter((item) => item.name !== orgName)]);
    } else {
      const org = state.organizations.find((item) => item.name === orgName);
      setSelected(org ? [...selected, org] : [...selected]);
    }
  };

  const toggleDropdown = (category: string) => {
    const value = Boolean(opened[category]);
    setOpened({
      ...opened,
      [category]: !value,
    });
  };

  const selectAll = () => {
    setSelected(state.organizations);

    setIsSelectedAll(true);
    setIsCleanedAll(false);
  };

  const cleanAll = () => {
    setSelected([]);

    setIsSelectedAll(false);
    setIsCleanedAll(true);
  };

  const toggleAll = (type: 'select' | 'clean') => {
    switch (type) {
      case 'select':
        isSelectedAll ? cleanAll() : selectAll();
        break;
      case 'clean':
        isCleanedAll ? selectAll() : cleanAll();
        break;
    }
  };

  const save = () => {
    getEventsByCategory(dispatch, selected);
  };

  return (
    <div className={styles.root}>
      <div className={styles.selectAllPanel}>
        {/* <div className={styles.selectAllInput}>
          <p>Clean all</p>
          <input
            className={`${styles.selectAllCheckbox} ${isCleanedAll ? styles.checked : ''}`}
            type="checkbox"
            checked={isCleanedAll}
            onChange={() => toggleAll('clean')}
          />
        </div> */}
        <div className={styles.selectAllInput}>
          <p>Select all</p>
          <input
            className={`${styles.selectAllCheckbox} ${isSelectedAll ? styles.checked : ''}`}
            type="checkbox"
            checked={isSelectedAll}
            onChange={() => toggleAll('select')}
          />
        </div>
      </div>
      <div className={styles.calendarCategoriesWrapper}>
        <div className={styles.calendarCategories}>
          {state.organizations.map((org) => {
            const selectedOrg = selected.find((selOrg) => org.name === selOrg.name);
            return (
              <div key={org.name} className={styles.dropdownCategory}>
                <div className={styles.calendarCategory}>
                  <input
                    className={`${styles.calendarCategoryCheckbox} ${
                      selectedOrg?.name ? styles.checked : ''
                    }`}
                    type="checkbox"
                    onChange={() => toggleOrg(org.name)}
                  />
                  <p className={styles.calendarCategoryText}>{org.name}</p>
                  {org.subs && (
                    <img
                      src={dropdown}
                      className={opened[org.name] ? styles.open : ''}
                      onClick={() => toggleDropdown(org.name)}
                    />
                  )}
                </div>
                {opened[org.name] && (
                  <div className={styles.calendarCategoryList}>
                    {org.subs?.map((sub) => {
                      return (
                        <div key={sub} className={styles.calendarCategory}>
                          <input
                            className={`${styles.calendarCategoryCheckbox} ${
                              selectedOrg?.subs?.includes(sub) ? styles.checked : ''
                            }`}
                            type="checkbox"
                            onChange={() => toggleSubOrg(org, sub)}
                          />
                          <p className={styles.calendarCategoryText}>{sub}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.buttons}>
        <button className={`${styles.button} ${styles.cancelButton}`} onClick={close}>
          Cancel
        </button>
        <button
          className={`${styles.button} ${styles.saveButton}`}
          onClick={() => {
            if (!isCleanedAll) {
              save();
              close();
            }
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CalendarCategories;
