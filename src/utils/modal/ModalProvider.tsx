import { ReactNode } from 'react';
import { ModalContext } from './useModal';
import { modalManager } from './ModalManager';

export interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  return <ModalContext.Provider value={modalManager}>{children}</ModalContext.Provider>;
}
