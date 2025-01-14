import PropTypes from "prop-types";
const SectionTitle = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold mb-2">{title}</h2>
      {subtitle && <p className="text-lg text-base-content pl-40 opacity-75">{subtitle}</p>}
    </div>
  );
};

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

export default SectionTitle;
