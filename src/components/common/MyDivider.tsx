interface DividerProps {
	text: string;
}

const MyDivider = ({ text }: DividerProps) => {
	return (
		<div className="relative">
			<div className="absolute inset-0 flex items-center" aria-hidden="true">
				<div className="w-full border-t border-gray-300" />
			</div>
			<div className="relative flex justify-center rounded-lg">
				<span className="rounded-lg bg-white px-2 text-sm text-neon-blue-tone-100">
					{text}
				</span>
			</div>
		</div>
	);
};

export default MyDivider;
