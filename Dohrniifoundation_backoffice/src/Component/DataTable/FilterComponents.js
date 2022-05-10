import React, { Fragment } from "react";
import { FormControl, Image } from "react-bootstrap";
import search from "../../Assets/images/login/search.png";

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <React.Fragment>
    <FormControl
      type="search"
      className="search-input"
      placeholder="Search"
      aria-label="Search"
      value={filterText}
      onChange={onFilter}
      onClear={onClear}
    />
    <Image className="lessons-search-icon" src={search} />
  </React.Fragment>
);

export default FilterComponent;
