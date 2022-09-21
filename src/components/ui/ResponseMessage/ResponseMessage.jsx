import PropTypes from "prop-types";

function ResponseMessage({ className, children }) {
  return <div className={className}>{children}</div>;
}

ResponseMessage.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ResponseMessage;
