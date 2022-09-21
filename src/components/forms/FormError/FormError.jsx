import PropTypes from "prop-types";

function FormError({ className = "", children }) {
  return <div className={className}>{children}</div>;
}

FormError.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default FormError;
