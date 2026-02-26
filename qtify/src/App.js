import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Section from './components/Section/Section';
import SongsSection from './components/SongsSection/SongsSection';
import FAQ from './components/FAQ/FAQ';
import SongPlayer from './components/SongPlayer/SongPlayer';
import FeedbackModal from './components/FeedbackModal/FeedbackModal';
import Footer from './components/Footer/Footer';

function App() {
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);

  return (
    <div className="App" style={{ paddingBottom: currentSong ? "90px" : "0" }}>
      <Navbar onFeedbackClick={() => setShowFeedback(true)} />
      <Hero />
      <Section
        title="Top Albums"
        apiUrl="https://qtify-backend.labs.crio.do/albums/top"
      />
      <Section
        title="New Albums"
        apiUrl="https://qtify-backend.labs.crio.do/albums/new"
      />
      <SongsSection onSongClick={setCurrentSong} />
      <FAQ />
      <Footer />
      {currentSong && <SongPlayer song={currentSong} />}
      {showFeedback && (
        <FeedbackModal onClose={() => setShowFeedback(false)} />
      )}
    </div>
  );
}

export default App;