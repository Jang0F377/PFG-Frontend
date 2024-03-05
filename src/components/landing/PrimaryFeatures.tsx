import {
	BoltIcon,
	ChatBubbleBottomCenterTextIcon,
	EnvelopeIcon,
	GlobeAltIcon,
	ScaleIcon,
} from "@heroicons/react/24/outline";
import { TypeAnimation } from "react-type-animation";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import clsx from "clsx";
import InviteReceivedEx from "./InviteReceivedEx";

const transferFeatures = [
	{
		id: 1,
		name: "Set up a Sesh with anyone, anywhere",
		description:
			"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
		icon: GlobeAltIcon,
	},
	{
		id: 2,
		name: "No fees!",
		description:
			"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
		icon: ScaleIcon,
	},
	{
		id: 3,
		name: "Sesh invites are instant",
		description:
			"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
		icon: BoltIcon,
	},
];
const communicationFeatures = [
	{
		id: 1,
		name: "Mobile notifications",
		description:
			"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
		icon: ChatBubbleBottomCenterTextIcon,
	},
	{
		id: 2,
		name: "Reminder emails",
		description:
			"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
		icon: EnvelopeIcon,
	},
];
const ChoseMinutesButtons = () => {
	const [selected, setSelected] = useState("00");
	const selectTime = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		if (selected !== event.currentTarget.id) {
			setSelected(event.currentTarget.id);
		}
	};

	return (
		<div className="flex flex-row  rounded-md bg-white shadow-sm">
			<button
				onClick={selectTime}
				id="00"
				className={clsx(
					"relative inline-flex items-center rounded-l-md   px-4 py-2 text-sm font-medium",
					selected === "00"
						? "border border-white bg-neon-blue-700 text-neon-blue-50 "
						: "border border-gray-300 bg-white text-blue-700 hover:border-blue-50 hover:bg-neon-blue-700 hover:text-neon-blue-50 hover:ring-1 hover:ring-neon-blue-500"
				)}
			>
				00
			</button>
			<button
				onClick={selectTime}
				id="15"
				className={clsx(
					"relative inline-flex items-center  px-4 py-2 text-sm font-medium",
					selected === "15"
						? "border border-white bg-neon-blue-700 text-neon-blue-50 "
						: "border border-gray-300 bg-white text-blue-700 hover:border-blue-50 hover:bg-neon-blue-700 hover:text-neon-blue-50 hover:ring-1 hover:ring-neon-blue-500"
				)}
			>
				15
			</button>
			<button
				onClick={selectTime}
				id="30"
				className={clsx(
					"relative inline-flex items-center  px-4 py-2 text-sm font-medium",
					selected === "30"
						? "border border-white bg-neon-blue-700 text-neon-blue-50 "
						: "border border-gray-300 bg-white text-blue-700 hover:border-blue-50 hover:bg-neon-blue-700 hover:text-neon-blue-50 hover:ring-1 hover:ring-neon-blue-500"
				)}
			>
				30
			</button>
			<button
				onClick={selectTime}
				id="45"
				className={clsx(
					"relative inline-flex items-center rounded-r-md   px-4 py-2 text-sm font-medium",
					selected === "45"
						? "border border-white bg-neon-blue-700 text-neon-blue-50 "
						: "border border-gray-300 bg-white text-blue-700 hover:border-blue-50 hover:bg-neon-blue-700 hover:text-neon-blue-50 hover:ring-1 hover:ring-neon-blue-500"
				)}
			>
				45
			</button>
		</div>
	);
};

const AmOrPmButtons = () => {
	const AM = "AM";
	const PM = "PM";
	const [selected, setSelected] = useState(AM);
	const handleClick = () => {
		if (selected === AM) {
			setSelected(PM);
		} else {
			setSelected(AM);
		}
	};
	return (
		<>
			<span className="flex  rounded-md shadow-sm">
				<button
					onClick={handleClick}
					id={AM}
					className={clsx(
						"relative inline-flex items-center rounded-l-md   px-4 py-2 text-sm font-medium ",
						selected === AM
							? "border border-white bg-neon-blue-700 text-neon-blue-50 "
							: "border border-gray-300 bg-white text-blue-700 hover:border-blue-50 hover:bg-neon-blue-700 hover:text-neon-blue-50 hover:ring-1 hover:ring-neon-blue-500"
					)}
				>
					{AM}
				</button>
				<button
					onClick={handleClick}
					id={PM}
					className={clsx(
						"relative inline-flex items-center rounded-r-md   px-4 py-2 text-sm font-medium",
						selected === PM
							? "border border-white bg-neon-blue-700 text-neon-blue-50 "
							: "border border-gray-300 bg-white text-blue-700 hover:border-blue-50 hover:bg-neon-blue-700 hover:text-neon-blue-50  hover:ring-1 hover:ring-neon-blue-500"
					)}
				>
					{PM}
				</button>
			</span>
		</>
	);
};

function PrimaryFeatures() {
	const [hour, setHour] = useState(8);
	const onClickAddHour = () => {
		if (hour === 12) {
			setHour(1);
		} else {
			setHour(hour + 1);
		}
	};
	const onClickSubHour = () => {
		if (hour === 1) {
			setHour(12);
		} else {
			setHour(hour - 1);
		}
	};

	return (
		<div className="overflow-hidden bg-gray-50 py-16 lg:py-24" id={"demo"}>
			<div className="relative mx-auto max-w-xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
				<svg
					className="absolute left-full hidden -translate-x-1/2 -translate-y-1/4 transform lg:block"
					width={404}
					height={784}
					fill="none"
					viewBox="0 0 404 784"
					aria-hidden="true"
				>
					<defs>
						<pattern
							id="b1e6e422-73f8-40a6-b5d9-c8586e37e0e7"
							x={0}
							y={0}
							width={20}
							height={20}
							patternUnits="userSpaceOnUse"
						>
							<rect
								x={0}
								y={0}
								width={4}
								height={4}
								className="text-gray-200"
								fill="currentColor"
							/>
						</pattern>
					</defs>
					<rect
						width={404}
						height={784}
						fill="url(#b1e6e422-73f8-40a6-b5d9-c8586e37e0e7)"
					/>
				</svg>

				<div className="relative">
					<h2 className="text-center text-3xl font-bold leading-8 tracking-tight text-neon-blue-900 sm:text-4xl">
						A better way to stay connected and play games
					</h2>
					<p className="mx-auto mt-4 max-w-3xl text-center text-xl text-neon-blue-tone-200">
						It&apos;s as easy as sending an invite to a friend and once
						confirmed, look forward to that Sesh!
					</p>
				</div>

				<div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:items-center lg:gap-8">
					<div className="relative">
						<h3 className="text-2xl font-bold tracking-tight text-neon-blue-900 sm:text-3xl">
							Set up a Sesh with anyone worldwide
						</h3>
						<p className="mt-3 text-lg text-neon-blue-tone-200">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
							minima sequi recusandae, porro maiores officia assumenda aliquam
							laborum ab aliquid veritatis impedit odit adipisci optio iste
							blanditiis facere. Totam, velit.
						</p>

						<dl className="mt-10 space-y-10">
							{transferFeatures.map((item) => (
								<div key={item.id} className="relative">
									<dt>
										<div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-indigo-500 text-white">
											<item.icon className="h-6 w-6" aria-hidden="true" />
										</div>
										<p className="ml-16 text-lg font-medium leading-6 text-gray-900">
											{item.name}
										</p>
									</dt>
									<dd className="mt-2 ml-16 text-base text-gray-500">
										{item.description}
									</dd>
								</div>
							))}
						</dl>
					</div>

					<div className="relative -mx-4 mt-10 lg:mt-0" aria-hidden="true">
						<svg
							className="absolute left-1/2 -z-10 -translate-x-1/2 translate-y-16 transform lg:hidden"
							width={784}
							height={404}
							fill="none"
							viewBox="0 0 784 404"
						>
							<defs>
								<pattern
									id="ca9667ae-9f92-4be7-abcb-9e3d727f2941"
									x={0}
									y={0}
									width={20}
									height={20}
									patternUnits="userSpaceOnUse"
								>
									<rect
										x={0}
										y={0}
										width={4}
										height={4}
										className="text-gray-200"
										fill="currentColor"
									/>
								</pattern>
							</defs>
							<rect
								width={784}
								height={404}
								fill="url(#ca9667ae-9f92-4be7-abcb-9e3d727f2941)"
							/>
						</svg>
						<div className="z-20   mx-1 flex-col rounded-lg md:mx-auto  lg:relative lg:w-[490px] ">
							<section className="space-y-6 rounded-t-lg bg-neon-blue-100 py-7 px-4 sm:px-6  lg:py-6">
								<div>
									<h3 className="text-base font-medium leading-6 text-neon-blue-900">
										Send a Sesh Invite.
									</h3>
									<p className="mt-0.5 text-xs text-neon-blue-tone-200">
										Select a recipient and choose the proposed game and time.
									</p>
								</div>
								<div>
									<label
										htmlFor="recipient"
										className="block text-xs  font-medium text-neon-blue-900 md:text-sm"
									>
										Recipient/s
									</label>
									<div className=" mt-1 block w-full rounded-md border-gray-300 bg-white px-2 py-2 text-xs  md:text-sm">
										<TypeAnimation
											sequence={[
												"PLANET_SNIPS, Jotch59, silient_bangzs",
												1050,
												"Jotch59, silient_bangzs",
												1050,
												"silient_bangzs",
												1050,
											]}
											repeat={Infinity}
										/>
									</div>
								</div>
							</section>
							<section className="space-y-6 bg-neon-blue-100 px-4 pb-5 sm:px-6">
								<div>
									<label
										htmlFor="recipient"
										className="block text-xs  font-medium text-neon-blue-900 md:text-sm"
									>
										What game do you want to suggest?
									</label>
									<div className=" mt-1 block w-full rounded-md border-gray-300 bg-white px-2 py-2 text-xs  md:text-sm ">
										<TypeAnimation
											sequence={[
												"Apex Legends",
												1100,
												"Destiny 2",
												1100,
												"Call of Duty: Warzone",
												1100,
											]}
											repeat={Infinity}
										/>
									</div>
								</div>
								<div>
									<label
										htmlFor="recipient"
										className="block text-sm font-medium text-neon-blue-900"
									>
										What time for the Sesh?
									</label>
									<div className="flex flex-col items-center justify-evenly space-y-3 pt-1 md:flex-row md:space-y-0">
										<div className="mt-1 flex flex-row items-center rounded-md bg-white px-4 py-2 md:mt-0 ">
											<ChevronLeftIcon
												className="w-6 cursor-pointer pr-1"
												onClick={onClickSubHour}
											/>
											<h1 className=" mx-1 text-center">{hour}</h1>
											<ChevronRightIcon
												className="w-6 cursor-pointer pl-1"
												onClick={onClickAddHour}
											/>
										</div>
										<div className="flex flex-col ">
											<ChoseMinutesButtons />
										</div>
										<AmOrPmButtons />
									</div>
								</div>
							</section>
							<hr className="w-full border-neon-blue-700" />
							<section className="flex items-center justify-end space-x-6 rounded-b-md bg-neon-blue-100 px-4 py-7 sm:px-6 lg:py-6">
								<button className="inline-block rounded-md bg-red-600 px-2 py-2.5 text-neon-blue-50 hover:bg-red-800 ">
									Cancel
								</button>
								<a className="inline-block items-center rounded-md bg-neon-blue-600 px-2 py-2.5 text-neon-blue-50 hover:bg-neon-blue-800 ">
									Send Sesh Invite
								</a>
							</section>
						</div>
					</div>
				</div>

				<svg
					className="absolute right-full hidden translate-x-1/2 translate-y-12 transform lg:block"
					width={404}
					height={784}
					fill="none"
					viewBox="0 0 404 784"
					aria-hidden="true"
				>
					<defs>
						<pattern
							id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
							x={0}
							y={0}
							width={20}
							height={20}
							patternUnits="userSpaceOnUse"
						>
							<rect
								x={0}
								y={0}
								width={4}
								height={4}
								className="text-gray-200"
								fill="currentColor"
							/>
						</pattern>
					</defs>
					<rect
						width={404}
						height={784}
						fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"
					/>
				</svg>

				<div className="relative mt-12 sm:mt-16 lg:mt-24">
					<div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:items-center lg:gap-8">
						<div className="lg:col-start-2">
							<h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
								Always in the loop
							</h3>
							<p className="mt-3 text-lg text-gray-500">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
								ex obcaecati natus eligendi delectus, cum deleniti sunt in
								labore nihil quod quibusdam expedita nemo.
							</p>

							<dl className="mt-10 space-y-10">
								{communicationFeatures.map((item) => (
									<div key={item.id} className="relative">
										<dt>
											<div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-indigo-500 text-white">
												<item.icon className="h-6 w-6" aria-hidden="true" />
											</div>
											<p className="ml-16 text-lg font-medium leading-6 text-gray-900">
												{item.name}
											</p>
										</dt>
										<dd className="mt-2 ml-16 text-base text-gray-500">
											{item.description}
										</dd>
									</div>
								))}
							</dl>
						</div>

						<div className="relative -mx-4 mt-10 lg:col-start-1 lg:mt-0">
							<svg
								className="absolute left-1/2  -translate-x-1/2 translate-y-16 transform lg:hidden"
								width={784}
								height={404}
								fill="none"
								viewBox="0 0 784 404"
								aria-hidden="true"
							>
								<defs>
									<pattern
										id="e80155a9-dfde-425a-b5ea-1f6fadd20131"
										x={0}
										y={0}
										width={20}
										height={20}
										patternUnits="userSpaceOnUse"
									>
										<rect
											x={0}
											y={0}
											width={4}
											height={4}
											className="text-gray-200"
											fill="currentColor"
										/>
									</pattern>
								</defs>
								<rect
									width={784}
									height={404}
									fill="url(#e80155a9-dfde-425a-b5ea-1f6fadd20131)"
								/>
							</svg>
							<div>
								<InviteReceivedEx />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PrimaryFeatures;
