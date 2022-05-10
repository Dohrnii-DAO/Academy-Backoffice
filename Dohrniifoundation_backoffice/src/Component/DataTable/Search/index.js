import react, { useState } from "react";

const Search = ({ onSearch }) => {
  const [search, setSearch] = useState("");
  const onInputChange = (value) => {
    setSearch(value);
    onSearch(value);
  };
  return (
    <>
      <input
        type="text"
        className="search-input"
        placeholder="Search"
        aria-label="Search"
        value={search}
        onChange={(e) => onInputChange(e.target.value)}
      />
    </>
  );
};
export default Search;
