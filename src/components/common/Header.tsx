import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { Container } from "./Container";
import { HeaderNavLinks } from "./NavLinks";
import { INTERNAL_ROUTES } from "../../constants/routes";

const navigateToLoginPage = (navigate: NavigateFunction) => {
	navigate(INTERNAL_ROUTES.LOGIN_PAGE);
};

function MobileNavLink({ href, children }: any) {
	return (
		<Popover.Button
			as={Link}
			to={href}
			className="block w-full rounded-lg p-2 hover:bg-neon-blue-300 hover:text-neon-blue-50 hover:ring-1 hover:ring-neon-blue-800"
		>
			{children}
		</Popover.Button>
	);
}

function MobileNavIcon({ open }: any) {
	return (
		<svg
			aria-hidden="true"
			className="h-3.5 w-3.5 overflow-visible stroke-neon-blue-700 "
			fill="none"
			strokeWidth={2}
			strokeLinecap="round"
		>
			<path
				d="M0 1H14M0 7H14M0 13H14"
				className={clsx(
					"origin-center transition",
					open && "scale-90 opacity-0"
				)}
			/>
			<path
				d="M2 2L12 12M12 2L2 12"
				className={clsx(
					"origin-center transition",
					!open && "scale-90 opacity-0"
				)}
			/>
		</svg>
	);
}

function MobileNavigation() {
	const navigate = useNavigate();
	return (
		<Popover>
			<Popover.Button
				className="relative z-10 flex h-8 w-8 items-center justify-center rounded-lg hover:ring-1 hover:ring-neon-blue-700   "
				aria-label="Toggle Navigation"
			>
				{({ open }) => <MobileNavIcon open={open} />}
			</Popover.Button>
			<Transition.Root>
				<Transition.Child
					as={Fragment}
					enter="duration-150 ease-out"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="duration-150 ease-in"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<Popover.Overlay className="fixed inset-0 bg-slate-300/50" />
				</Transition.Child>
				<Transition.Child
					as={Fragment}
					enter="duration-150 ease-out"
					enterFrom="opacity-0 scale-95"
					enterTo="opacity-100 scale-100"
					leave="duration-100 ease-in"
					leaveFrom="opacity-100 scale-100"
					leaveTo="opacity-0 scale-95"
				>
					<Popover.Panel
						as="div"
						className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-neon-blue-100 p-4 text-lg tracking-tight text-neon-blue-900 shadow-xl ring-1 ring-neon-blue-900/5"
					>
						<MobileNavLink href="#demo">Demo</MobileNavLink>
						<MobileNavLink href="#support">Support</MobileNavLink>
						<MobileNavLink href="#contact">Contact</MobileNavLink>
						<div className="m-1 flex flex-row justify-center py-1">
							<div className="-mr-1 flex lg:hidden">
								<button
									onClick={() => navigateToLoginPage(navigate)}
									type="button"
									className="inline-block rounded-md border border-transparent bg-neon-blue-700 py-1 px-2 text-base font-medium text-white hover:border-white hover:bg-neon-blue-900 hover:text-neon-blue-50"
								>
									Login / Register
								</button>
							</div>
						</div>
					</Popover.Panel>
				</Transition.Child>
			</Transition.Root>
		</Popover>
	);
}

function Header() {
	const navigate = useNavigate();
	return (
		<header className=" bg-neon-blue-50 py-4">
			<Container className="">
				<nav className="relative z-50 flex justify-between  ">
					<div className=" flex items-center  xs:mx-auto lg:mx-0  lg:gap-x-12">
						<Link to={INTERNAL_ROUTES.LANDING_PAGE} aria-label="Home">
							<img
								src={"/MicrosoftTeams-image-removebg-preview.png"}
								alt="ERR"
								className="w-[8.5rem] py-1 lg:w-32 "
							/>
						</Link>
					</div>
					<div className="hidden items-center lg:flex lg:gap-x-14 ">
						<HeaderNavLinks />
					</div>
					<div className="flex items-center gap-x-2 lg:gap-x-8">
						<div className="hidden items-center lg:flex lg:space-x-6 ">
							<button
								onClick={() => navigateToLoginPage(navigate)}
								type="button"
								className="inline-block rounded-md border border-transparent bg-neon-blue-700 py-2 px-4 text-base font-medium text-white hover:border-white hover:bg-neon-blue-800 hover:text-neon-blue-50"
							>
								Login / Register
							</button>
						</div>
						<div className="-mr-1 lg:hidden">
							<MobileNavigation />
						</div>
					</div>
				</nav>
			</Container>
		</header>
	);
}

export default Header;
