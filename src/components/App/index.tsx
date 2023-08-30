import React, { useEffect, useState } from 'react';
import './global.css';
import styles from './styles.module.css';
import Header from '../layout/Header';
import Main from '../layout/Main';
import { StoreProvider } from '../../utils/store/StoreProvider';
import { ModalProvider } from '../../utils/modal/ModalProvider';
import ModalBoundary from '../modal/ModalBoundary';
import { Route, Routes, useLocation } from 'react-router-dom';
import CalendarPage from '../../pages/calendar';
import AboutPage from '../../pages/about';
import ContactPage from '../../pages/contact';
import CoverNavigation from '../layout/navigation/CoverNavigation';

export const fixedHeightPages: string[] = ['/'];

export type AppProps = {};

const App: React.FC<AppProps> = () => {
  const location = useLocation();
  const [isCloseNav, setIsCloseNav] = useState<boolean>(true);
  const [isRunTopScroll, toggleTopScroll] = useState<boolean>(false);
  const [isFixedHeight, setIsFixedHeight] = useState<boolean>(false);

  useEffect(() => {
    setIsFixedHeight(fixedHeightPages.includes(location.pathname));
  }, [location]);

  return (
    <StoreProvider>
      <ModalProvider>
        <div className={`${styles.root} ${isFixedHeight ? styles.fixedHeight : ''}`}>
          <Header
            isCloseNav={isCloseNav}
            setIsCloseNav={setIsCloseNav}
            runScroll={() => {
              toggleTopScroll(!isRunTopScroll);
            }}
          />
          <Main>
            {!isCloseNav && <CoverNavigation close={() => setIsCloseNav(true)} />}
            <Routes>
              <Route path="/" element={<CalendarPage isRunTopScroll={isRunTopScroll} />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </Main>
        </div>
        <ModalBoundary />
      </ModalProvider>
    </StoreProvider>
  );
};

export default App;
