import PropTypes from "prop-types";

function Heading({ size = "1", content }) {
  const ContentHeading = `h${size}`;
  return <ContentHeading>{content}</ContentHeading>;
}

Heading.propTypes = {
  size: PropTypes.string,
  content: PropTypes.string.isRequired,
};

export default Heading;
