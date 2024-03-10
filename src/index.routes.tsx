import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { INTERNAL_ROUTES } from "./constants/routes";
import MainLayout from "./layouts/MainLayout";
import { ErrorPage } from "./pages/error/Error";
import LandingPage from "./pages/landing/LandingPage";
import LoginPage from "./pages/login/LoginPage";
import RegistrationPage from "./pages/registration/RegistrationPage";
import AuthenticatedLayout from "./layouts/AuthenticatedLayout";
import DashboardPage from "./pages/dashboard/Dashboard";
import SupportPage from "./pages/support/SupportPage";
import UsersPage from "./pages/users/UsersPage";
import AccountPage from "./pages/account/AccountPage";

const IndexRoutes: FC = () => (
	<BrowserRouter>
		<Routes>
			<Route element={<MainLayout />}>
				<Route path={INTERNAL_ROUTES.LANDING_PAGE} element={<LandingPage />} />
				<Route path={INTERNAL_ROUTES.LOGIN_PAGE} element={<LoginPage />} />
				<Route
					path={INTERNAL_ROUTES.REGISTRATION_PAGE}
					element={<RegistrationPage />}
				/>
				<Route path="*" element={<ErrorPage />} />
			</Route>

			<Route element={<AuthenticatedLayout />}>
				<Route path={INTERNAL_ROUTES.DASHBOARD} element={<DashboardPage />} />
				<Route
					path={INTERNAL_ROUTES.GLOBAL_USERS_PAGE}
					element={<UsersPage />}
				/>
				<Route path={INTERNAL_ROUTES.SUPPORT_PAGE} element={<SupportPage />} />
				<Route path={INTERNAL_ROUTES.ACCOUNT_PAGE} element={<AccountPage />} />
			</Route>
		</Routes>
	</BrowserRouter>
);

export default IndexRoutes;
