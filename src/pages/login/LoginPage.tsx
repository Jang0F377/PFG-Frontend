import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BACKEND_ROUTES, INTERNAL_ROUTES } from "../../constants/routes";

const LoginPage: FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const justRegistered = location.state?.justRegistered;
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [authenticated, setAuthenticated] = useState<boolean>(false);

	const loginFlow = async () => {
		let responseBody: any;
		// Validation Checks
		if (!email || !password) {
			setErrorMessage("Please do not leave any fields empty.");
			setError(true);
			return;
		}

		const body = JSON.stringify({
			email,
			password,
		});
		const response = await fetch(BACKEND_ROUTES.LOGIN_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body,
		});

		// Check response status and update ui accordingly
		if (!response.ok) {
			// If error parse the json error response
			responseBody = await response.json();
			console.log(responseBody);
			setErrorMessage(responseBody.message);
			setError(true);
			return;
		}
		// Else will be token of type string
		responseBody = await response.text();
		const sessionStorageToken = JSON.stringify({
			authenticated: true,
			email,
			token: responseBody,
		});
		sessionStorage.setItem("pfg-auth", sessionStorageToken);
		navigate(INTERNAL_ROUTES.DASHBOARD);
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

	useEffect(() => {
		const sessionStorageAuth = sessionStorage.getItem("pfg-auth");

		if (sessionStorageAuth) {
			const authenticationObject = JSON.parse(sessionStorageAuth);
			if (authenticationObject.authenticated) {
				setAuthenticated(true);
			}
		}
	}, []);

	useEffect(() => {
		if (authenticated) {
			navigate(INTERNAL_ROUTES.DASHBOARD);
		}
	}, [authenticated]);

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
						Sign in to your account
					</h2>
				</div>

				<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
					<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
						{justRegistered ? (
							<div>
								<p className="text-green-700 text-center text-sm">
									Registration Successful.
								</p>
								<p className="text-green-700 text-center text-sm">
									Please log in.
								</p>
							</div>
						) : (
							<div />
						)}
						<form className="space-y-6" action="#" method="POST">
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

							{error ? (
								<div>
									<p className="text-red-700 text-center">{errorMessage}</p>
								</div>
							) : (
								<div />
							)}

							<div>
								<button
									type="button"
									onClick={loginFlow}
									className="flex w-full justify-center rounded-md border border-transparent bg-neon-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-neon-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
								>
									Sign in
								</button>
							</div>
						</form>
						<p className="mt-10 text-center text-sm text-gray-700">
							Not a member?{" "}
							<a
								href={INTERNAL_ROUTES.REGISTRATION_PAGE}
								className="font-semibold leading-6 text-neon-blue-600 hover:text-neon-blue-500"
							>
								Register Here
							</a>
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default LoginPage;
