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
import UpcomingAcceptedSeshItems from '../../components/dashboard/UpcomingAcceptedSeshItem';
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
  const [upcomingSeshes, setUpcomingSeshes] = useState<(string | Sesh)[]>([]);
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
      headers: { 'Content-Type': 'application/json', token: token },
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
    return responseBody;
  };

  useAsyncEffect(async (isMounted) => {
    const userObject = await fetchMe();
    if (!isMounted()) return;
    console.log(userObject);
    setMe(userObject);
    setIncomingSeshInvites(userObject?.upcomingUndecidedSeshes);
    setUpcomingSeshes(userObject?.upcomingAcceptedSeshes);
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

          <main className="mx-3 -mt-32 space-y-3 pt-3">
            <section className=" mx-2 flex pb-3  md:mx-auto md:max-w-3xl md:pb-6 lg:max-w-5xl">
              <div className="mx-auto  items-center  justify-center rounded-lg bg-neon-blue-200 px-5 py-6 text-center sm:px-6 ">
                <h1 className="-mt-5  text-left text-xl font-medium">
                  Upcoming Seshes
                </h1>
                <div className=" flex w-fit flex-row flex-wrap items-center justify-evenly space-x-2 space-y-1.5 rounded-lg  border-4 border-neon-blue-800/50 px-2  py-2 md:space-y-1  lg:space-x-4  ">
                  {upcomingSeshes?.length ? (
                    upcomingSeshes.map((sesh, idx) => (
                      <UpcomingAcceptedSeshItems
                        key={idx}
                        sesh={sesh as Sesh}
                      />
                    ))
                  ) : (
                    <EmptyState handleShow={handleShowModal} />
                  )}
                </div>
              </div>
            </section>

            <section className=" mx-2 flex pb-3  md:mx-auto md:max-w-3xl md:pb-6 lg:max-w-5xl">
              <div className="mx-auto  items-center  justify-center rounded-lg bg-neon-blue-200 px-5 py-6 text-center sm:px-6 ">
                <h1 className="-mt-2  text-left text-xl font-medium">
                  Pending Sesh invites
                </h1>
                <div className=" flex w-fit flex-row flex-wrap items-center justify-center space-x-2 space-y-1.5 rounded-lg  border-4 border-neon-blue-800/50 px-2  py-2 md:space-y-1  lg:space-x-4  ">
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
            <section className="mx-1.5 rounded-lg bg-neon-blue-50 px-2 pb-6 sm:px-3 md:mx-auto md:max-w-2xl lg:max-w-4xl lg:px-4  xl:max-w-7xl">
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
