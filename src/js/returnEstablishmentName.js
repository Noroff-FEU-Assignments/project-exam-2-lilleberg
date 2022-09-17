import axios from "axios";
import { BASE_URL } from "../constants/api";

export default function returnEstablishmentName(id) {
  const url = BASE_URL + "establishments";

  (async function () {
    try {
      const response = await axios.get(url);
      console.log(response.data);
      if (response.status === 200) {
        const establishments = response.data.data;
        console.log(establishments);

        const elem = establishments.find((item) => item.id === id);
        console.log(elem);
        return elem;
      }
    } catch (error) {
      console.log(error);
    }
  })();
}
