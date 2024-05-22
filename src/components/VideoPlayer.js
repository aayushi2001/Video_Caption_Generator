import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const VideoPlayer = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [captionText, setCaptionText] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [captions, setCaptions] = useState([]);
  const videoRef = useRef(null);

  const handleAddCaption = () => {
    const newCaption = {
      text: captionText,
      time: parseFloat(timestamp),
    };
    setCaptions([...captions, newCaption]);
    setCaptionText('');
    setTimestamp('');
  };

  const handleVideoUrlChange = (e) => {
    setVideoUrl(e.target.value);
  };

  const handleCaptionTextChange = (e) => {
    setCaptionText(e.target.value);
  };

  const handleTimestampChange = (e) => {
    setTimestamp(e.target.value);
  };

  const getCurrentCaption = () => {
    if (!videoRef.current) return '';
    const currentTime = videoRef.current.currentTime;
    const currentCaption = captions.find(
      (caption) => Math.floor(caption.time) === Math.floor(currentTime)
    );
    return currentCaption ? currentCaption.text : '';
  };

  return (
    <div className="container mt-4">
      <h1>Video Captioner</h1>
      <div className="form-group">
        <label htmlFor="videoUrl" className="form-label">Video URL:</label>
        <input
          type="text"
          className="form-control"
          id="videoUrl"
          value={videoUrl}
          onChange={handleVideoUrlChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="captionText" className="form-label">Caption Text:</label>
        <input
          type="text"
          className="form-control"
          id="captionText"
          value={captionText}
          onChange={handleCaptionTextChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="timestamp" className="form-label">Timestamp (seconds):</label>
        <input
          type="text"
          className="form-control"
          id="timestamp"
          value={timestamp}
          onChange={handleTimestampChange}
        />
      </div>
      <button className="btn btn-primary mt-3" onClick={handleAddCaption}>Add Caption</button>

      {videoUrl && (
        <div className="video-container mt-4">
          <video
            ref={videoRef}
            src={videoUrl}
            controls
            className="video"
          />
          <div className="caption">{getCurrentCaption()}</div>
        </div>
      )}

      {captions.length > 0 && (
        <div className="caption-list mt-4">
          <h3>Captions</h3>
          <ul className="list-group">
            {captions.map((caption, index) => (
              <li key={index} className="list-group-item">
                <span>{caption.time}s:</span> {caption.text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
