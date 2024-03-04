import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { INTERNAL_ROUTES } from "./constants/routes";
import MainLayout from "./layouts/MainLayout";
import { ErrorPage } from "./pages/error/Error";
import LandingPage from "./pages/landing/LandingPage";
import LoginPage from "./pages/login/LoginPage";
import RegistrationPage from "./pages/registration/RegistrationPage";

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
		</Routes>
	</BrowserRouter>
);

export default IndexRoutes;
