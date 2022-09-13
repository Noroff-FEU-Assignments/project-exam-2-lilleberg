import { useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-bootstrap-typeahead/css/Typeahead.bs5.css";
import Form from "react-bootstrap/Form";

function Searchbar() {
  const [selected, setSelected] = useState([]);
  const options = ["hello", "goodbye", "fart", "thanks"];
  const handleChange = (selected) => setSelected(selected);
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
