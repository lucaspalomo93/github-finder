import {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useContext,
  useState,
} from 'react';
import GithubContext from '../../context/github/GithubContext';

const UserSearch = () => {
  const { users, fetchUsers, resetUsers } = useContext(GithubContext);
  const [text, steText] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    steText(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text === '') {
      alert('Please enter something');
    } else {
      fetchUsers(text);
      steText('');
    }
  };

  const handleClear = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    resetUsers();
  };

  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8 '>
      <div>
        <form onSubmit={handleSubmit} className='form-control'>
          <div className='relative'>
            <input
              className='w-full pr-40 bg-gray-200 input input-lg text-black'
              type='text'
              placeholder='Search'
              value={text}
              onChange={handleChange}
            />
            <button
              type='submit'
              className='absolute top-0 right-0 rounded-l-none w-36 btn btn-lg'
            >
              Go
            </button>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div>
          <button onClick={handleClear} className='btn btn-ghost btn-lg'>
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default UserSearch;
