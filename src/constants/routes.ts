export const INTERNAL_ROUTES = {
	LANDING_PAGE: "/",
	DASHBOARD: "/dashboard",
	SUPPORT_PAGE: "/support",
	ACCOUNT_PAGE: "/account",
	GLOBAL_USERS_PAGE: "/users",
	SPECIFIC_USER_PAGE: "/users/:id",
	LOGIN_PAGE: "/login",
	REGISTRATION_PAGE: "/register",
};

export const BACKEND_ROUTES = {
	LOGIN_URL: "http://localhost:3000/users/login",
	REGISTER_URL: "http://localhost:3000/users/register",
	GET_ALL_USERS_URL: "http://localhost:3000/users/all",
	GET_ME_URL: "http://localhost:3000/users/me",
	VALIDATE_RECIPIENTS: "http://localhost:3000/users/validate-recipient",
	CREATE_SESH_URL: "http://localhost:3000/sesh/create",
};
