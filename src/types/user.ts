import { Sesh } from './sesh';

export interface User {
  id?: string;
  email: string;
  username?: string;
  image?: string;
  sesh_history: Array<Sesh | string>;
  upcoming_created_seshes: Array<Sesh | string>;
  upcoming_accepted_seshes: Array<Sesh | string>;
  upcoming_declined_seshes: Array<Sesh | string>;
  sesh_invites: Array<Sesh | string>;
  supporter: boolean;
  role: ROLES;
  favorite_games: Array<string>;
}

export enum ROLES {
  USER = 'user',
  ADMIN = 'admin',
  SUPER_ADMIN = 'superAdmin',
}
