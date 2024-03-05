import { FC } from "react";
import Hero from "../../components/landing/Hero";
import PrimaryFeatures from "../../components/landing/PrimaryFeatures";
import Support from "../../components/landing/Support";
import Contact from "../../components/landing/Contact";

const LandingPage: FC = () => (
	<>
		<main>
			<Hero />
			<PrimaryFeatures />
			<Support />
			<Contact />
		</main>
	</>
);

export default LandingPage;
