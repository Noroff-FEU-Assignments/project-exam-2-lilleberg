import Table from "react-bootstrap/Table";
import PropTypes from "prop-types";

function MessageItem({
  firstName,
  lastName,
  email,
  subject,
  message,
  dateTime,
}) {
  return (
    <div className="message table-container mx-auto">
      <Table responsive>
        <thead>
          <tr>
            <th className="table__head">Date/time</th>
            <th className="table__head">Subject</th>
            <th className="table__head">First name</th>
            <th className="table__head">Last name</th>
            <th className="table__head">Email</th>
            <th className="table__head">Message</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="table__data">{dateTime}</td>
            <td className="table__data">{subject}</td>
            <td className="table__data">{firstName}</td>
            <td className="table__data">{lastName}</td>
            <td className="table__data">{email}</td>
            <td className="table__data">{message}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

MessageItem.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  dateTime: PropTypes.string.isRequired,
};

export default MessageItem;
