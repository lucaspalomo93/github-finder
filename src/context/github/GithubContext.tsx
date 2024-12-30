import { createContext, ReactNode, useReducer } from 'react';
import GITHUB_REDUCER from './GithubReducer';

export interface User {
  id: number;
  login: string;
  avatar_url: string;
}

export interface GithubContextProps {
  users: User[];
  loading: boolean;
  fetchUsers: (text: string) => void;
  resetUsers: () => void;
}

const initialState = {
  users: [],
  loading: false,
  fetchUsers: () => {},
  resetUsers: () => {},
};

const GithubContext = createContext<GithubContextProps>(initialState);

interface GithubProviderProps {
  children: ReactNode;
}

const GITHUB_URL = import.meta.env.VITE_REACT_APP_GITHUB_URL;

export const GithubProvider = ({ children }: GithubProviderProps) => {
  const [state, dispatch] = useReducer(GITHUB_REDUCER, initialState);

  const fetchUsers = async (text: string) => {
    setLoading();
    const params = new URLSearchParams({
      q: text,
    });
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`);
    const { items } = await response.json();
    dispatch({
      type: 'GET_USERS',
      payload: items,
    });
  };

  const resetUsers = () => dispatch({ type: 'RESET_USERS' });

  // Set loading
  const setLoading = () => dispatch({ type: 'SET_LOADING', payload: true });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        fetchUsers,
        resetUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
