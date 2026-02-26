import React from "react";
import styles from "./Card.module.css";
import { Chip } from "@mui/material";

function Card({ data, isSong }) {
  const chipLabel = isSong
    ? `${data.likes} Likes`
    : `${data.follows} Follows`;

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={data.image} alt={data.title} className={styles.image} />
        <div className={styles.chipContainer}>
          <Chip
            label={chipLabel}
            size="small"
            sx={{
              backgroundColor: "#000000",
              color: "#ffffff",
              fontFamily: "Poppins",
              fontSize: "12px",
              height: "24px",
              borderRadius: "20px",
            }}
          />
        </div>
      </div>
      <p className={styles.title}>{data.title}</p>
    </div>
  );
}

export default Card;