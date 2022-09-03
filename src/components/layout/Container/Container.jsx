import React from "react";

function Container({ children, className }) {
  return <div className={className}>{children}</div>;
}

export default Container;
