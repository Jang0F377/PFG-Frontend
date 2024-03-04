import { FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";

const MainLayout: FC = () => (
	<div className="scroll-smooth antialiased bg-gray-300" lang="en">
		<main className="mx-0.5 flex h-screen flex-col ">
			<Header />
			<Outlet />
		</main>
	</div>
);

export default MainLayout;
