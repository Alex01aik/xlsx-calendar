import { createContext, useContext } from 'react';
import { ModalManager, modalManager } from './ModalManager';

export const ModalContext = createContext<ModalManager | undefined>(modalManager);

export function useModal(): ModalManager {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
