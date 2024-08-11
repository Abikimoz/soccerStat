import React from 'react';
import { Form, FormControl } from 'react-bootstrap';

export const SearchBar = ({ onSearchChange }) => {
  const handleInputChange = (event) => {
    onSearchChange(event.target.value);
  };

  return (
    <div className="container px-0 mb-4">
      <Form className="d-flex mt-3 justify-content-start">
        <div className="input-group" style={{ width: '20%', minWidth: '200px' }}>
          <FormControl
            type="search"
            placeholder="Поиск"
            className="form-control-sm rounded-start" 
            aria-label="Search"
            onChange={handleInputChange}
          />
          <button className="btn btn-outline-primary rounded-end">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </Form>
    </div>
  );
}
