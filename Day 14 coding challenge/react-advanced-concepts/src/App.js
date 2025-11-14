import React from 'react';
import LazyLoadingDemo from './components/Challenge1/LazyLoadingDemo';
import PureComponentDemo from './components/Challenge2/PureComponentDemo';
import ErrorBoundaryDemo from './components/Challenge3/ErrorBoundaryDemo';
import PortalsDemo from './components/Challenge4/PortalsDemo';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">React Advanced Concepts - Day 14</span>
        </div>
      </nav>

      <div className="container-fluid">
        <LazyLoadingDemo />
        <hr className="my-5" />
        
        <PureComponentDemo />
        <hr className="my-5" />
        
        <ErrorBoundaryDemo />
        <hr className="my-5" />
        
        <PortalsDemo />
      </div>

      <footer className="bg-dark text-white text-center py-3 mt-5">
        <p className="mb-0">React Advanced Concepts © 2025</p>
      </footer>
    </div>
  );
}

export default App;