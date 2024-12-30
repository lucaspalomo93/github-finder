import { AlertState } from './AlertContext';

export type Action =
  | { type: 'SET_ALERT'; payload: { msg: string; type: string } }
  | { type: 'REMOVE_ALERT' };

const ALERT_REDUCER = (
  state: AlertState | null,
  action: Action
): AlertState | null => {
  switch (action.type) {
    case 'SET_ALERT':
      return action.payload;
    case 'REMOVE_ALERT':
      return null;
    default:
      return state;
  }
};

export default ALERT_REDUCER;
