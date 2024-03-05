import { FC, useEffect, useState } from "react";
import {
	EmptyState,
	InviteEmptyState,
} from "../../components/common/EmptyState";
import { GeneralNotification } from "../../components/common/Notifications";
import { User } from "../../types/user";
import { useLocation } from "react-router-dom";
import { BACKEND_ROUTES } from "../../constants/routes";
import LoadingPage from "../loading/LoadingPage";
import { ErrorPage } from "../error/Error";

const DashboardPage: FC = () => {
	const location = useLocation();
	const { token } = location.state;
	const [me, setMe] = useState<User | undefined>(undefined);
	const [isLoading, setIsLoading] = useState(true);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);
	const [showNotification, setShowNotification] = useState(false);
	const [incomingSeshInvites, setIncomingSeshInvites] = useState([]);
	const [upcomingSeshes, setUpcomingSeshes] = useState([]);

	const fetchMe = async () => {
		const response = await fetch(BACKEND_ROUTES.GET_ME_URL, {
			method: "GET",
			headers: { "Content-Type": "application/json", token: token },
		});

		if (!response.ok) {
			setIsLoading(false);
			setError(true);
		}

		const responseBody = await response.json();
		console.log(responseBody);
		setMe(responseBody);
		setIsLoading(false);
	};

	const showSuccessNotification = () => {
		setError(false);
		setSuccess(true);
		setShowNotification(true);
	};
	const showErrorNotification = () => {
		setSuccess(false);
		setError(true);
		setShowNotification(true);
	};
	const resetNotificationState = () => {
		setSuccess(false);
		setShowNotification(false);
		setError(false);
	};

	const fetchIncomingInvites = async () => {};
	useEffect(() => {
		fetchMe();
	}, []);

	if (isLoading) {
		return <LoadingPage />;
	}

	if (error) {
		return <ErrorPage />;
	}

	return (
		<>
			{
				<div id={"dashboard"} className="min-h-full">
					<div className="bg-neon-blue-50 pb-32">
						<header className="border-y border-neon-blue-700 py-1 md:border-y-0 md:border-t">
							<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
								<h1 className="text-center text-4xl font-semibold text-neon-blue-900 md:text-left">
									Dashboard
								</h1>
							</div>
						</header>
					</div>

					<main className="-mt-32 space-y-3 bg-neon-blue-50 pt-3 ">
						<section className="mx-1.5 px-4 pb-3 sm:px-6 md:mx-auto  md:max-w-2xl md:pb-6 lg:max-w-4xl lg:px-4 lg:px-8 xl:max-w-7xl xl:pb-8">
							{/* Replace with your content */}
							<div className="mx-auto  items-center justify-center rounded-lg bg-neon-blue-200 px-5 py-6 text-center  sm:px-6">
								<h1 className="-mt-5  text-left text-xl font-medium">
									Upcoming Seshes
								</h1>
								<div className=" flex max-h-fit min-h-[24rem] flex-row overflow-x-auto rounded-lg border-4 border-neon-blue-800/50 py-2 md:justify-center">
									{upcomingSeshes?.length ? (
										upcomingSeshes.map((sesh) => (
											// <UpcomingSeshItems
											// 	key={sesh?._key}
											// 	sesh={sesh}
											// 	myId={passUserId}
											// />
											<></>
										))
									) : (
										<EmptyState />
									)}
								</div>
							</div>
							{/* /End replace */}
						</section>

						<section className="mx-1.5 items-center justify-center rounded-lg bg-neon-blue-200 px-2 pb-6 sm:px-3 md:mx-auto md:max-w-2xl lg:max-w-4xl lg:px-4  xl:max-w-7xl">
							{/* Replace with your content */}
							<div className="mx-auto  items-center justify-center rounded-lg  px-5 py-3 text-center  sm:px-6">
								<h1 className="-mt-2  text-left text-xl font-medium">
									Pending Sesh invites
								</h1>
								<div className="flex max-h-fit min-h-[24rem] flex-row flex-nowrap overflow-x-auto rounded-lg border-4 border-neon-blue-800/50 py-2 md:justify-center">
									{incomingSeshInvites?.length ? (
										incomingSeshInvites.map((sesh, idx) => (
											// <IncomingSeshInviteItems
											// 	key={idx}
											// 	sesh={sesh}
											// 	myId={passUserId}
											// />
											<></>
										))
									) : (
										<InviteEmptyState />
									)}
								</div>
							</div>
							{/* /End replace */}
						</section>
						<section className="mx-1.5 rounded-lg bg-neon-blue-50 px-2 pb-6 sm:px-3 md:mx-auto md:max-w-2xl lg:max-w-4xl lg:px-4  xl:max-w-7xl">
							{/* <Friends /> */}
						</section>
					</main>
					{/*Notification insert here!!*/}
					<div
						aria-live="assertive"
						className="pointer-events-none fixed inset-0 z-50 flex items-end px-4 py-6 sm:items-start sm:p-6"
					>
						{success && showNotification && (
							<GeneralNotification
								success={success}
								outShow={showNotification}
							/>
						)}
						{error && showNotification && (
							<GeneralNotification
								success={!error}
								outShow={showNotification}
							/>
						)}
					</div>
					{/*MODAL*/}
				</div>
			}
		</>
	);
};

export default DashboardPage;
