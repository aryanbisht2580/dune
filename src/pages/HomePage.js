import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./HomePage.css"
const HomePage = () => {
  const navigate = useNavigate();

  const handleLevelSelect = (level) => {
    navigate(`/maze/${level}`);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 className='heading'>DUNE</h1>
      <div className='container'>

      <button onClick={() => handleLevelSelect('1')} className='btn'>Level 1</button>
      <button onClick={() => handleLevelSelect('2')} className='btn'>Level 2</button>
      <button onClick={() => handleLevelSelect('3')}className='btn'>Level 3</button>
      <button onClick={() => handleLevelSelect('4')}className='btn'>God Level</button>
      </div>
    </div>
  );
};

export default HomePage;
