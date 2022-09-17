export default function getDate(addDay = 0) {
  let current = new Date();

  let day = current.getDate();
  let month = current.getMonth() + 1;
  let year = current.getFullYear();

  let date = `${year}-${("0" + month).slice(-2)}-${("0" + (day + addDay)).slice(
    -2
  )}`;

  return date;
}
