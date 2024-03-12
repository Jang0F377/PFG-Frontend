import clsx from "clsx";

interface AvatarProps {
	email?: string;
	size: string;
}

const CustomAvatar = ({ email, size }: AvatarProps) => {
	const initials = email?.substring(0, 3);
	return (
		<div className="mx-auto my-auto  md:p-0.5  bg-neon-blue-600 rounded-full">
			<p
				className={clsx(
					"z-20 font-semibold md:text-lg items-center flex justify-center  text-white ",
					size === "xs"
						? "h-6 w-6"
						: size === "sm"
							? "h-8 w-8"
							: size === "md"
								? "h-10 w-10"
								: size === "lg"
									? "h-12 w-12"
									: size === "xl"
										? "h-14 w-14"
										: "h-6 w-6"
				)}
			>
				{initials}
			</p>
		</div>
	);
};

export default CustomAvatar;
