import React, { useState, useEffect } from 'react';
import './MazeGame.css';
import maze1 from './level1';
import maze2 from './level2';
import maze3 from './level3';
import maze4 from './level4';
import { useNavigate } from 'react-router-dom';
const MazeGame = ({level}) => {
  const nav=useNavigate();
  let maze=[];
  if(level==1){
    maze=maze1;
  }
  else if(level==2){
    maze=maze2;
  }
  else if(level==3){
    maze=maze3
  }
  else{
    maze=maze4
  }

  const [playerPos, setPlayerPos] = useState({ x: 1, y: 1 });
  const [path, setPath] = useState([{ x: 1, y: 1 }]);
  const [shortestPath, setShortestPath] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(null);

  const handleKeyPress = (e) => {
    if (gameOver) return;

    const { x, y } = playerPos;
    let newX = x,
      newY = y;

    if (e.key === 'w') newX -= 1;
    else if (e.key === 's') newX += 1;
    else if (e.key === 'a') newY -= 1;
    else if (e.key === 'd') newY += 1;

    if (
      newX >= 0 &&
      newX < maze.length &&
      newY >= 0 &&
      newY < maze[0].length &&
      maze[newX][newY] !== 'X'
    ) {
      setPlayerPos({ x: newX, y: newY });
      setPath((prev) => [...prev, { x: newX, y: newY }]);
      if (maze[newX][newY] === 'E') {
        calculateScore();
        setGameOver(true);
      }
    }
  };

  const calculateScore = () => {
    const shortest = calculateShortestPath();
    setShortestPath(shortest);
    setScore(((shortest.length-1) / path.length)*100);
  };

  const calculateShortestPath = () => {
    const queue = [[{ x: 1, y: 1 }]];
    const visited = new Set();
    visited.add(`1-1`);

    while (queue.length > 0) {
      const currentPath = queue.shift();
      const { x, y } = currentPath[currentPath.length - 1];

      if (maze[x][y] === 'E') return currentPath;

      const directions = [
        { dx: -1, dy: 0 },
        { dx: 1, dy: 0 },
        { dx: 0, dy: -1 },
        { dx: 0, dy: 1 },
      ];

      for (const { dx, dy } of directions) {
        const nx = x + dx,
          ny = y + dy;
        if (
          nx >= 0 &&
          nx < maze.length &&
          ny >= 0 &&
          ny < maze[0].length &&
          maze[nx][ny] !== 'X' &&
          !visited.has(`${nx}-${ny}`)
        ) {
          visited.add(`${nx}-${ny}`);
          queue.push([...currentPath, { x: nx, y: ny }]);
        }
      }
    }
    return [];
  };

  const renderMatrix = (path) => {
    const matrix = maze.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        if (path.some(({ x, y }) => x === rowIndex && y === colIndex)) {
          if (cell === 'S' || cell === 'E') return cell;
          return '*'; // Mark path cells
        }
        return cell;
      })
    );

    return (
      <div className="maze">
        {matrix.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`cell ${
                  cell === 'X'
                    ? 'wall'
                    : cell === '*'
                    ? 'path'
                    : cell === 'S'
                    ? 'start'
                    : cell === 'E'
                    ? 'end'
                    : ''
                }`}
              >
                {cell === '*' ? '' : cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const resetGame = () => {
    setPlayerPos({ x: 1, y: 1 });
    setPath([{ x: 1, y: 1 }]);
    setShortestPath([]);
    setGameOver(false);
    setScore(null);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  });

  return (
    <div style={{display:'flex',flexDirection:"column",alignItems:"center"}}>
        
      <div className="maze">
        {maze.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`cell ${
                  playerPos.x === rowIndex && playerPos.y === colIndex
                    ? 'player'
                    : cell === 'X'
                    ? 'wall'
                    : cell === 'E'
                    ? 'end'
                    : ''
                }`}
              ></div>
            ))}
          </div>
        ))}
      </div>
      {gameOver && (
        <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
          <h2>Game Over!</h2>
          <h3>Score: {score.toFixed(2)} %</h3>
          <h4>User Path:</h4>
          {renderMatrix(path)}
          <h4>Shortest Path:</h4>
          {renderMatrix(shortestPath)}
          
        </div>
        
      )}
      <button className='btn' onClick={resetGame} >Re-Start</button>
      
    </div>
  );
};

export default MazeGame;
