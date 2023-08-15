import { createContext, useContext } from 'react';
import { ActionType, State } from './store';

export interface StoreContextType {
  state: State;
  dispatch: React.Dispatch<ActionType>;
}

export const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function useStore(): StoreContextType {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
