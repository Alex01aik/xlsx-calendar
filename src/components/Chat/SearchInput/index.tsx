import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
// import plane from '../../../assets/images/plane.svg'; TODO when realise chat support
import search from '../../../assets/images/search.svg';

export type SearchInputProps = {
  onSearch: (message: string) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const placeholder: string = 'Search by event, group or keyword';
  const [value, setValue] = useState<string>('');
  const [height, setHeight] = useState<number>(0);
  const textareaRef = useRef<any>(null);

  const searchHandler = () => {
    if (value) {
      onSearch(value);
      setValue('');
      resetTextareaHeight();
    }
  };

  useEffect(() => {
    setHeight(textareaRef.current.scrollHeight);
    adjustTextareaHeight();
  }, []);

  const resetTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${height}px`;
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className={styles.search}>
      <img src={search} className={styles.searchIcon} />
      <textarea
        placeholder={placeholder}
        ref={textareaRef}
        className={styles.input}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onSearch(e.target.value);
          adjustTextareaHeight();
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            searchHandler();
          }
        }}
        rows={Math.max(1, value.split('\n').length)}
      />
      {/* TODO when realise chat support */}
      {/* <img
        className={`${styles.searchIcon} ${styles.searchButton}`}
        src={plane}
        onClick={searchHandler}
      /> */}
    </div>
  );
};

export default SearchInput;
