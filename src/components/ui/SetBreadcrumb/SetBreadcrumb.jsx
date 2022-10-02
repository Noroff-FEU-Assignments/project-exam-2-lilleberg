import Breadcrumb from "react-bootstrap/Breadcrumb";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function SetBreadcrumb({ name }) {
  return (
    <Breadcrumb>
      <li className="breadcrumb-item breadcrumb__item">
        <Link to="/">Home</Link>
      </li>
      <li className="breadcrumb-item breadcrumb__item breadcrumb__item--estab">
        {" "}
        <Link to="/establishments">Establishments</Link>
      </li>
      <Breadcrumb.Item
        className="breadcrumb__item breadcrumb__item--active"
        active
      >
        {name}
      </Breadcrumb.Item>
    </Breadcrumb>
  );
}

SetBreadcrumb.propTypes = {
  name: PropTypes.string.isRequired,
};

export default SetBreadcrumb;
