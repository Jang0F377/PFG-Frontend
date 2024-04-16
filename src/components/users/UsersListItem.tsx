import { useState } from 'react';
import { User } from '../../types/user';
import { SendFriendRequestModal, SeshSendInviteModal } from '../common/Modals';
import MyDivider from '../common/MyDivider';
import CustomAvatar from '../common/Avatar';

interface UserListProps {
  user: User;
  authToken?: string;
  userEmail?: string;
}

const UserListItem = ({ user, authToken, userEmail }: UserListProps) => {
  const [showSeshModal, setShowSeshModal] = useState(false);
  const [showFriendReqModal, setShowFriendReqModal] = useState(false);

  const handleShowFriendReqModal = () => {
    setShowFriendReqModal(true);
  };
  const handleCloseFriendReqModal = () => {
    setShowFriendReqModal(false);
  };

  const handleShowSeshModal = () => {
    setShowSeshModal(true);
  };
  const handleCloseSeshModal = () => {
    setShowSeshModal(false);
  };
  const gamesPlayed = user?.favoriteGames?.slice(0, 3);

  return (
    <div className="m-3 mx-auto w-[18rem] justify-center rounded-lg bg-neon-blue-300 shadow md:mx-0">
      <div className="px-3 py-4 sm:px-5">
        <header className="mx-auto flex flex-col  space-y-1 text-center">
          <CustomAvatar email={user?.email} size={'md'} />
          <h1 className="text-neon-blue-900 ">{user?.email}</h1>
          {user?.email === userEmail ? (
            <>
              <p className="text-xs text-red-600">ME</p>
            </>
          ) : (
            <div />
          )}
        </header>
      </div>
      <MyDivider text={'Info'} />

      <div className="px-2 py-2.5 sm:p-3">
        <label className="ml-1 block text-left text-sm font-medium text-neon-blue-900">
          My Top 3:
        </label>
        {gamesPlayed?.length ? (
          <ul className="text-center">
            {gamesPlayed.map((game, idx) => (
              <li key={`${game}-${idx}`} className="text-sm text-neon-blue-900">
                {game}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center">
            <p className="text-sm text-neon-blue-900">
              I need to add this still!
            </p>
          </div>
        )}
      </div>
      <MyDivider text={'Send me'} />
      <div className="flex justify-evenly py-3">
        <button
          className="rounded-lg bg-neon-blue-700 px-1.5 py-2.5 text-xs font-medium text-neon-blue-50 disabled:bg-gray-400/75 lg:text-sm"
          type={'button'}
          disabled={userEmail === user?.email}
          onClick={handleShowFriendReqModal}
        >
          A friend request
        </button>
        <button
          className="rounded-lg bg-neon-blue-700 px-1.5 py-2.5 text-xs font-medium text-neon-blue-50 disabled:bg-gray-400/75 lg:text-sm"
          type={'button'}
          onClick={handleShowSeshModal}
          disabled={userEmail === user?.email}
        >
          A Sesh invite
        </button>
      </div>
      <SeshSendInviteModal
        open={showSeshModal}
        handleClose={handleCloseSeshModal}
        specificRecipient={user?.email}
        authToken={authToken}
        userEmail={userEmail}
      />
      <SendFriendRequestModal
        open={showFriendReqModal}
        handleClose={handleCloseFriendReqModal}
        specificRecipient={user?.email}
        authToken={authToken}
        userEmail={userEmail}
      />
    </div>
  );
};

export default UserListItem;
