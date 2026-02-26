import React, { useState, useEffect } from "react";
import styles from "./Section.module.css";
import Card from "../Card/Card";
import axios from "axios";

function Section({ title, apiUrl }) {
  const [albums, setAlbums] = useState([]);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((res) => setAlbums(res.data))
      .catch((err) => console.error(err));
  }, [apiUrl]);

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <button
          className={styles.toggleBtn}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? "Show all" : "Collapse"}
        </button>
      </div>
      {!collapsed && (
        <div className={styles.grid}>
          {albums.map((album) => (
            <Card key={album.id} data={album} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Section;