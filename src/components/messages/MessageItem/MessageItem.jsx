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
    <div className="message mx-auto">
      <div className="text-end message__date-time">
        <p>{dateTime}</p>
      </div>
      <div>
        <p className="semi-bold message__title">Subject</p>
        <p className=" message__info">{subject}</p>
      </div>
      <div>
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
  );
}

MessageItem.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  dateTime: PropTypes.string.isRequired,
};

export default MessageItem;
