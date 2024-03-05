export interface Sesh {
	_id?: string;
	game: string;
	proposedDay: string;
	proposedTime: string;
	recipients: Array<string>;
	sentFrom: string;
	_createdAt: number;
	usersConfirmed: Array<string>;
	usersDeclined: Array<string>;
	usersUnconfirmed: Array<string>;
	updatedAt?: string;
}
