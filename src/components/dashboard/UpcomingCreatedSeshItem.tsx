import { AtSymbolIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { Sesh } from '../../types/sesh';
import MyDivider from '../common/MyDivider';
import useAsyncEffect from 'use-async-effect';
import LoadingPage from '../../pages/loading/LoadingPage';
import { User } from '../../types/user';
import CustomAvatar from '../common/Avatar';
import { convertMilitaryToStandard } from '../../utils/timeUtils';

interface UpcomingCreatedSeshItemProps {
  sesh: Sesh;
  userObject: User;
}

const UpcomingCreatedSeshItem = ({
  sesh,
  userObject,
}: UpcomingCreatedSeshItemProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [seshInfo, setSeshInfo] = useState<Sesh | undefined>(undefined);

  if (isLoading) {
    return <LoadingPage />;
  }

  useAsyncEffect(async (isMounted) => {
    if (!isMounted()) return;
    setSeshInfo(sesh);
    setIsLoading(false);
  }, []);

  return (
    <>
      {!isLoading && (
        <div className="my-1 flex  flex-col rounded-lg bg-neon-blue-50 p-1  ">
          <header className="py-1">
            <h1 className="text-center text-3xl font-medium text-neon-blue-900">
              Sesh Invite
            </h1>
            <MyDivider text={'From'} />
          </header>
          <div className="mx-auto mt-1  flex flex-col space-y-1">
            <CustomAvatar email={userObject.email} size={'md'} />
            <p className="text-sm font-medium text-neon-blue-900">
              {userObject.email ? userObject.email.split('@')[0] : 'Loading'}
            </p>
          </div>
          <div className="my-1 ">
            <h3 className="text-center text-xs  text-neon-blue-900 md:text-sm ">
              We&apos;re playing some:
            </h3>
            <h2 className="text-center text-sm font-medium text-neon-blue-900 md:text-base">
              {seshInfo?.game}
            </h2>
            <MyDivider text={'When'} />
          </div>
          <div className="z-20 mx-auto flex flex-col text-center">
            <div className="mx-auto flex flex-col items-center justify-center space-x-0 space-y-2 md:flex-row md:space-x-3 md:space-y-0">
              <h1 className="flex text-lg  font-medium text-neon-blue-900">
                {seshInfo?.proposed_date}
              </h1>
              <AtSymbolIcon className="flex w-6  fill-neon-blue-600 " />
              <h2 className=" text-lg font-medium tracking-wide text-neon-blue-900">
                {convertMilitaryToStandard(seshInfo?.proposed_time)}
              </h2>
            </div>
          </div>
          <div className="my-0.5">
            <MyDivider text={'Confirmed'} />
          </div>
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
      )}
    </>
  );
};

export default UpcomingCreatedSeshItem;
