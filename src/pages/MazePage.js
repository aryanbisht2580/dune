import React, { useState, useEffect } from 'react';
import MazeGame from '../components/MazeGame.js';
import { useNavigate, useParams } from 'react-router-dom';

const MazePage = () => {
    const params=useParams();
    const level=params.level;
    const nav=useNavigate();
  return (
    <div style={{justifyContent:"center",alignItems:"center",display:"flex",flexDirection:"column"}}>
      <h1 style={{textAlign:"center"}}>Level - {level==4?"God":level}</h1>
      <MazeGame level={level} />
      
      <button className='btn' onClick={()=>nav("/")} >Quit</button>

    </div>
  );
};

export default MazePage;
