import { useState } from 'react';
import { Container } from '../../components/common/Container';
import UserListItem from '../../components/users/UsersListItem';
import { User } from '../../types/user';
import { BACKEND_ROUTES, INTERNAL_ROUTES } from '../../constants/routes';
import { ErrorPage } from '../error/Error';
import LoadingPage from '../loading/LoadingPage';
import useAsyncEffect from 'use-async-effect';
import { useOutletContext, useNavigate } from 'react-router-dom';

const UsersPage = () => {
  const navigate = useNavigate();
  const [globalUsers, setGlobalUsers] = useState<User[]>([]);
  const { me, token, isLoading } = useOutletContext<{
    me: User;
    token: string;
    isLoading: boolean;
  }>();
  const [loading, setLoading] = useState<boolean>(isLoading ? isLoading : true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );
  const [errorStatusCode, setErrorStatusCode] = useState<number | undefined>(
    undefined,
  );

  const [userEmail, setUserEmail] = useState<string | undefined>(undefined);

  const fetchUsers = async () => {
    const response = await fetch(BACKEND_ROUTES.USER_BASE_URL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      setError(true);
    }

    const responseBody = await response.json();

    setGlobalUsers(responseBody?.data);
  };

  useAsyncEffect(async (isMounted) => {
    if (!isMounted()) return;
    if (!me || !token) {
      setError(true);
      setErrorMessage('You are not logged in');
      setLoading(false);
      navigate(INTERNAL_ROUTES.LOGIN_PAGE);
    }
    setUserEmail(me?.email);
    await fetchUsers();
    setLoading(false);
    return () => {};
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage message={errorMessage} />;
  }

  return (
    me &&
    globalUsers.length && (
      <>
        <div className="min-h-screen bg-neon-blue-50">
          <header className="border-y border-neon-blue-700 py-1 md:border-y-0 md:border-t">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-center text-4xl font-semibold text-neon-blue-900 md:text-left">
                Users
              </h1>
            </div>
          </header>
          <Container className=" h-fit pt-3">
            <section className=" flex flex-col justify-evenly md:flex-row md:flex-wrap ">
              {globalUsers?.map((user) => (
                <UserListItem
                  key={user.email}
                  user={user}
                  authToken={token}
                  userEmail={userEmail}
                />
              ))}
            </section>
          </Container>
        </div>
      </>
    )
  );
};

export default UsersPage;
