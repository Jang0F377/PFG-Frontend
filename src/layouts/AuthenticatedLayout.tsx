import { FC } from "react";
import { Outlet } from "react-router-dom";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import { DashboardPageFooter } from "../components/common/Footer";

const AuthenticatedLayout: FC = () => (
	<div className="scroll-smooth antialiased bg-gray-300" lang="en">
		<main className="mx-0.5 flex min-h-screen flex-col ">
			<DashboardHeader />
			<Outlet />
			<DashboardPageFooter />
		</main>
	</div>
);

export default AuthenticatedLayout;
