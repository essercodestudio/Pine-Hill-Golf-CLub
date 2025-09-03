import React, { useState } from 'react';
import Button from '../components/Button.jsx';

const mockScorecardData = {
  groupName: 'Aces',
  courseName: 'Pebble Beach',
  players: [
    { id: 'p1', fullName: 'Jordan Spieth', hcp: 2 },
    { id: 'p2', fullName: 'Scottie Scheffler', hcp: 1 },
    { id: 'p3', fullName: 'Rory McIlroy', hcp: 1 },
    { id: 'p4', fullName: 'Jon Rahm', hcp: 1 },
  ],
  holes: Array(18).fill(null).map((_, i) => ({ holeNumber: i + 1, par: 4, strokeIndex: i + 1 })),
};


const ScorecardScreen = () => {
  const [currentHole, setCurrentHole] = useState(1);
  const holeInfo = mockScorecardData.holes.find(h => h.holeNumber === currentHole);
  
  const [scores, setScores] = useState({});

  const handleScoreChange = (playerId, change) => {
    setScores(prevScores => {
      const playerScores = prevScores[playerId] || {};
      const currentScore = playerScores[currentHole] || holeInfo.par;
      const newScore = Math.max(1, currentScore + change);
      return {
        ...prevScores,
        [playerId]: {
          ...playerScores,
          [currentHole]: newScore,
        }
      };
    });
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-xl flex flex-col h-[calc(100vh-12rem)]">
        <div className="flex justify-between items-center pb-4 border-b border-gray-700">
            <h2 className="text-xl font-bold">{mockScorecardData.groupName} - {mockScorecardData.courseName}</h2>
        </div>

        {/* Hole Navigation */}
        <div className="flex items-center justify-between p-4 my-4 bg-gray-900 rounded-lg">
            <Button size="icon" onClick={() => setCurrentHole(h => Math.max(1, h - 1))} disabled={currentHole === 1}>
                &lt;
            </Button>
            <div className="text-center">
                <p className="text-gray-400 text-sm">BURACO</p>
                <p className="text-4xl font-bold text-white">{currentHole}</p>
                <p className="text-gray-400">PAR {holeInfo?.par} &bull; SI {holeInfo?.strokeIndex}</p>
            </div>
            <Button size="icon" onClick={() => setCurrentHole(h => Math.min(18, h + 1))} disabled={currentHole === 18}>
                &gt;
            </Button>
        </div>
        
        {/* Players Score Entry */}
        <div className="flex-grow overflow-y-auto space-y-3 pr-2">
            {mockScorecardData.players.map(player => (
                <div key={player.id} className="grid grid-cols-3 items-center p-3 bg-gray-700 rounded-lg">
                    <div className="col-span-1">
                        <p className="font-bold text-white truncate">{player.fullName}</p>
                        <p className="text-xs text-gray-400">HCP: {player.hcp}</p>
                    </div>
                    <div className="col-span-2 flex items-center justify-end space-x-2">
                        <Button size="icon" variant="secondary" onClick={() => handleScoreChange(player.id, -1)}>-</Button>
                        <span className="text-3xl font-bold w-12 text-center text-green-400">{scores[player.id]?.[currentHole] ?? '-'}</span>
                         <Button size="icon" variant="secondary" onClick={() => handleScoreChange(player.id, 1)}>+</Button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default ScorecardScreen;