import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";

function MessageItem({
  firstName,
  lastName,
  email,
  subject,
  message,
  dateTime,
}) {
  return (
    <>
      <div className="message mx-auto">
        <div className="text-end message__date-time">
          <p>{dateTime}</p>
        </div>
        <div className="">
          <p className="semi-bold message__title">Subject</p>
          <p className=" message__info">{subject}</p>
        </div>
        <div className="">
          <p className="semi-bold message__title">First name</p>
          <p className=" message__info">{firstName}</p>
        </div>

        <div>
          <p className="semi-bold message__title">Last name</p>
          <p>{lastName}</p>
        </div>
        <div>
          <p className="semi-bold message__title">Email</p>
          <p>{email}</p>
        </div>
        <div>
          <p className="semi-bold message__title">Message</p>
          <p>{message}</p>
        </div>
      </div>
      {/* <div className="message message-lg table-container mx-auto d-none d-md-block">
        <Table responsive className="table-top">
          <thead>
            <tr className="table__first-row">
              <th className="table__head">Date/time</th>
              <th className="table__head">First name</th>
              <th className="table__head">Last name</th>
              <th className="table__head">Email</th>
            </tr>
          </thead>
          <tbody>
            <tr className="table__first-row">
              <td className="table__data">{dateTime}</td>
              <td className="table__data">{firstName}</td>
              <td className="table__data">{lastName}</td>
              <td className="table__data">{email}</td>
            </tr>
          </tbody>
          <thead>
            <tr className="table__second-row">
              <th className="table__head fit-content">Subject</th>
              <th className="table__head table__head--message">Message</th>
            </tr>
          </thead>
          <tbody>
            <tr className="table__second-row">
              <td className="table__data fit-content">{subject}</td>
              <td className="table__data table__data--message">{message}</td>
            </tr>
          </tbody>
        </Table>
      </div> */}
    </>
  );
}

export default MessageItem;
