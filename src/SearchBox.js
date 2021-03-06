import { useState } from "react";
import { Button, Form, FormGroup, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './SearchBox.css'

/** Search box.
 *
 * is passed a function to determine  the type of search
 */
function SearchBox({ searchInput }) {
  const [input, setInput] = useState("");

  const handleChange = e => {
    const { value } = e.target;
    setInput(value)
  }

  // search with input as param or no param if nothing is passed.
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(input)
    searchInput(input.trim() || undefined);
  }


  return (
    <div className="SearchBox">
      <Form className="SearchBox-form" onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            name="input"
            id="search-input"
            type="text"
            onChange={handleChange}
            value={input}
            // required
          />
        </FormGroup>
        <Button className="SearchBox-submit" color="primary">Search</Button>
      </Form>
    </div>
  );
}

export default SearchBox;