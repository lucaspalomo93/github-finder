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
  fetchUsers: () => void;
}

const initialState = {
  users: [],
  loading: false,
  fetchUsers: () => {},
};

const GithubContext = createContext<GithubContextProps>(initialState);

interface GithubProviderProps {
  children: ReactNode;
}

const GITHUB_URL = import.meta.env.VITE_REACT_APP_GITHUB_URL;

export const GithubProvider = ({ children }: GithubProviderProps) => {
  const [state, dispatch] = useReducer(GITHUB_REDUCER, initialState);

  // Get initial users (testing purposes)
  const fetchUsers = async () => {
    setLoading();
    const response = await fetch(`${GITHUB_URL}/users`);
    const data = await response.json();
    dispatch({
      type: 'GET_USERS',
      payload: data,
    });
  };

  // Set loading
  const setLoading = () => dispatch({ type: 'SET_LOADING', payload: true });

  return (
    <GithubContext.Provider
      value={{ users: state.users, loading: state.loading, fetchUsers }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
