import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-bootstrap-typeahead/css/Typeahead.bs5.css";
import Form from "react-bootstrap/Form";
import { BASE_URL } from "../../../constants/api";
import axios from "axios";
import { Typeahead } from "react-bootstrap-typeahead";

function Searchbar() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const options = [];

  const url = BASE_URL + "establishments";
  let navigate = useNavigate();

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(url);

        if (response.status === 200) setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  data.forEach((option) => {
    options.push({ id: option.id, name: option.attributes.name });
  });

  const handleChange = (selected) => {
    setSelected(selected);

    if (selected) {
      let id = 0;
      selected.forEach((item) => (id = item.id));

      const path = "establishment/" + id;
      navigate(path);
    } else {
      navigate("/");
    }
  };

  return (
    <Form.Group className="home__search">
      <Typeahead
        id="basic-typeahead-single"
        className="searchbar"
        labelKey="name"
        onChange={handleChange}
        options={options}
        placeholder="Search establishments..."
        selected={selected}
      />
    </Form.Group>
  );
}

export default Searchbar;
