import { useEffect, useState } from "react";
import { Container } from "../../components/common/Container";
import UserList from "../../components/users/UsersList";
import { User } from "../../types/user";
import { BACKEND_ROUTES } from "../../constants/routes";
import { ErrorPage } from "../error/Error";
import LoadingPage from "../loading/LoadingPage";

const UsersPage = () => {
	const [globalUsers, setGlobalUsers] = useState<User[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);

	const fetchUsers = async () => {
		const response = await fetch(BACKEND_ROUTES.GET_ALL_USERS_URL, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		});

		if (!response.ok) {
			setError(true);
		}
		console.log(response);

		const responseBody = await response.json();
		console.log(responseBody);

		setGlobalUsers(responseBody);
		setIsLoading(false);
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	if (isLoading) {
		return <LoadingPage />;
	}

	if (error) {
		return <ErrorPage />;
	}

	return (
		true && (
			<>
				<div className="bg-neon-blue-50 h-full">
					<header className="border-y border-neon-blue-700 py-1 md:border-y-0 md:border-t">
						<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
							<h1 className="text-center text-4xl font-semibold text-neon-blue-900 md:text-left">
								Users
							</h1>
						</div>
					</header>
					<Container className=" pt-3 h-fit">
						<section className=" flex flex-col justify-evenly md:flex-row md:flex-wrap ">
							{globalUsers?.map((user) => (
								<UserList key={user.email} user={user} />
							))}
						</section>
					</Container>
				</div>
			</>
		)
	);
};

export default UsersPage;
