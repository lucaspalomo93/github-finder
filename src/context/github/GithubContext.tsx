import { createContext, ReactNode, useReducer } from 'react';
import GITHUB_REDUCER from './GithubReducer';

export interface User {
  id: number;
  login: string;
  avatar_url: string;
  type: string;
  location: string;
  bio: string;
  blog: string;
  twitter_username: string;
  followers: number;
  following: number;
  public_repos: number;
  public_gists: number;
  hireable: boolean;
  html_url: string;
  name: string;
  websiteUrl: string;
}

export interface Repo {
  name: string;
  archive_url: string;
  id: string;
  html_url: string;
  forks: number;
  watcher_count: number;
  stargazers_count: number;
  open_issues: number;
  description: string;
}

export interface GithubContextProps {
  users: User[];
  user?: User | null;
  loading: boolean;
  repos?: Repo[];
  fetchUsers: (text: string) => void;
  fetchSingleUser: (login: string) => void;
  resetUsers: () => void;
  fetchRepos(login: string): void;
}

const initialState = {
  users: [],
  user: null,
  loading: false,
  repos: [],
  fetchUsers: () => {},
  resetUsers: () => {},
  fetchSingleUser: () => {},
  fetchRepos: () => {},
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

  const fetchRepos = async (login: string) => {
    const params = new URLSearchParams({
      sort: 'created',
      per_page: '10',
    });
    setLoading();
    const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`);
    const data = await response.json();
    dispatch({
      type: 'GET_REPOS',
      payload: data,
    });
  };

  const fetchSingleUser = async (login: string) => {
    setLoading();
    const response = await fetch(`${GITHUB_URL}/users/${login}`);
    if (response.status === 404) {
      window.location.href = '/notfound';
    } else {
      const data = await response.json();
      dispatch({
        type: 'GET_USER',
        payload: data,
      });
    }
  };

  const resetUsers = () => dispatch({ type: 'RESET_USERS' });

  // Set loading
  const setLoading = () => dispatch({ type: 'SET_LOADING', payload: true });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        user: state.user,
        repos: state.repos,
        fetchUsers,
        fetchSingleUser,
        resetUsers,
        fetchRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
