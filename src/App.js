import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MazePage from './pages/MazePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/maze/:level" element={<MazePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
