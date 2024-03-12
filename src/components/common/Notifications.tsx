import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

interface GeneralNotificationsProps {
	success: boolean;
	outShow: boolean;
}

export const GeneralNotification = ({
	success,
	outShow,
}: GeneralNotificationsProps) => {
	return (
		<>
			<div className="z-50 flex w-full flex-col items-center space-y-4 sm:items-end">
				{/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
				<Transition
					show={outShow}
					as={Fragment}
					enter="transform ease-out duration-300 transition"
					enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
					enterTo="translate-y-0 opacity-100 sm:translate-x-0"
					leave="transition ease-in duration-100"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="pointer-events-auto  w-full max-w-sm overflow-hidden rounded-lg bg-neon-blue-tone-200 shadow-lg ring-1 ring-black ring-opacity-5">
						<div className=" p-4">
							<div className="flex items-start">
								{success ? (
									<div className="flex-shrink-0 items-center">
										<CheckCircleIcon
											className="h-7 w-7 text-green-400"
											aria-hidden="true"
										/>
									</div>
								) : (
									<div className="flex-shrink-0 items-center">
										<XCircleIcon
											className="h-7 w-7 text-red-400"
											aria-hidden="true"
										/>
									</div>
								)}
								{success ? (
									<div className="ml-3 w-0 flex-1 pt-0.5">
										<p className="text-sm font-medium text-white">
											Successfully Sent!
										</p>
										<p className="mt-1 text-sm text-neon-blue-100">
											You can view the status in the dashboard.
										</p>
									</div>
								) : (
									<div className="ml-3 w-0 flex-1 pt-0.5">
										<p className="text-sm font-medium text-white">
											Error invite NOT sent!
										</p>
										<p className="mt-1 text-sm text-neon-blue-100">
											Please retry the action!
										</p>
									</div>
								)}
							</div>
						</div>
					</div>
				</Transition>
			</div>
		</>
	);
};
