import { AtSymbolIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import { Sesh } from '../../types/sesh';
import MyDivider from '../common/MyDivider';
import { BACKEND_ROUTES } from '../../constants/routes';
import useAsyncEffect from 'use-async-effect';
import LoadingPage from '../../pages/loading/LoadingPage';
import { User } from '../../types/user';
import CustomAvatar from '../common/Avatar';

interface UpcomingAcceptedSeshItemsProps {
  sesh: Sesh;
}

const UpcomingAcceptedSeshItems = ({
  sesh,
}: UpcomingAcceptedSeshItemsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [sendersDetails, setSendersDetails] = useState<User | undefined>(
    undefined,
  );
  const date = new Date(sesh?._createdAt).toISOString();

  const fetchSenderInfo = async () => {
    const response = await fetch(
      `${BACKEND_ROUTES.GET_SPECIFIC_USER_URL}/${sesh.sentFrom}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      },
    );

    const responseBody = await response.json();
    if (!response.ok) {
      console.log('NOTOKAY');
    }
    return responseBody;
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  useAsyncEffect(async (isMounted) => {
    if (!isMounted()) return;
    setIsLoading(false);
    const sender: User = await fetchSenderInfo();
    setSendersDetails(sender);
  }, []);

  return (
    <>
      {sesh && (
        <div className="my-1 flex  flex-col rounded-lg bg-neon-blue-50 p-1  ">
          <header className="py-1">
            <p className="right-2 top-2 text-right text-xs ">
              Created on: {date.split('.')[0]}
            </p>
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
              We&apos;re playing some:
            </h3>
            <h2 className="text-center text-sm font-medium text-neon-blue-900 md:text-base">
              {sesh?.game}
            </h2>
            <MyDivider text={'When'} />
          </div>
          <div className="z-20 mx-auto flex flex-col text-center">
            <div className="mx-auto flex flex-col items-center justify-center space-x-0 space-y-2 md:flex-row md:space-x-3 md:space-y-0">
              <h1 className="flex text-lg  font-medium text-neon-blue-900">
                {sesh?.proposedDay}
              </h1>
              <AtSymbolIcon className="flex w-6  fill-neon-blue-600 " />
              <h2 className=" text-lg font-medium tracking-wide text-neon-blue-900">
                {sesh?.proposedTime}
              </h2>
            </div>
          </div>
          <div className="my-0.5">
            <MyDivider text={'Confirmed'} />
          </div>
          <div className="mx-auto my-1 flex w-full flex-row justify-evenly ">
            <div className="flex flex-row space-x-2">
              <p className="font-medium text-neon-blue-900">
                {sesh?.usersConfirmed?.length}
              </p>
              <HandThumbUpIcon className="h-6 w-6 fill-green-500 text-green-800" />
            </div>
            <div className="flex flex-row space-x-2">
              <p className="font-medium text-neon-blue-900">
                {sesh?.usersDeclined?.length}
              </p>
              <HandThumbDownIcon className="h-6 w-6 fill-red-500 text-red-800" />
            </div>
            <div className="flex flex-row space-x-2">
              <p className="font-medium text-neon-blue-900">
                {sesh?.usersUnconfirmed?.length}
              </p>
              <QuestionMarkCircleIcon className="h-6 w-6 fill-yellow-500 text-yellow-800" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpcomingAcceptedSeshItems;
