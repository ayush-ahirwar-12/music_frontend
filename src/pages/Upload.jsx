import React, { useState } from "react";
import "./upload.css";
import BottomNav from "../components/BottomNav";
import { useSelector } from "react-redux";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const { user } = useSelector((state) => state.auth); // get logged-in user from redux
  console.log(user);
  

  const onFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;

    if (!f.type.startsWith("audio/")) {
      setMessage("Please select a valid audio file");
      setFile(null);
      return;
    }

    setMessage("");
    setFile(f);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Choose an audio file first");
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("audio", file);

      // choose API endpoint depending on user presence
      const url = user
        ? "music-backend-weld.vercel.app/api/userSong" //if user exists
        : "music-backend-weld.vercel.app/api/Allsong"; // if no user

      const headers = user?.token
        ? { Authorization: `Bearer ${user.token}` }
        : {};
      const res = await fetch(url, {
        method: "POST",
        body: formData,
        headers,
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Upload failed");
      }

      const data = await res.json();
      setMessage("Upload successful");
      setFile(null);
      document.getElementById("audio-input").value = "";
    } catch (err) {
      setMessage(err.message || "Upload error");
      console.log(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div className="upload-page">
        <form className="upload-box" onSubmit={onSubmit}>
          <label className="drop-area" htmlFor="audio-input">
            <input
              id="audio-input"
              type="file"
              accept="audio/*"
              onChange={onFileChange}
              hidden
            />
            <div className="icon">🎵</div>
            <div className="title">Select an audio file</div>
            <div className="subtitle">Only one file. MP3, WAV, M4A, etc.</div>
            <div className="file-name">
              {file ? file.name : "No file chosen"}
            </div>
          </label>

          <button className="btn" type="submit" disabled={uploading}>
            {uploading ? "Uploading..." : "Upload"}
          </button>

          {message && <div className="message">{message}</div>}
        </form>
      </div>

      <BottomNav />
    </>
  );
};

export default Upload;
