import React from 'react';
import './App.css';
import PhotosList from './features/photos/PhotosList';
import { Route, Routes } from "react-router-dom";
import SinglePhoto from './features/photos/SinglePhoto';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PhotosList />}></Route>
        <Route path="/:photoId" element={<SinglePhoto />}></Route>
      </Routes>
    </div>
  );
}

export default App;
