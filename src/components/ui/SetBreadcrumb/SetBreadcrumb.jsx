import Breadcrumb from "react-bootstrap/Breadcrumb";
import PropTypes from "prop-types";

function SetBreadcrumb({ name }) {
  return (
    <Breadcrumb>
      <Breadcrumb.Item className="breadcrumb__item" href="/">
        Home
      </Breadcrumb.Item>
      <Breadcrumb.Item
        className="breadcrumb__item breadcrumb__item--estab"
        href="/establishments"
      >
        Establishments
      </Breadcrumb.Item>
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
