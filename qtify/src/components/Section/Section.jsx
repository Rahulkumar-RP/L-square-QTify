import React, { useState, useEffect } from "react";
import styles from "./Section.module.css";
import Card from "../Card/Card";
import Carousel from "../Carousel/Carousel";
import axios from "axios";

function Section({ title, apiUrl }) {
  const [albums, setAlbums] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((res) => setAlbums(res.data))
      .catch((err) => console.error(err));
  }, [apiUrl]);

  const cards = albums.map((album) => (
    <Card key={album.id} data={album} />
  ));

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <button
          className={styles.toggleBtn}
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Collapse" : "Show all"}
        </button>
      </div>
      {showAll ? (
        <div className={styles.grid}>{cards}</div>
      ) : (
        <Carousel>{cards}</Carousel>
      )}
    </div>
  );
}

export default Section;