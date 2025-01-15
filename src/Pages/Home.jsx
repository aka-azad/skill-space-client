import { Helmet } from "react-helmet";
import Banner from "../Components/Banner";
import PartnersSection from "../Components/PartnerSection";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Skill Space | Home</title>
        <meta name="description" content="home"/>
      </Helmet>
      <Banner />
      <PartnersSection />
    </div>
  );
};

export default Home;
