import { Link } from "react-router-dom";
import { Container } from "./Container";
import { FooterDashboardNavLinks, FooterNavLinks } from "./NavLinks";
import { INTERNAL_ROUTES } from "../../constants/routes";

export const ProductPageFooter = () => {
	return (
		<footer className="bg-neon-blue-600">
			<Container className="">
				<div className="rounded-xl  py-16">
					<img
						src={"/MicrosoftTeams-image-removebg-preview.png"}
						alt="ERR"
						className=" mx-auto h-20 w-auto   rounded-full object-cover p-2 "
					/>
					<nav className="mt-10 text-sm" aria-label="quick links">
						<div className="-my-1 flex flex-col justify-center text-center sm:flex-row sm:gap-x-7">
							<FooterNavLinks />
						</div>
					</nav>
				</div>
				<div className="flex flex-col items-center border-t border-slate-100/10 py-10 sm:flex-row-reverse sm:justify-between">
					<p className="mt-6 text-sm text-blue-50 sm:mt-0">
						Copyright &copy; {new Date().getFullYear()} PreFireGaming. All
						rights reserved.
					</p>
				</div>
			</Container>
		</footer>
	);
};

export const DashboardPageFooter = () => {
	return (
		<footer className="bg-neon-blue-600 ">
			<Container className="">
				<div className="rounded-xl  py-16">
					<img
						src={"/MicrosoftTeams-image-removebg-preview.png"}
						alt="ERR"
						className=" mx-auto h-20 w-auto   rounded-full object-cover p-2 "
					/>
					<nav className="mt-10 text-sm" aria-label="quick links">
						<div className="-my-1 flex flex-col justify-center text-center sm:flex-row sm:gap-x-7">
							<FooterDashboardNavLinks />
						</div>
					</nav>
				</div>
				<div className="flex flex-col items-center border-t border-slate-100/10 py-10 sm:flex-row-reverse sm:justify-between">
					<p className="mt-6 text-sm text-blue-50 sm:mt-0">
						Copyright &copy; {new Date().getFullYear()} PreFireGaming. All
						rights reserved.
					</p>
				</div>
			</Container>
		</footer>
	);
};

export const PageNotFoundFooter = () => {
	return (
		<footer className="bg-neon-blue-600">
			<Container className="">
				<div className="rounded-xl  py-16">
					<Link to={INTERNAL_ROUTES.LANDING_PAGE}>
						<img
							src={"/MicrosoftTeams-image-removebg-preview.png"}
							alt="ERR"
							className=" mx-auto h-20 w-auto   rounded-full object-cover p-2 "
						/>
					</Link>
				</div>
				<div className="flex flex-col items-center border-t border-slate-100/10 py-10 sm:flex-row-reverse sm:justify-between">
					<p className="mt-6 text-sm text-blue-50 sm:mt-0">
						Copyright &copy; {new Date().getFullYear()} PreFireGaming. All
						rights reserved.
					</p>
				</div>
			</Container>
		</footer>
	);
};
