import React, { useState, useRef, useEffect } from "react";
import styles from "./SongPlayer.module.css";

function SongPlayer({ song }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  }, [song]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSeek = (e) => {
    if (!audioRef.current || !duration) return;
    const newTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  if (!song) return null;

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className={styles.player}>
      {song.demoSong && (
        <audio
          ref={audioRef}
          src={song.demoSong}
          onTimeUpdate={() => {
            if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
          }}
          onLoadedMetadata={() => {
            if (audioRef.current) setDuration(audioRef.current.duration);
          }}
          onEnded={() => setIsPlaying(false)}
        />
      )}

      {/* Song Info */}
      <div className={styles.songInfo}>
        <img src={song.image} alt={song.title} className={styles.thumb} />
        <div className={styles.songText}>
          <p className={styles.songTitle}>{song.title}</p>
          <p className={styles.albumName}>{song.album?.title || "Album name"}</p>
        </div>
      </div>

      {/* Controls + Progress */}
      <div className={styles.controlsRow}>
        <button className={styles.playBtn} onClick={togglePlay}>
          {isPlaying ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="black">
              <rect x="6" y="4" width="4" height="16" rx="1"/>
              <rect x="14" y="4" width="4" height="16" rx="1"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="black">
              <path d="M5 3l14 9-14 9V3z"/>
            </svg>
          )}
        </button>
        <span className={styles.time}>{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeek}
          className={styles.progressBar}
        />
        <span className={styles.time}>{formatTime(duration)}</span>
      </div>
    </div>
  );
}

export default SongPlayer;