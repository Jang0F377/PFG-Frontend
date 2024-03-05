import { Sesh } from "./sesh";

export interface User {
	_id?: string;
	email: string;
	firstName?: string;
	lastName?: string;
	image?: string;
	recentSeshes: Array<Sesh | string>;
	upcomingUndecidedSeshes: Array<Sesh | string>;
	upcomingAcceptedSeshes: Array<Sesh | string>;
	upcomingDeclinedSeshes: Array<Sesh | string>;
	supporter: boolean;
	role: ROLES;
	favoriteGames: Array<string>;
}

export enum ROLES {
	USER = "user",
	ADMIN = "admin",
	SUPER_ADMIN = "superAdmin",
}
