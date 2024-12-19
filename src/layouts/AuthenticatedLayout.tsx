import { FC, useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import { DashboardPageFooter } from '../components/common/Footer';
import { User } from '../types/user';
import { BACKEND_ROUTES } from '../constants/routes';
import { getSessionStorageItem } from '../utils/storage';
import useAsyncEffect from 'use-async-effect';

const AuthenticatedLayout: FC = () => {
  const accessToken = getSessionStorageItem('pfg-token');
  const token = accessToken ? accessToken : undefined;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );
  const [me, setMe] = useState<User | undefined>(undefined);

  const fetchMe = async (): Promise<void> => {
    const response = await fetch(BACKEND_ROUTES.GET_ME_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const responseBody = await response.json();

    if (!response.ok) {
      setErrorMessage(responseBody?.data?.message);
      setIsLoading(false);
      setError(true);
    }
    setMe(responseBody?.data);
    return;
  };

  useAsyncEffect(async (isMounted) => {
    if (!isMounted()) return;
    if (!token) {
      setError(true);
      setErrorMessage('You are not logged in');
      return;
    }
    await fetchMe();
    setIsLoading(false);
  }, []);

  return (
    me && (
      <div className="scroll-smooth bg-gray-300 antialiased" lang="en">
        <main className="mx-0.5 flex min-h-screen flex-col ">
          <DashboardHeader me={me} />
          <Outlet context={{ isLoading, error, errorMessage, me, token }} />
          <DashboardPageFooter />
        </main>
      </div>
    )
  );
};

export default AuthenticatedLayout;
