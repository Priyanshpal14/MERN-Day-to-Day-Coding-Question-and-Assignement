// src/App.js
import React from 'react';
import OfflineIndicator from '../../pwa-app/src/components/OfflineIndicator';
import './App.css';

function App() {
  return (
    <div className="App">
      <OfflineIndicator />
      <header className="App-header">
        <h1>My PWA Application</h1>
        <p>This app works offline!</p>
        <div className="features">
          <h2>PWA Features:</h2>
          <ul>
            <li>✅ Service Worker enabled</li>
            <li>✅ Offline support</li>
            <li>✅ Installable on devices</li>
            <li>✅ Fast loading with caching</li>
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;