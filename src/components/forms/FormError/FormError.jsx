import React from "react";
import PropTypes from "prop-types";

function FormError({ className, children }) {
  return <div className={className}>{children}</div>;
}

FormError.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FormError;
