import React from "react";
import {
	FriendListEmptyState,
	FriendInviteEmptyState,
} from "../common/EmptyState";
import { NavigateFunction } from "react-router-dom";

interface FriendsProps {
	navigate: NavigateFunction;
}

const Friends: React.FC<FriendsProps> = ({ navigate }) => {
	return (
		<div id="friends">
			<main className="bg-neon-blue-50 pt-3  ">
				<section className="flex mx-1.5 px-4 pb-3 sm:px-6 md:mx-auto  md:max-w-2xl md:pb-6 ">
					<div className="mx-auto  items-center justify-center rounded-lg bg-neon-blue-200 px-5 py-6 text-center  sm:px-6">
						<h1 className="-mt-5  text-left text-xl font-medium">
							Friends list
						</h1>
						<div className="flex h-96 px-2 md:px-4 items-center rounded-lg border-4 border-neon-blue-800/50">
							<FriendListEmptyState navigate={navigate} />
						</div>
					</div>
				</section>
				<section className="flex mx-1.5 px-4 pb-3 sm:px-6 md:mx-auto  md:max-w-2xl md:pb-6 ">
					<div className="mx-auto  items-center justify-center rounded-lg bg-neon-blue-200 px-5 py-3 text-center  sm:px-6">
						<h1 className="-mt-2  text-left text-xl font-medium">
							Pending friend requests
						</h1>
						<div className="flex h-96 items-center rounded-lg border-4 border-neon-blue-800/50">
							<FriendInviteEmptyState />
						</div>
					</div>
				</section>
			</main>
		</div>
	);
};

export default Friends;
