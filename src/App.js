import React from 'react';
import './App.css';
import PhotosList from './features/photos/PhotosList';

function App() {
  return (
    <div className="App">
      <header><h1>Photos App</h1></header>
      <PhotosList />
      <footer>&copy; 2022</footer>
    </div>
  );
}

export default App;
