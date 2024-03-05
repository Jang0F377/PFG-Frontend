import { TypeAnimation } from "react-type-animation";

function Contact() {
	return (
		<div id={"contact"} className="relative overflow-hidden  bg-neon-blue-50">
			<div className=" lg:absolute lg:inset-0">
				<div className=" lg:absolute lg:bottom-2/3 lg:right-0 lg:w-1/3">
					<img
						className="mx-auto w-[85vw] px-1.5 lg:absolute lg:w-full lg:rotate-90 lg:scale-150 2xl:rotate-45 2xl:scale-110  2xl:px-0"
						src="/MicrosoftTeams-image-removebg-preview.png"
						alt="ERR"
					/>
				</div>
			</div>
			<div className="relative py-16 px-4 sm:py-24 sm:px-6 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2 lg:px-8 lg:py-32">
				<div className="lg:pr-8">
					<div className="mx-auto max-w-md sm:max-w-lg lg:mx-0">
						<h2 className="text-3xl font-bold tracking-tight text-neon-blue-900/90 md:text-4xl">
							Got a{" "}
							<TypeAnimation
								sequence={[" question", 1100, " problem", 1100]}
								repeat={Infinity}
							/>
						</h2>
						<p className="mt-4 text-neon-blue-400 sm:mt-3 lg:text-lg">
							We’d love to hear from you! Send us a message using the form
							opposite, or email us. We’d love to hear from you! Send us a
							message using the form opposite, or email us.
						</p>
						<form
							action="src/components/Contact#"
							className="mt-9 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
						>
							<div>
								<label
									htmlFor="first-name"
									className="block text-sm font-medium text-neon-blue-900"
								>
									First name
								</label>
								<div className="mt-1">
									<input
										type="text"
										name="first-name"
										id="first-name"
										autoComplete="given-name"
										className="p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
									/>
								</div>
							</div>
							<div>
								<label
									htmlFor="last-name"
									className="block text-sm font-medium text-neon-blue-900"
								>
									Last name
								</label>
								<div className="mt-1">
									<input
										type="text"
										name="last-name"
										id="last-name"
										autoComplete="family-name"
										className="block w-full p-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
									/>
								</div>
							</div>
							<div className="sm:col-span-2">
								<label
									htmlFor="email"
									className="block text-sm font-medium text-neon-blue-900"
								>
									Email
								</label>
								<div className="mt-1">
									<input
										id="email"
										name="email"
										type="email"
										autoComplete="email"
										className="p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
									/>
								</div>
							</div>
							<div className="sm:col-span-2">
								<div className="flex justify-between">
									<label
										htmlFor="phone"
										className="block text-sm font-medium text-neon-blue-900"
									>
										Phone
									</label>
									<span
										id="phone-description"
										className="text-sm  text-neon-blue-300"
									>
										Optional
									</span>
								</div>
								<div className="mt-1">
									<input
										type="text"
										name="phone"
										id="phone"
										autoComplete="tel"
										aria-describedby="phone-description"
										className="p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
									/>
								</div>
							</div>
							<div className="sm:col-span-2">
								<div className="flex justify-between">
									<label
										htmlFor="how-can-we-help"
										className="block text-sm font-medium text-neon-blue-900"
									>
										How can we help you?
									</label>
									<span
										id="how-can-we-help-description"
										className="text-sm text-neon-blue-300"
									>
										Max. 500 characters
									</span>
								</div>
								<div className="mt-1">
									<textarea
										id="how-can-we-help"
										name="how-can-we-help"
										aria-describedby="how-can-we-help-description"
										rows={4}
										className="p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
										defaultValue={""}
									/>
								</div>
							</div>
							<div className="sm:col-span-2">
								<label
									htmlFor="how-did-you-hear-about-us"
									className="block text-sm font-medium text-neon-blue-900"
								>
									How did you hear about us?
								</label>
								<div className="mt-1">
									<input
										type="text"
										name="how-did-you-hear-about-us"
										id="how-did-you-hear-about-us"
										className="p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
									/>
								</div>
							</div>
							<div className="text-right sm:col-span-2">
								<button className="inline-flex justify-center rounded-md border border-transparent bg-neon-blue-600 py-2 px-4 text-sm font-medium text-neon-blue-50 shadow-sm hover:bg-neon-blue-700 focus:outline-none focus:ring-2 focus:ring-neon-blue-500 focus:ring-offset-2">
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Contact;
