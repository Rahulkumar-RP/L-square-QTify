import React, { useState, useEffect, useRef } from "react";
import styles from "./Search.module.css";
import { ReactComponent as SearchIcon } from "../../assets/search-icon.svg";
import axios from "axios";

function Search({ placeholder }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (query.trim().length < 1) {
      setResults([]);
      setShowDropdown(false);
      return;
    }
    const fetchData = async () => {
      try {
        const [albumsRes, songsRes] = await Promise.all([
          axios.get("https://qtify-backend.labs.crio.do/albums/top"),
          axios.get("https://qtify-backend.labs.crio.do/songs"),
        ]);
        const allItems = [...albumsRes.data, ...songsRes.data];
        const filtered = allItems.filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered.slice(0, 8));
        setShowDropdown(true);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} style={{ position: "relative" }}>
      <div className={styles.wrapper}>
        <input
          name="album"
          className={styles.search}
          placeholder={placeholder || "Search a album of your choice"}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setShowDropdown(true)}
          autoComplete="off"
        />
        <button className={styles.searchButton} type="button">
          <SearchIcon />
        </button>
      </div>
      {showDropdown && results.length > 0 && (
        <div className={styles.dropdown}>
          {results.map((item) => (
            <div
              key={item.id}
              className={styles.dropdownItem}
              onClick={() => {
                setQuery(item.title);
                setShowDropdown(false);
              }}
            >
              <img src={item.image} alt={item.title} className={styles.itemImage} />
              <div className={styles.itemInfo}>
                <span className={styles.itemTitle}>{item.title}</span>
                {item.artists && (
                  <span className={styles.itemArtists}>
                    {item.artists.map((a) => a.name).join(", ").slice(0, 40)}...
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;