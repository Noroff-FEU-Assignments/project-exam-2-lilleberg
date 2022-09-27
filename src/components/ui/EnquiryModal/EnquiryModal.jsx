import Modal from "react-bootstrap/Modal";
import EnquiryForm from "../../forms/EnquiryForm/EnquiryForm";
import PropTypes from "prop-types";

function EnquiryModal({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose} className="modal">
      <button
        className="close-modal border-0"
        onClick={handleClose}
        aria-label="Close booking enquiry"
      >
        <i className="bi bi-x-lg"></i>
      </button>
      <EnquiryForm />
    </Modal>
  );
}

EnquiryModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default EnquiryModal;
