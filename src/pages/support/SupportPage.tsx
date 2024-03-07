import Support from "../../components/landing/Support";

const SupportPage = () => {
	// if (isLoading) {
	//   return <Loading />;
	// }

	// if (!isAuthenticated) {
	//   return <PageNotFound />;
	// }

	return (
		true && (
			<>
				<div className="bg-neon-blue-50 h-fit">
					<header className="border-y border-neon-blue-700 py-1 md:border-y-0 md:border-t">
						<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
							<h1 className="text-center text-4xl font-semibold text-neon-blue-900 md:text-left">
								Support Sesh
							</h1>
						</div>
					</header>
				</div>
				<Support />
			</>
		)
	);
};

export default SupportPage;
