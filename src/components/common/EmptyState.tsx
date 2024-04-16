import {
  CalendarDaysIcon,
  EnvelopeOpenIcon,
} from '@heroicons/react/24/outline';
import { NavigateFunction } from 'react-router-dom';
import { INTERNAL_ROUTES } from '../../constants/routes';

interface EmptyStateProps {
  handleShow: () => void;
}

export function EmptyState({ handleShow }: EmptyStateProps) {
  return (
    <div
      onClick={() => handleShow()}
      className="m-4 rounded-xl border border-neon-blue-800/70 bg-neon-blue-50  p-2 transition duration-200 ease-in-out hover:translate-y-1 hover:scale-105 md:m-10 md:p-5 lg:hover:scale-110 "
    >
      <h2 className="px-0.5 text-lg font-medium text-neon-blue-800 lg:px-1">
        Create your first Sesh!
      </h2>
      <p className="mt-1 px-0.5 text-sm text-neon-blue-tone-200 lg:px-1">
        Send a Sesh invite to someone by email.
      </p>
      <p className="mt-1 px-0.5 text-sm text-neon-blue-tone-200 lg:px-1">
        Then upcoming Seshes will show up here!
      </p>
      <div className="mx-auto mt-6 flex justify-center">
        <div className="mx-auto justify-center text-center">
          <CalendarDaysIcon className="mx-auto h-12 w-12 text-neon-blue-700" />
          <h2 className="mt-2 text-lg font-medium text-neon-blue-800">
            Set Sesh
          </h2>
        </div>
      </div>
    </div>
  );
}

export function InviteEmptyState() {
  return (
    <div className="m-4 rounded-xl border border-neon-blue-800/70 bg-neon-blue-50  p-2 transition duration-200 ease-in-out hover:translate-y-1 hover:scale-105 md:m-10 md:p-5 lg:hover:scale-110 ">
      <EnvelopeOpenIcon className="mx-auto h-14 w-14 text-neon-blue-700" />
      <h3 className="mt-2 text-sm font-medium text-neon-blue-800">
        No invites
      </h3>
      <p className="mt-1 text-sm text-neon-blue-tone-200">
        Sesh invites you receive will show up here!
      </p>
    </div>
  );
}

interface FriendsListEmptyStateProps {
  navigate: NavigateFunction;
}

export function FriendListEmptyState({ navigate }: FriendsListEmptyStateProps) {
  return (
    <div
      className="mx-4 rounded-xl  border border-neon-blue-800/70 bg-neon-blue-50 py-2 transition duration-200 ease-in-out hover:translate-y-1 hover:scale-105 md:mx-8 md:max-w-sm lg:hover:scale-110"
      onClick={() => navigate(INTERNAL_ROUTES.GLOBAL_USERS_PAGE)}
    >
      <h2 className="px-0.5 text-lg font-medium text-neon-blue-800 lg:px-1">
        Add your first friend!
      </h2>
      <p className="mt-1 px-0.5 text-sm text-neon-blue-tone-200 lg:px-1">
        Send a friend an email and invite them to sign up and be your friend.
      </p>
      <p className="mt-1 px-0.5 text-xs text-neon-blue-tone-200 lg:px-1 lg:pt-1">
        Then they can start confirming or declining Seshes.
      </p>
      <div className="mx-auto mt-2 flex justify-center">
        <div className="mx-auto justify-center text-center">
          <svg
            className="mx-auto h-12 w-12 text-neon-blue-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A10.003 10.003 0 0124 26c4.21 0 7.813 2.602 9.288 6.286M30 14a6 6 0 11-12 0 6 6 0 0112 0zm12 6a4 4 0 11-8 0 4 4 0 018 0zm-28 0a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <h2 className="mt-2 text-lg font-medium text-neon-blue-800">
            Add friends
          </h2>
        </div>
      </div>
    </div>
  );
}

export function FriendInviteEmptyState() {
  return (
    <div className=" mx-4 max-w-[16rem] rounded-xl border border-neon-blue-800/70 bg-neon-blue-50 p-3 transition duration-200 ease-in-out hover:translate-y-1 hover:scale-105 md:mx-8 lg:hover:scale-110 ">
      <EnvelopeOpenIcon className="mx-auto h-14 w-14 text-neon-blue-700" />
      <h3 className="mt-2 text-sm font-medium text-neon-blue-800">
        No invites yet
      </h3>
      <p className="mt-1 text-sm text-neon-blue-tone-200">
        Friend invites you receive will show up here!
      </p>
    </div>
  );
}
