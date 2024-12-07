import { FC, useState } from 'react';
import { User } from '../../types/user';
import LoadingPage from '../loading/LoadingPage';
import { ErrorPage } from '../error/Error';
import { BACKEND_ROUTES } from '../../constants/routes';
import useAsyncEffect from 'use-async-effect';
import CustomAvatar from '../../components/common/Avatar';

const AccountPage: FC = () => {
  const authObject = sessionStorage.getItem('pfg-auth');
  const token = authObject ? JSON.parse(authObject).token : undefined;
  const [game1, setGame1] = useState('');
  const [game2, setGame2] = useState('');
  const [game3, setGame3] = useState('');
  const [editing, setEditing] = useState(false);
  const [me, setMe] = useState<User>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );

  const updateMe = async (): Promise<void> => {
    if (!game1 || !game2 || !game3) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    const body = JSON.stringify({
      favorite_games: [game1, game2, game3],
    });

    const response = await fetch(`${BACKEND_ROUTES.USER_BASE_URL}/${me?.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body,
    });

    const responseBody = await response.json();

    if (!response.ok) {
      setErrorMessage(responseBody?.message);
      setError(true);
    }

    window.location.reload();
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
    setMe(userObject);
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage message={errorMessage} />;
  }

  return (
    <>
      <div className="bg-neon-blue-50">
        <header className="border-y border-neon-blue-700 py-1 md:border-y-0 md:border-t">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-center text-4xl font-semibold text-neon-blue-900 md:text-left">
              Account
            </h1>
          </div>
        </header>
      </div>
      <div className="flex-1 xl:overflow-y-auto">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
          <h1 className="text-3xl font-bold tracking-tight text-neon-blue-900">
            Profile
          </h1>
          <form className="divide-y-neon-blue-300 mt-6 space-y-8 divide-y">
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium text-neon-blue-900">
                  Email
                </label>
                <div className="mt-1 flex rounded-md ">
                  <h6 className=" block w-full  text-neon-blue-900  sm:text-sm">
                    {me?.email}
                  </h6>
                </div>
              </div>
              {/* <div className="sm:col-span-3">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-neon-blue-900"
                >
                  Username
                </label>
                <div className="mt-1 flex rounded-md ">
                  <h6 className=" block w-full  text-neon-blue-900  sm:text-sm">
                    {me?.email.split('@')[0]}
                  </h6>
                </div>
              </div> */}
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium text-neon-blue-900">
                  Username
                </label>
                <div className="mt-1 flex rounded-md ">
                  <h6 className=" block w-full  text-neon-blue-900  sm:text-sm">
                    {me?.username !== 'None' ? me?.username : 'No username set'}
                  </h6>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium text-neon-blue-900"
                >
                  Photo
                </label>
                <div className="mt-1 flex items-center justify-between">
                  <CustomAvatar email={me?.email} size="md" />
                  {/*<div className="ml-4 flex">*/}
                  {/*  <div*/}
                  {/*    onClick={() => alert("Functionality in progress")}*/}
                  {/*    className="border-blue-gray-300 focus-within:ring-offset-blue-gray-50 hover:bg-blue-gray-50 relative flex cursor-pointer items-center rounded-md border bg-white py-2 px-3 shadow-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"*/}
                  {/*  >*/}
                  {/*    <label*/}
                  {/*      htmlFor="user-photo"*/}
                  {/*      className="pointer-events-none relative text-sm font-medium text-neon-blue-900"*/}
                  {/*    >*/}
                  {/*      <span>Change</span>*/}
                  {/*      <span className="sr-only"> user photo</span>*/}
                  {/*    </label>*/}
                  {/*    <input*/}
                  {/*      id="user-photo"*/}
                  {/*      name="user-photo"*/}
                  {/*      type="file"*/}
                  {/*      className="absolute inset-0 h-full w-full cursor-pointer rounded-md border-neon-blue-tone-300 opacity-0"*/}
                  {/*    />*/}
                  {/*  </div>*/}
                  {/*</div>*/}
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-neon-blue-900">
                    Top 3
                  </label>
                  <div className="flex flex-col justify-between">
                    {!editing ? (
                      <>
                        <div className="flex flex-col text-sm">
                          <div className="flex flex-col space-y-0.5 p-1 md:space-y-1.5 md:pl-4">
                            <ol className="list-decimal ">
                              {me?.favorite_games.map(
                                (name: string, idx: number) => (
                                  <li className="list-item" key={idx}>
                                    {name}
                                  </li>
                                ),
                              )}
                            </ol>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex flex-col">
                          <div className="flex flex-col space-y-0.5 p-1 pl-2 md:space-y-1.5">
                            <input
                              type={'text'}
                              value={game1}
                              placeholder={me?.favorite_games[0]}
                              autoComplete="text"
                              onChange={(e) => setGame1(e.target.value)}
                              className="block w-full appearance-none rounded-md border border-gray-300 px-2 py-1.5 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            />
                            <input
                              type={'text'}
                              autoComplete="text"
                              placeholder={me?.favorite_games[1]}
                              value={game2}
                              onChange={(e) => setGame2(e.target.value)}
                              className="block w-full appearance-none rounded-md border border-gray-300 px-2 py-1.5 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            />
                            <input
                              type={'text'}
                              value={game3}
                              placeholder={me?.favorite_games[2]}
                              autoComplete="text"
                              onChange={(e) => setGame3(e.target.value)}
                              className="block w-full appearance-none rounded-md border border-gray-300 px-2 py-1.5 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div onClick={() => setEditing(!editing)}>
                    <button
                      type={'button'}
                      onClick={() => {
                        setEditing(!editing);
                      }}
                      className="my-0.5 inline-block rounded-lg bg-neon-blue-600 px-4 py-1.5 font-medium text-neon-blue-50 hover:bg-neon-blue-800 disabled:bg-gray-400 md:py-2.5"
                    >
                      {editing ? 'Set' : 'Update'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-y-6 pt-8 sm:grid-cols-6 sm:gap-x-6">
              <div className="sm:col-span-6">
                <h2 className="text-xl font-medium text-neon-blue-900">
                  Personal Information
                </h2>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="phone-number"
                  className="block text-sm font-medium"
                >
                  Phone number
                </label>
                <input
                  type="text"
                  name="phone-number"
                  id="phone-number"
                  autoComplete="tel"
                  className="mt-1 block w-full rounded-md border-neon-blue-900 p-1 text-neon-blue-900 shadow-sm focus:ring-neon-blue-300  sm:text-sm"
                />
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="text-blue-gray-900 block text-sm font-medium"
                >
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="mt-1 block  w-full rounded-md border-neon-blue-900 p-1.5 text-neon-blue-900 shadow-sm focus:ring-neon-blue-300  sm:text-sm"
                >
                  <option />
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-8">
              <button
                type="button"
                onClick={() => {}}
                className="text-blue-gray-900 hover:bg-blue-gray-50 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={updateMe}
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AccountPage;
