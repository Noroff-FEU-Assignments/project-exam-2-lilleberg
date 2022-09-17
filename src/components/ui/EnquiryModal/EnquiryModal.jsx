import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import EnquiryForm from "../../forms/EnquiryForm/EnquiryForm";

function EnquiryModal({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose} className="modal">
      <EnquiryForm />
    </Modal>
  );
}

export default EnquiryModal;
