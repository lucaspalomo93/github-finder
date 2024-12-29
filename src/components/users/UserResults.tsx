import { useEffect, useState } from 'react';

interface User {
  id: number;
  login: string;
}

const UserResults = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_GITHUB_URL}/users`
    );
    const data = await response.json();
    setUsers(data);
    setLoading(false);
  };

  if (!loading) {
    return (
      <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
        {users.map((user) => (
          <h3 key={user.id}>{user.login}</h3>
        ))}
      </div>
    );
  } else {
    return <h3>Loading...</h3>;
  }
};

export default UserResults;
