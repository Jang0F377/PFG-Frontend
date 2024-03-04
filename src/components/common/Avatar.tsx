import clsx from "clsx";

interface AvatarProps {
	image: string;
	size: string;
}

const CustomAvatar = ({ image, size }: AvatarProps) => {
	return (
		<>
			<img
				className={clsx(
					"z-20 mx-auto inline-block rounded-full",
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
				src={image}
				alt="ERR"
			/>
		</>
	);
};

export default CustomAvatar;
