import PropTypes from "prop-types";

function Heading({ size = "1", content, className = "" }) {
  const ContentHeading = `h${size}`;
  return <ContentHeading className={className}>{content}</ContentHeading>;
}

Heading.propTypes = {
  size: PropTypes.string,
  content: PropTypes.string.isRequired,
};

export default Heading;
