import React from 'react';
import {
  FriendListEmptyState,
  FriendInviteEmptyState,
} from '../common/EmptyState';
import { NavigateFunction } from 'react-router-dom';

interface FriendsProps {
  navigate: NavigateFunction;
}

const Friends: React.FC<FriendsProps> = ({ navigate }) => {
  return (
    <div id="friends">
      <main className="space-y-3 bg-neon-blue-50">
        <section className="mx-auto max-w-7xl">
          <div className="mx-auto  items-center  justify-center rounded-lg bg-neon-blue-200 px-5 py-6 text-center sm:px-6 ">
            <h1 className="-mt-2  text-left text-xl font-medium">Friends</h1>
            <div className="mx-auto flex flex-row flex-wrap items-center justify-center space-x-2 space-y-1.5 rounded-lg border-4  border-neon-blue-800/50 px-2  py-3 md:space-y-1   md:py-4 lg:space-x-4 ">
              <FriendListEmptyState navigate={navigate} />
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-7xl">
          <div className="mx-auto  items-center  justify-center rounded-lg bg-neon-blue-200 px-5 py-6 text-center sm:px-6 ">
            <h1 className="-mt-2  text-left text-xl font-medium">
              Pending friend requests
            </h1>
            <div className="mx-auto flex flex-row flex-wrap items-center justify-center space-x-2 space-y-1.5 rounded-lg border-4  border-neon-blue-800/50 px-2  py-3 md:space-y-1   md:py-4 lg:space-x-4 ">
              <FriendInviteEmptyState />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Friends;
