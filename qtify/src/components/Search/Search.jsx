import React, { useState } from "react";
import styles from "./Search.module.css";
import { ReactComponent as SearchIcon } from "../../assets/search-icon.svg";

function Search({ searchData, placeholder }) {
  const [query, setQuery] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div style={{ position: "relative" }}>
      <form className={styles.wrapper} onSubmit={onSubmit}>
        <input
          name="album"
          className={styles.search}
          placeholder={placeholder || "Search a album of your choice"}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className={styles.searchButton} type="submit">
          <SearchIcon />
        </button>
      </form>
    </div>
  );
}

export default Search;