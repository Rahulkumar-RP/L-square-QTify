import React, { useState, useEffect } from "react";
import styles from "./SongsSection.module.css";
import Card from "../Card/Card";
import Carousel from "../Carousel/Carousel";
import axios from "axios";
import { Tabs, Tab } from "@mui/material";

function SongsSection() {
  const [songs, setSongs] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedTab, setSelectedTab] = useState("all");

  useEffect(() => {
    axios.get("https://qtify-backend.labs.crio.do/songs")
      .then((res) => setSongs(res.data))
      .catch((err) => console.error(err));

    axios.get("https://qtify-backend.labs.crio.do/genres")
      .then((res) => setGenres(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredSongs = selectedTab === "all"
    ? songs
    : songs.filter((song) => song.genre.key === selectedTab);

  const cards = filteredSongs.map((song) => (
    <Card key={song.id} data={song} isSong={true} />
  ));

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Songs</h2>
      </div>
      <div className={styles.tabsContainer}>
        <Tabs
          value={selectedTab}
          onChange={(e, newValue) => setSelectedTab(newValue)}
          classes={{
            root: styles.tabsRoot,
            indicator: styles.tabIndicator,
          }}
        >
          <Tab
            label="All"
            value="all"
            classes={{
              root: styles.tabRoot,
              selected: styles.tabSelected,
            }}
          />
          {genres.map((genre) => (
            <Tab
              key={genre.key}
              label={genre.label}
              value={genre.key}
              classes={{
                root: styles.tabRoot,
                selected: styles.tabSelected,
              }}
            />
          ))}
        </Tabs>
      </div>
      <Carousel>{cards}</Carousel>
    </div>
  );
}

export default SongsSection;