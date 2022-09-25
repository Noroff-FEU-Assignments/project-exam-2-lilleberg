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
    <div className="message enquiries mx-auto">
      <div className="text-end message__date-time">
        <p>{dateTime}</p>
      </div>
      <div>
        <p className="semi-bold message__title">Establishment</p>
        <p className=" message__info">{establishment}</p>
      </div>
      <div>
        <p className="semi-bold message__title">Date (from - to)</p>
        <p className=" message__info">
          {dateFrom} - {dateTo}
        </p>
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
        <p className="semi-bold message__title">Number</p>
        <p className=" message__info">{number}</p>
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
