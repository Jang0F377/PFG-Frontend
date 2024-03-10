import { FC, useEffect, useState } from "react";
import {
	BACKEND_ROUTES,
	INTERNAL_ROUTES,
	REASONS,
	ROUTES_STATE_MESSAGE,
} from "../../constants/routes";
import { useNavigate } from "react-router-dom";

const RegistrationPage: FC = () => {
	const navigate = useNavigate();
	const [game1, setGame1] = useState("");
	const [game2, setGame2] = useState("");
	const [game3, setGame3] = useState("");
	const [editing, setEditing] = useState(true);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const registrationFlow = async () => {
		// Validation Checks
		if (!email || !password || !confirmPassword) {
			setErrorMessage("Please do not leave any fields empty.");
			setError(true);
			return;
		}
		if (editing) {
			setErrorMessage("Please set your top 3 favorite games.");
			setError(true);
			return;
		}
		if (password !== confirmPassword) {
			setErrorMessage("Your passwords do not match. Please try again.");
			setError(true);
			return;
		}

		const body = JSON.stringify({
			email,
			password,
			favoriteGames: [game1, game2, game3],
		});
		const response = await fetch(BACKEND_ROUTES.REGISTER_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body,
		});
		const responseBody = await response.json();

		// Check response status and update ui accordingly
		if (!response.ok) {
			setErrorMessage(responseBody.message);
			setError(true);
			return;
		}

		navigate(INTERNAL_ROUTES.LOGIN_PAGE, {
			state: {
				reason: REASONS.REGISTRATION,
				message: ROUTES_STATE_MESSAGE.JUST_REGISTERED.message,
				extraMessage: ROUTES_STATE_MESSAGE.JUST_REGISTERED.extraMessage,
			},
		});
	};

	// Hook to timeout the error
	useEffect(() => {
		if (error) {
			setTimeout(() => {
				setError(false);
				setErrorMessage(null);
			}, 8000);
		}
		return () => {};
	}, [error]);

	return (
		<>
			<div className="bg-neon-blue-700 flex min-h-full flex-col justify-center py-6 sm:px-6 lg:px-8 overflow-hidden border border-t border-black">
				<div className="sm:mx-auto sm:w-full sm:max-w-md">
					<img
						className="w-30 mx-auto h-auto overflow-hidden rounded"
						src="/MicrosoftTeams-image-removebg-preview.png"
						alt="ERR"
					/>
					<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-blue-100">
						Create your account
					</h2>
				</div>
				<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md mx-4">
					<div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
						<form className="space-y-6">
							<div>
								<label className="block text-sm font-medium text-gray-700">
									Email
								</label>
								<div className="mt-1">
									<input
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										type="email"
										autoComplete="email"
										required
										className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
									/>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700">
									Password
								</label>
								<div className="mt-1">
									<input
										type="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										autoComplete="current-password"
										required
										className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
									/>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700">
									Confirm Password
								</label>
								<div className="mt-1">
									<input
										type="password"
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
										autoComplete="current-password"
										required
										className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
									/>
								</div>
							</div>
							{error ? (
								<div>
									<p className="text-red-700 text-center">{errorMessage}</p>
								</div>
							) : (
								<div />
							)}
							<div className="space-y-1 md:space-y-2">
								<div className="sm:col-span-3">
									<>
										<h3 className="ml-1 block text-center text-neon-blue-900">
											What's your top 3 favorite games?
										</h3>
										<div className="flex items-center justify-evenly space-x-1 ">
											{!editing ? (
												<>
													<div className="flex flex-col">
														<div className="flex flex-col mx-auto p-1 space-y-0.5 md:space-y-1.5">
															<ol className="list-decimal">
																<li className="list-item">{game1}</li>
																<li className="list-item">{game2}</li>
																<li className="list-item">{game3}</li>
															</ol>
														</div>
													</div>
												</>
											) : (
												<>
													<div className="flex flex-col">
														<div className="flex flex-col mx-auto p-1 space-y-0.5 md:space-y-1.5">
															<input
																type={"text"}
																value={game1}
																autoComplete="text"
																onChange={(e) => setGame1(e.target.value)}
																className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
															/>
															<input
																type={"text"}
																autoComplete="text"
																value={game2}
																onChange={(e) => setGame2(e.target.value)}
																className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
															/>
															<input
																type={"text"}
																value={game3}
																autoComplete="text"
																onChange={(e) => setGame3(e.target.value)}
																className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
															/>
														</div>
													</div>
												</>
											)}

											<div onClick={() => setEditing(!editing)}>
												<button
													type={"button"}
													disabled={!game1 || !game2 || !game3}
													onClick={() => {
														setEditing(!editing);
													}}
													className="my-0.5 inline-block rounded-lg bg-neon-blue-600 px-4 py-1.5 md:py-2.5 font-medium text-neon-blue-50 hover:bg-neon-blue-800 disabled:bg-gray-400"
												>
													{editing ? "Set" : "Update"}
												</button>
											</div>
										</div>
									</>
								</div>
								<button
									type="button"
									onClick={registrationFlow}
									className="flex w-full justify-center rounded-md border border-transparent bg-neon-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-neon-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
								>
									Register
								</button>
							</div>
						</form>
						<p className="mt-5 text-center text-sm text-gray-700">
							Already have an account?{" "}
							<a
								href={INTERNAL_ROUTES.LOGIN_PAGE}
								className="font-semibold leading-6 text-neon-blue-600 hover:text-neon-blue-500"
							>
								Login Here
							</a>
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default RegistrationPage;
