import React from 'react';
import { Form, FormControl } from 'react-bootstrap';

function SearchBar() {
  return (
    <div className="container px-3 mb-4">
      <Form className="d-flex mt-3 justify-content-start">
        <FormControl
          type="search"
          placeholder="Поиск..."
          className="mr-2 form-control-sm"
          style={{ width: '10%' }}
          aria-label="Search"
        />
        <button className="btn btn-outline-primary">
            <i className="fas fa-search"></i>
        </button>
      </Form>
    </div>
  );
}

export default SearchBar;
