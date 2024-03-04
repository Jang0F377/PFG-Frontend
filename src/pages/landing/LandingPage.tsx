import { FC } from "react";
import Hero from "../../components/Hero";
import PrimaryFeatures from "../../components/PrimaryFeatures";
import Support from "../../components/Support";
import Contact from "../../components/Contact";
import { ProductPageFooter } from "../../components/common/Footer";

const LandingPage: FC = () => (
	<>
		<main>
			<Hero />
			<PrimaryFeatures />
			<Support />
			<Contact />
		</main>
		<ProductPageFooter />
	</>
);

export default LandingPage;
