import { createContext, ReactNode, useReducer } from 'react';
import ALERT_REDUCER from './AlertReducer';

export interface AlertState {
  msg: string;
  type: string;
}

export type AlertContextProps = {
  alert: AlertState | null;
  setAlert: (msg: string, type: string) => void;
};

const initialState: AlertState | null = null;

const AlertContext = createContext<AlertContextProps>({
  alert: null,
  setAlert: () => {},
});

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const [state, dispatch] = useReducer(ALERT_REDUCER, initialState);

  const setAlert = (msg: string, type: string) => {
    dispatch({
      type: 'SET_ALERT',
      payload: { msg, type },
    });

    setTimeout(
      () =>
        dispatch({
          type: 'REMOVE_ALERT',
        }),
      3000
    );
  };

  return (
    <AlertContext.Provider value={{ alert: state, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
