import { SVGProps, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import clsx from "clsx";
import {
	FireIcon,
	GiftIcon,
	HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import { Container } from "./common/Container";

const plans = [
	{
		name: "Starter",
		featured: false,
		price: { Monthly: "$0", Annually: "$0" },
		description: `You want to try out PFG Messenger.`,
		buttonLabel: "Always free",
		features: [
			"Always free Sesh messenger",
			"Set up as many Seshions as you want. Forever",
			"Max of 10 people per invite",
			"Max of one committed/scheduled Sesh per day ",
		],
		icon: (
			<HandThumbUpIcon
				className={clsx(
					"h-6 w-6 flex-none fill-neon-blue-200 text-neon-blue-800"
				)}
			/>
		),
	},
	{
		name: "Investor",
		featured: false,
		price: { Monthly: "$1", Annually: "$10" },
		description: "You want to try out PFG Messenger & support the rebel cause.",
		buttonLabel: "Support",
		features: [
			"Always free Sesh messenger",
			"Set up as many Seshions as you want. Forever",
			"Max of 15 people per invite",
			"Max of two committed/scheduled Seshes per day",
			"Supporter badge",
		],
		icon: (
			<GiftIcon
				className={clsx(
					"h-6 w-6 flex-none fill-neon-blue-400 text-neon-blue-600 "
				)}
			/>
		),
	},
	{
		name: "VIP",
		featured: true,
		price: { Monthly: "$3", Annually: "$30" },
		description:
			"You want to support & become a VIP of the Prefire Gaming Community.",
		buttonLabel: "Support",

		features: [
			"Always free Sesh messenger",
			"Set up as many Seshions as you want. Forever",
			"Max of 20 people per invite",
			"Max of four committed/scheduled Seshes per day",
			"Supporter badge",
			"VIP badge",
		],
		icon: (
			<FireIcon
				className={clsx("mx-auto h-6 w-6 animate-pulse fill-red-500")}
			/>
		),
	},
];
function CheckIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
			<path
				d="M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z"
				fill="currentColor"
			/>
			<circle
				cx="12"
				cy="12"
				r="8.25"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

interface PlanProps {
	name: string;
	featured: boolean;
	price: {
		Monthly: string;
		Annually: string;
	};
	description: string;
	buttonLabel: string;
	features: Array<string>;
	icon: JSX.Element;
	activePeriod: string;
}

function Plan({
	name,
	price,
	description,
	buttonLabel,
	features,
	featured = false,
	activePeriod,
	icon,
}: PlanProps) {
	return (
		<section
			className={clsx(
				"flex flex-col overflow-hidden rounded-3xl p-6 shadow-lg shadow-gray-900/5",
				featured ? "order-first bg-blue-600 lg:order-none" : "bg-white"
			)}
		>
			<h3
				className={clsx(
					"flex flex-col items-center justify-center text-sm font-semibold",
					featured ? "text-white" : "text-gray-900"
				)}
			>
				{icon}
				<span className="text-lg">{name}</span>
			</h3>
			<p
				className={clsx(
					"relative mx-auto mt-5 flex text-3xl tracking-tight",
					featured ? "text-white" : "text-gray-900"
				)}
			>
				{price.Monthly === price.Annually ? (
					price.Monthly
				) : (
					<>
						<span
							aria-hidden={activePeriod === "Annually"}
							className={clsx(
								"transition duration-300",
								activePeriod === "Annually" &&
									"pointer-events-none translate-x-6 select-none opacity-0"
							)}
						>
							{price.Monthly}
						</span>
						<span
							aria-hidden={activePeriod === "Monthly"}
							className={clsx(
								"absolute left-0 top-0 transition duration-300",
								activePeriod === "Monthly" &&
									"pointer-events-none -translate-x-6 select-none opacity-0"
							)}
						>
							{price.Annually}
						</span>
					</>
				)}
			</p>
			<p
				className={clsx(
					"mt-3 text-center text-sm",
					featured ? "text-gray-300" : "text-gray-700"
				)}
			>
				{description}
			</p>
			<div className="order-last mt-6">
				<ul
					role="list"
					className={clsx(
						"-my-2 divide-y text-sm",
						featured
							? "divide-gray-800 text-gray-300"
							: "divide-gray-200 text-gray-700"
					)}
				>
					{features.map((feature) => (
						<li key={feature} className="flex py-2">
							<CheckIcon
								className={clsx(
									"h-6 w-6 flex-none",
									featured ? "text-white" : "text-cyan-500"
								)}
							/>
							<span className="ml-4">{feature}</span>
						</li>
					))}
				</ul>
			</div>
			<button
				color={featured ? "cyan" : "gray"}
				className="mt-6 inline-block w-full rounded-lg bg-slate-800 px-3 py-2 text-white"
				aria-label={`Get started with the ${name} plan for ${price}`}
			>
				{buttonLabel}
			</button>
		</section>
	);
}

function Support() {
	let [activePeriod, setActivePeriod] = useState("Monthly");

	return (
		<section
			id="support"
			aria-labelledby="pricing-title"
			className="border-t border-gray-200 bg-neon-blue-800 py-20 "
		>
			<Container className="">
				<div className="mx-auto max-w-2xl text-center">
					<h2
						id="pricing-title"
						className="text-3xl font-medium tracking-tight text-white"
					>
						PFG Sesh Messenger is always free.
					</h2>
					<p className="mt-2 text-lg text-neon-blue-50">
						Though we always appreciate the support
					</p>
				</div>

				<div className="mt-8 flex justify-center">
					<div className="relative">
						<RadioGroup
							value={activePeriod}
							onChange={setActivePeriod}
							className="grid grid-cols-2"
						>
							{["Monthly", "Annually"].map((period) => (
								<RadioGroup.Option
									key={period}
									value={period}
									className={clsx(
										"cursor-pointer border border-white py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-sm text-neon-blue-50 outline-2 outline-offset-2 transition-colors hover:border-transparent hover:bg-white hover:text-neon-blue-900",
										period === "Monthly"
											? "rounded-l-lg"
											: "-ml-px rounded-r-lg"
									)}
								>
									{period}
								</RadioGroup.Option>
							))}
						</RadioGroup>
						<div
							aria-hidden="true"
							className={clsx(
								"pointer-events-none absolute inset-0 z-10 grid grid-cols-2 overflow-hidden rounded-lg bg-neon-blue-500 transition-all duration-300",
								activePeriod === "Monthly"
									? "[clip-path:inset(0_50%_0_0)]"
									: "[clip-path:inset(0_0_0_calc(50%-1px))]"
							)}
						>
							{["Monthly", "Annually"].map((period) => (
								<div
									key={period}
									className={clsx(
										"py-2 text-center text-sm font-semibold text-white [&:not(:focus-visible)]:focus:outline-none",
										period === "Annually" && "-ml-px"
									)}
								>
									{period}
								</div>
							))}
						</div>
					</div>
				</div>

				<div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-10 sm:mt-20 lg:max-w-none lg:grid-cols-3">
					{plans.map((plan) => (
						<Plan key={plan.name} {...plan} activePeriod={activePeriod} />
					))}
				</div>
			</Container>
		</section>
	);
}

export default Support;
