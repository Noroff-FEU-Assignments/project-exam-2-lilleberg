import Table from "react-bootstrap/Table";
import PropTypes from "prop-types";

function EnquiryItem({
  establishment,
  firstName,
  lastName,
  number,
  email,
  dateFrom,
  dateTo,
  message,
  dateTime,
}) {
  return (
    <div className="enquiry table-container mx-auto">
      <Table responsive>
        <thead>
          <tr>
            <th className="table__head">Establishment</th>
            <th className="table__head">Date/time</th>
            <th className="table__head">First name</th>
            <th className="table__head">Last name</th>
            <th className="table__head">Number</th>
            <th className="table__head">Reservation date</th>
            <th className="table__head">Email</th>
            <th className="table__head">Message</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="table__data">{establishment}</td>
            <td className="table__data">{dateTime}</td>
            <td className="table__data">{firstName}</td>
            <td className="table__data">{lastName}</td>
            <td className="table__data">{number}</td>
            <td className="table__data">
              {dateFrom} - {dateTo}
            </td>
            <td className="table__data">{email}</td>
            <td className="table__data">{message}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

EnquiryItem.propTypes = {
  establishment: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  dateFrom: PropTypes.string.isRequired,
  dateTo: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  dateTime: PropTypes.string.isRequired,
};

export default EnquiryItem;
