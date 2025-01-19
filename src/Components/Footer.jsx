import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router";
import logo from '../assets/logo-big.png'
const Footer = () => {
  return (
    <div className="bg-base-300 text-base-content p-10">
      <footer className="footer max-w-[1280px] container mx-auto ">
        <nav className="w-40 flex flex-col justify-center items-center">
            <Link to={'/'} className="btn btn-ghost btn-wide font-bold text-2xl">Skill Space</Link>
            <img className="w-32" src={logo} alt="" />
        </nav>
        <nav>
          <h6 className="footer-title">Navigate</h6>
          <Link to={'/all-classes'} className="link link-hover">All Courses</Link>
          <Link to={'/dashboard'} className="link link-hover">Dashboard</Link>
        </nav>
        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="fill-current text-2xl" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="fill-current text-2xl" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube className="fill-current text-2xl" />
            </a>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
