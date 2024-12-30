import { GithubContextProps, User } from './GithubContext';

type Action =
  | { type: 'GET_USERS'; payload: User[] }
  | { type: 'SET_LOADING'; payload: boolean };

const GITHUB_REDUCER = (state: GithubContextProps, action: Action) => {
  switch (action.type) {
    case 'GET_USERS':
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default GITHUB_REDUCER;
