import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function HeaderNavLinks() {
	let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	return (
		<>
			{[
				["Demo", "#demo"],
				["Support", "#support"],
				["Contact", "#contact"],
			].map(([label, href], index) => (
				<a
					key={label}
					href={href}
					className="relative -my-2 -mx-3 rounded-lg px-3 py-2 text-xl text-neon-blue-700 transition-colors delay-150 hover:text-neon-blue-50 hover:delay-[0ms]"
					onMouseEnter={() => setHoveredIndex(index)}
					onMouseLeave={() => setHoveredIndex(null)}
				>
					<div>
						<AnimatePresence>
							{hoveredIndex === index && (
								<motion.span
									className="absolute inset-0 rounded-lg bg-neon-blue-800"
									layoutId="hoverBackground"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1, transition: { duration: 0.15 } }}
									exit={{
										opacity: 0,
										transition: { duration: 0.15, delay: 0.2 },
									}}
								/>
							)}
						</AnimatePresence>
						<span className="relative z-10">{label}</span>
					</div>
				</a>
			))}
		</>
	);
}

export function FooterNavLinks() {
	let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	return (
		<>
			{[
				["Demo", "#demo"],
				["Support", "#support"],
				["Contact", "#contact"],
			].map(([label, href], index) => (
				<a
					key={label}
					href={href}
					className="relative rounded-lg px-1 py-1 text-xl text-neon-blue-50 transition-colors delay-150 hover:text-neon-blue-700 hover:delay-[0ms] sm:-my-2 sm:-mx-3 sm:px-3 sm:py-2"
					onMouseEnter={() => setHoveredIndex(index)}
					onMouseLeave={() => setHoveredIndex(null)}
				>
					<div>
						<AnimatePresence>
							{hoveredIndex === index && (
								<motion.span
									className="absolute inset-0 rounded-lg bg-neon-blue-50 text-neon-blue-50"
									layoutId="hoverBackground"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1, transition: { duration: 0.15 } }}
									exit={{
										opacity: 0,
										transition: { duration: 0.15, delay: 0.2 },
									}}
								/>
							)}
						</AnimatePresence>
						<span className="relative z-10">{label}</span>
					</div>
				</a>
			))}
		</>
	);
}

export function HeaderDashboardNavLinks() {
	let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	return (
		<>
			{[
				["Dashboard", "/dashboard"],
				["Friends", "/dashboard#friends"],
				["Users", "/users"],
				["Support PFG", "/support"],
				["Account", "/account"],
			].map(([label, href], index) => (
				<a
					key={label}
					href={href}
					className="relative -my-2 -mx-3 rounded-lg px-3 py-2 text-base font-medium text-neon-blue-700 transition-colors delay-150 hover:text-neon-blue-50 hover:delay-[0ms]"
					onMouseEnter={() => setHoveredIndex(index)}
					onMouseLeave={() => setHoveredIndex(null)}
				>
					<div>
						<AnimatePresence>
							{hoveredIndex === index && (
								<motion.span
									className="absolute inset-0 rounded-lg bg-neon-blue-800"
									layoutId="hoverBackground"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1, transition: { duration: 0.15 } }}
									exit={{
										opacity: 0,
										transition: { duration: 0.15, delay: 0.2 },
									}}
								/>
							)}
						</AnimatePresence>
						<span className="relative z-10">{label}</span>
					</div>
				</a>
			))}
		</>
	);
}

export function FooterDashboardNavLinks() {
	let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	return (
		<>
			{[
				["Dashboard", "/dashboard"],
				["Friends", "/dashboard#friends"],
				["Users", "/users"],
				["Support PFG", "/support"],
				["Account", "/account"],
			].map(([label, href], index) => (
				<a
					key={label}
					href={href}
					className="relative rounded-lg px-1 py-1 text-xl text-neon-blue-50 transition-colors delay-150 hover:text-neon-blue-700 hover:delay-[0ms] sm:-my-2 sm:-mx-3 sm:px-3 sm:py-2"
					onMouseEnter={() => setHoveredIndex(index)}
					onMouseLeave={() => setHoveredIndex(null)}
				>
					<div>
						<AnimatePresence>
							{hoveredIndex === index && (
								<motion.span
									className="absolute inset-0 rounded-lg bg-neon-blue-50 text-neon-blue-50"
									layoutId="hoverBackground"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1, transition: { duration: 0.15 } }}
									exit={{
										opacity: 0,
										transition: { duration: 0.15, delay: 0.2 },
									}}
								/>
							)}
						</AnimatePresence>
						<span className="relative z-10">{label}</span>
					</div>
				</a>
			))}
		</>
	);
}
