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
    <div className="message">
      <Table responsive>
        <thead>
          <tr>
            <th className="message__head">Date/time</th>
            <th className="message__head">Subject</th>
            <th className="message__head">First name</th>
            <th className="message__head">Last name</th>
            <th className="message__head">Email</th>
            <th className="message__head">Message</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="message__data">{dateTime}</td>
            <td className="message__data">{subject}</td>
            <td className="message__data">{firstName}</td>
            <td className="message__data">{lastName}</td>
            <td className="message__data">{email}</td>
            <td className="message__data">{message}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default MessageItem;
