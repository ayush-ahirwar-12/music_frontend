import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { GetSongOfUserApi } from "../apis/UserApi";
import BottomNav from "../components/BottomNav";
import "./home.css";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const [songs, setsongs] = useState([]);
  const [currentsongplaying, setcurrentsongplaying] = useState(null);

  const fetchSongOfUser = async () => {
    try {
      const res = await GetSongOfUserApi();
      console.log(res);
      
      if (res && res.data && res.data.songs) {
        setsongs(res.data.songs);

        
      }
    } catch (error) {
      console.log("Error fetching user's songs ->", error);
    }
  };

  const fetchAllSongs = async () => {
    try {
      const res = await axios.get("music-backend-weld.vercel.app/api/song");
      if (res && res.data && res.data.song) {
        setsongs(res.data.song);
        // console.log();
        
      }
    } catch (error) {
      console.log("Error fetching all songs ->", error);
    }
  };


  useEffect(() => {
    if (user) {
      fetchSongOfUser();
    } else {
      fetchAllSongs();
    }
  }, [user]);

  useEffect(()=>{
    console.log(songs);
    
  },[songs])

  return (
    <div className="home-container">
      <h1 className="page-title">Music list</h1>
      <div className="song-list">
        {songs.map((song, index) => (
          <div className="song-item" key={index}>
            <img
              src={song.coverImage}
              alt={`${song.title} thumbnail`}
              className="song-thumbnail"
            />
            <div className="song-info">
              <h2 className="song-title">{song.title}</h2>
              <p className="song-details">{song.releaseDate}</p>
              <p className="song-details">{song.artist}</p>
            </div>
            <button
              onClick={() => {
                if (currentsongplaying === song._id) {
                  setcurrentsongplaying(null);
                  return;
                }
                setcurrentsongplaying(song._id);
              }}
              className="play-button"
            >
              {currentsongplaying === song._id ? (
                <svg
                  className="play-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M6 5H8V19H6V5ZM16 5H18V19H16V5Z" />
                </svg>
              ) : (
                <svg className="play-icon" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
            {currentsongplaying === song._id && (
              <audio
                className="audio"
                playsInline
                autoPlay
                controls
                src={song.audioUrl}
              ></audio>
            )}
          </div>
        ))}
      </div>
      <BottomNav />
    </div>
  );
};

export default Home;
