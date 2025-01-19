import PropTypes from "prop-types";
const SectionTitle = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-8">
      <h2 className="md:text-3xl sm:text-2xl text-xl font-bold mb-2">{title}</h2>
      {subtitle && <p className=" md:text-xl sm:text-base text-sm text-base-content pl-40 opacity-75">{subtitle}</p>}
    </div>
  );
};

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

export default SectionTitle;
