import { User } from './user';

export interface Sesh {
  id?: string;
  game: string;
  proposed_date: string;
  proposed_time: string;
  recipients: Array<string>;
  sesh_created_by: string;
  created_at: string;
  updated_at?: string;
  num_recipients?: number;
  num_accepted?: number;
  num_declined?: number;
  sesh_id?: string;
  answer?: 'accepted' | 'declined';
  sender?: User;
}
