import { FC, useState } from 'react';
import {
  EmptyState,
  InviteEmptyState,
} from '../../components/common/EmptyState';
import { User } from '../../types/user';
import { BACKEND_ROUTES, INTERNAL_ROUTES } from '../../constants/routes';
import LoadingPage from '../loading/LoadingPage';
import { ErrorPage } from '../error/Error';
import { useNavigate } from 'react-router-dom';
import Friends from '../../components/dashboard/Friends';
import useAsyncEffect from 'use-async-effect';
import IncomingSeshInviteItems from '../../components/dashboard/IncomingSeshInviteItem';
import { Sesh } from '../../types/sesh';
import UpcomingCreatedSeshItem from '../../components/dashboard/UpcomingCreatedSeshItem';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { SeshSendInviteModal } from '../../components/common/Modals';

const DashboardPage: FC = () => {
  const navigate = useNavigate();
  const authObject = sessionStorage.getItem('pfg-auth');
  const token = authObject ? JSON.parse(authObject).token : undefined;
  const [me, setMe] = useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );
  const [errorStatusCode, setErrorStatusCode] = useState<number | undefined>(
    undefined,
  );
  const [incomingSeshInvites, setIncomingSeshInvites] = useState<
    (string | Sesh)[]
  >([]);
  const [upcomingCreatedSeshes, setUpcomingCreatedSeshes] = useState<
    (string | Sesh)[]
  >([]);
  const [upcomingAcceptedSeshes, setUpcomingAcceptedSeshes] = useState<
    (string | Sesh)[]
  >([]);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const fetchMe = async (): Promise<User> => {
    const response = await fetch(BACKEND_ROUTES.GET_ME_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const responseBody = await response.json();

    if (!response.ok) {
      if (response.status === 404) {
        sessionStorage.clear();
        setIsLoading(false);
        navigate(INTERNAL_ROUTES.LOGIN_PAGE);
      }
      setErrorStatusCode(responseBody?.statusCode);
      setErrorMessage(responseBody?.message);
      setIsLoading(false);
      setError(true);
    }

    setIsLoading(false);
    return responseBody?.data;
  };

  useAsyncEffect(async (isMounted) => {
    const userObject = await fetchMe();
    if (!isMounted()) return;
    console.log(userObject);
    setMe(userObject);
    setIncomingSeshInvites(userObject?.sesh_invites);
    setUpcomingCreatedSeshes(userObject?.upcoming_created_seshes);
    setUpcomingAcceptedSeshes(userObject?.upcoming_accepted_seshes);
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage message={errorMessage} code={errorStatusCode} />;
  }

  return (
    <>
      {
        <div id={'dashboard'} className="min-h-full bg-neon-blue-50 ">
          <div className="pb-32">
            <header className="border-y border-neon-blue-700 py-1 md:border-y-0 md:border-t">
              <div className="mx-auto flex max-w-7xl flex-row items-center justify-between px-4 sm:px-6 lg:px-8">
                <h1 className="text-center text-4xl font-semibold text-neon-blue-900 md:text-left">
                  Dashboard
                </h1>
                <PlusCircleIcon
                  onClick={() => {
                    handleShowModal();
                  }}
                  className="w-12 rounded-full  p-1  text-neon-blue-600 hover:bg-neon-blue-800 hover:text-white md:w-16"
                />
              </div>
            </header>
          </div>

          <main className="mx-3 -mt-32 space-y-3 pt-3 ">
            <section className="mx-auto max-w-7xl ">
              <div className="mx-auto  items-center  justify-center rounded-lg bg-neon-blue-200 px-5 py-6 text-center sm:px-6 ">
                <h1 className="-mt-2  text-left text-xl font-medium">
                  Upcoming Created Seshes
                </h1>
                <div className="flex flex-row flex-wrap items-center justify-center gap-x-2 gap-y-2 rounded-lg border-4  border-neon-blue-800/50 ">
                  {upcomingCreatedSeshes?.length ? (
                    upcomingCreatedSeshes.map((sesh, idx) => (
                      <UpcomingCreatedSeshItem
                        key={idx}
                        sesh={sesh as Sesh}
                        userObject={me as User}
                      />
                    ))
                  ) : (
                    <EmptyState handleShow={handleShowModal} />
                  )}
                </div>
              </div>
            </section>

            <section className="mx-auto max-w-7xl">
              <div className="mx-auto  items-center  justify-center rounded-lg bg-neon-blue-200 px-5 py-6 text-center sm:px-6 ">
                <h1 className="-mt-2  text-left text-xl font-medium">
                  Upcoming Sesh Invites
                </h1>
                <div className="flex flex-row flex-wrap items-center justify-center gap-x-2 gap-y-2 rounded-lg border-4  border-neon-blue-800/50 ">
                  {incomingSeshInvites?.length ? (
                    incomingSeshInvites.map((sesh, idx) => (
                      <IncomingSeshInviteItems
                        key={idx}
                        sesh={sesh as Sesh}
                        token={token}
                      />
                    ))
                  ) : (
                    <InviteEmptyState />
                  )}
                </div>
              </div>
            </section>
            <section className="mx-auto max-w-7xl pb-3">
              <Friends navigate={navigate} />
            </section>
          </main>
          <SeshSendInviteModal
            userEmail={me?.email}
            handleClose={handleCloseModal}
            authToken={token}
            open={showModal}
            specificRecipient={undefined}
          />
        </div>
      }
    </>
  );
};

export default DashboardPage;
