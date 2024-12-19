import { useState } from 'react';
import { AtSymbolIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import LoadingPage from '../../pages/loading/LoadingPage';
import { Sesh } from '../../types/sesh';
import MyDivider from '../common/MyDivider';
import { BACKEND_ROUTES } from '../../constants/routes';
import useAsyncEffect from 'use-async-effect';
import { User } from '../../types/user';
import { HandThumbUpIcon, UserIcon } from '@heroicons/react/24/outline';
import { HandThumbDownIcon } from '@heroicons/react/24/outline';

import CustomAvatar from '../common/Avatar';

interface IncomingSeshInviteItemsProps {
  sesh: Sesh;
  token?: string;
}

const IncomingSeshInviteItems = ({
  sesh,
  token,
}: IncomingSeshInviteItemsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [sendersDetails, setSendersDetails] = useState<User | undefined>(
    undefined,
  );
  const [givenAnswer, setGivenAnswer] = useState<
    'accepted' | 'declined' | 'pending'
  >(sesh?.answer ? sesh?.answer : 'pending');
  const [seshInfo, setSeshInfo] = useState<Sesh | undefined>(undefined);
  // const date = new Date(sesh?.created_at).toISOString();
  const confirm = 'Confirm';
  const decline = 'Decline';
  const [selected, setSelected] = useState('');
  const handleConfirmClick = () => {
    if (selected !== confirm) {
      setSelected(confirm);
    } else {
      return;
    }
  };
  const handleDeclineClick = () => {
    if (selected !== decline) {
      setSelected(decline);
    } else {
      return;
    }
  };
  const handleSubmitDecision = async () => {
    const seshId = sesh.sesh_id;
    const answer = selected === confirm ? 'accepted' : 'declined';

    const response = await fetch(
      `${BACKEND_ROUTES.SESH_BASE_URL}/${seshId}/${answer}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const responseBody = await response.json();
    if (!response.ok) {
      console.log('ERR', responseBody);
    }

    if (responseBody?.data === true) {
      window.location.reload();
    }
  };

  const fetchSenderInfo = async (userId: string) => {
    const response = await fetch(
      `${BACKEND_ROUTES.GET_SPECIFIC_USER_URL}/${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const responseBody = await response.json();
    if (!response.ok) {
      throw new Error('Failed to fetch sender info');
    }
    return responseBody?.data;
  };

  const fetchSeshInfo = async () => {
    const response = await fetch(
      `${BACKEND_ROUTES.SESH_BASE_URL}/${sesh.sesh_id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const responseBody = await response.json();
    if (!response.ok) {
      console.log('NOTOKAY');
    }
    if (responseBody?.data?.sesh_created_by) {
      const sender: User = await fetchSenderInfo(
        responseBody?.data?.sesh_created_by,
      );
      return { ...responseBody?.data, sender };
    }
    return responseBody?.data;
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  useAsyncEffect(async (isMounted) => {
    if (!isMounted()) return;
    const seshInfo: Sesh = await fetchSeshInfo();
    setSendersDetails(seshInfo?.sender);
    delete seshInfo?.sender;
    setSeshInfo(seshInfo);
    setIsLoading(false);
  }, []);

  return (
    <>
      {!isLoading && (
        <div className="my-1 flex flex-col rounded-lg bg-neon-blue-50 p-1  ">
          <header className="py-1">
            <h1 className="text-center text-3xl font-medium text-neon-blue-900">
              Sesh Invite
            </h1>
            <MyDivider text={'From'} />
          </header>
          <div className="mx-auto mt-1  flex flex-col space-y-1">
            <CustomAvatar email={sendersDetails?.email} size={'md'} />
            <p className="text-sm font-medium text-neon-blue-900">
              {sendersDetails?.email
                ? sendersDetails.email.split('@')[0]
                : 'Loading'}
            </p>
          </div>
          <div className="my-1 ">
            <h3 className="text-center text-xs  text-neon-blue-900 md:text-sm ">
              Lets play some:
            </h3>
            <h2 className="text-center text-sm font-medium text-neon-blue-900 md:text-base">
              {seshInfo?.game}
            </h2>
            <MyDivider text={'When'} />
          </div>
          <div className="z-20 mx-auto flex flex-col text-center">
            <p className="text-base font-medium text-neon-blue-900">
              {sendersDetails?.email
                ? sendersDetails.email.split('@')[0]
                : 'Loading'}
            </p>
            <p className="text-sm text-neon-blue-900">proposes</p>
            <div className="mx-auto flex flex-col items-center justify-center space-x-0 space-y-2 md:flex-row md:space-x-3 md:space-y-0">
              <h1 className="flex text-lg  font-medium text-neon-blue-900">
                {seshInfo?.proposed_date}
              </h1>
              <AtSymbolIcon className="flex w-6  fill-neon-blue-600 " />
              <h2 className=" text-lg font-medium tracking-wide text-neon-blue-900">
                {seshInfo?.proposed_time}
              </h2>
            </div>
            {givenAnswer === 'pending' ? (
              <div className="flex flex-col">
                <span className="mx-auto my-2 mb-4 flex rounded-md shadow-sm">
                  <button
                    onClick={handleConfirmClick}
                    id={confirm}
                    className={clsx(
                      'relative inline-flex items-center rounded-l-md   px-4 py-2 text-sm font-medium ',
                      selected === confirm
                        ? 'border border-white bg-green-700 text-green-50 '
                        : 'border border-gray-300 bg-white text-green-700 hover:border-green-50 hover:bg-green-700 hover:text-green-50 hover:ring-1 hover:ring-green-500',
                    )}
                  >
                    {confirm}
                  </button>
                  <button
                    onClick={handleDeclineClick}
                    id={decline}
                    className={clsx(
                      'relative inline-flex items-center rounded-r-md   px-4 py-2 text-sm font-medium',
                      selected === decline
                        ? 'border border-white bg-red-700 text-red-50 '
                        : 'border border-gray-300 bg-white text-red-700 hover:border-red-50 hover:bg-red-700 hover:text-red-50  hover:ring-1 hover:ring-red-500',
                    )}
                  >
                    {decline}
                  </button>
                </span>
                <button
                  disabled={selected !== confirm && selected !== decline}
                  onClick={handleSubmitDecision}
                  className="my-0.5 inline-block rounded-lg bg-neon-blue-600 px-1.5 py-2 text-sm font-medium text-neon-blue-50 hover:bg-neon-blue-800 disabled:bg-gray-400"
                >
                  Make Decision
                </button>
              </div>
            ) : givenAnswer === 'accepted' ? (
              <div className="inline-block rounded bg-green-700 px-1 py-0.5 text-sm font-medium text-green-50 md:mx-3 md:px-2 md:py-1 lg:text-base">
                {givenAnswer}
              </div>
            ) : (
              <div className="inline-block rounded bg-red-700 px-1 py-0.5 text-sm font-medium text-red-50 md:mx-3 md:px-2 md:py-1 lg:text-base">
                {givenAnswer}
              </div>
            )}

            <div className="mx-auto my-1 flex w-full flex-row justify-evenly ">
              <div className="flex flex-row space-x-2">
                <p className="font-medium text-neon-blue-900">
                  {seshInfo?.num_accepted}
                </p>
                <HandThumbUpIcon className="h-6 w-6 fill-green-500 text-green-800" />
              </div>
              <div className="flex flex-row space-x-2">
                <p className="font-medium text-neon-blue-900">
                  {seshInfo?.num_declined}
                </p>
                <HandThumbDownIcon className="h-6 w-6 fill-red-500 text-red-800" />
              </div>
              <div className="flex flex-row space-x-2">
                <p className="font-medium text-neon-blue-900">
                  {seshInfo?.num_recipients}
                </p>
                <UserIcon className="h-6 w-6 fill-blue-500 text-slate-800" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default IncomingSeshInviteItems;
