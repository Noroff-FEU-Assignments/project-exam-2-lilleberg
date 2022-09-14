export default function renderEstablishmentType(
  establishmentType,
  className = ""
) {
  switch (establishmentType) {
    case "bedAndBreakfast":
      return <p className={className}>Bed and Breakfast</p>;
    case "hotel":
      return <p className={className}>Hotel</p>;
    case "guesthouse":
      return <p className={className}>Guesthouse</p>;
    default:
      return null;
  }
}
