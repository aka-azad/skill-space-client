import { Helmet } from "react-helmet-async";
import Banner from "../Components/Banner";
import PartnersSection from "../Components/PartnerSection";
import PopularClasses from "../Components/PopularClasses";
import FeedbackOfStudents from "../Components/FeedbackOfStudents";
import PlatformStats from "../Components/PlatFormStats";
import JoinAsTeacher from "../Components/JoinAsTeacher";
import UpcomingEvents from "../Components/UpcomingEvents";
import Testimonials from "../Components/Testimonials";

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
        <PopularClasses />
        <FeedbackOfStudents />
        <PlatformStats />
        <JoinAsTeacher />
        <UpcomingEvents />
        <Testimonials />
      </div>
    </>
  );
};

export default Home;
