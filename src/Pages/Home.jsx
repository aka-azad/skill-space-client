import { Helmet } from "react-helmet-async";
import Banner from "../Components/Banner";
import PartnersSection from "../Components/PartnerSection";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Skill Space | Home</title>
        <meta name="description" content="home" />
      </Helmet>
      <div>
        <Banner />
        <PartnersSection />
      </div>
    </>
  );
};

export default Home;
