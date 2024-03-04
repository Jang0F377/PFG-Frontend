import { FC } from "react";
import { Link } from "react-router-dom";

interface ErrorPageProps {
	code?: string;
	message?: string;
	extraMessage?: string;
}

const DEFAULT_ERROR = {
	code: "404",
	message: "Page not found",
	extraMessage: "Please check your spelling and try again!",
};

export const ErrorPage: FC<ErrorPageProps> = ({
	code = DEFAULT_ERROR.code,
	message = DEFAULT_ERROR.message,
	extraMessage = DEFAULT_ERROR.extraMessage,
}) => (
	<div className="flex h-full w-full flex-col bg-blue-100">
		<div className="flex flex-grow flex-col bg-blue-100 lg:mt-20 lg:pt-6">
			<main className="flex flex-grow flex-col items-center  bg-blue-100">
				<div className="mx-auto flex w-full max-w-7xl flex-grow flex-col px-4 sm:px-6 lg:px-8">
					<div className=" flex-shrink-0 justify-center pb-16 text-center sm:pb-32">
						<h1 className="mt-2 text-4xl font-bold tracking-tight text-blue-900 sm:text-5xl">
							{code}
						</h1>
						<p className="mt-2 text-base text-blue-800">{message}</p>
						<p className="text-base text-blue-800">{extraMessage}</p>
						<Link className="hover:underline" to={"/"}>
							Go back home
						</Link>
					</div>
				</div>
			</main>
		</div>
	</div>
);
