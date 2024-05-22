import React from 'react';
import VideoPlayer from '../src/components/VideoPlayer';
import './App.css';
import { createRoot } from 'react-dom/client';

function App() {
  return (
    <div className="App">
      <VideoPlayer />
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

export default App;