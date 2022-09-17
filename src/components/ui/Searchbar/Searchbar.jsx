import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { BASE_URL } from "../../../constants/api";
import axios from "axios";

function Searchbar() {
  const [data, setData] = useState([]);
  const options = [];

  const url = BASE_URL + "establishments";
  let navigate = useNavigate();
  let id = 0;
  let establishmentPath = "";

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
    id = option.id;
    establishmentPath = "/establishment/" + id;
    options.push({ id: id, name: option.attributes.name });
  });

  const handleOnSelect = () => {
    let path = establishmentPath;
    navigate(path);
  };

  const handleOnSearch = (string, results) => {
    console.log(string, results);
  };

  return (
    <ReactSearchAutocomplete
      items={options}
      onSelect={handleOnSelect}
      onSearch={handleOnSearch}
    />
  );
}

export default Searchbar;

/* import { useState, useEffect } from "react";
import { Menu, MenuItem, Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-bootstrap-typeahead/css/Typeahead.bs5.css";
import Form from "react-bootstrap/Form";
import { BASE_URL } from "../../../constants/api";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Searchbar() {
  const [selected, setSelected] = useState([]);
  const handleChange = (selected) => setSelected(selected);
  const [data, setData] = useState([]);
  const options = [];

  const url = BASE_URL + "establishments";
  let id = 0;
  let establishmentUrl = "";

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
    id = option.id;
    establishmentUrl = BASE_URL + "establishment/" + id;
    options.push({ id: id, name: option.attributes.name });
  });

  let navigate = useNavigate();
  const routeChange = () => {
    let path = establishmentUrl;
    navigate(path);
  };

  return (

  );
}

export default Searchbar;

     <Form.Group className="home__search">
      <Typeahead
        id="basic-typeahead-single"
        className="searchbar"
        labelKey="name"
        onChange={handleChange}
        options={options}
        placeholder="Search establishments..."
        selected={selected}
        onSelect={routeChange}
      />
    </Form.Group> */
