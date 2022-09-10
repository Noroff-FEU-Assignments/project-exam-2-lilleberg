function MessageItem({
  id,
  firstName,
  lastName,
  email,
  subject,
  message,
  dateTime,
}) {
  return (
    <div className="message">
      <div className="message_date-time">
        <p>{dateTime}</p>
      </div>
      <div className="message__firstname d-flex">
        <p>First name</p>
        <p>{firstName}</p>
      </div>

      <div className="message__email d-flex">
        <p>Last name</p>
        <p>{lastName}</p>
      </div>

      <div className="email d-flex">
        <p>Email</p>
        <p>{email}</p>
      </div>

      <div className="message__subject d-flex">
        <p>Subject</p>
        <p>{subject}</p>
      </div>

      <div className="message__message d-flex">
        <p>Message</p>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default MessageItem;
