import React, { useState } from 'react';
import Button from '../Button';

const mockPlayers = [
    { id: 'p1', fullName: 'Jordan Spieth' }, { id: 'p2', fullName: 'Scottie Scheffler' },
    { id: 'p3', fullName: 'Rory McIlroy' }, { id: 'p4', fullName: 'Jon Rahm' },
];
const mockTournaments = [
    { id: 't1', name: 'Pine Hill Open 2024' }
];

const ManageGroups = () => {
  const [selectedTournamentId, setSelectedTournamentId] = useState('');
  const [selectedPlayerIds, setSelectedPlayerIds] = useState({});

  const handlePlayerSelection = (playerId) => {
    setSelectedPlayerIds(prev => ({
      ...prev,
      [playerId]: !prev[playerId]
    }));
  };

  const handleCreateGroup = (e) => {
    e.preventDefault();
    const playerIds = Object.keys(selectedPlayerIds).filter(id => selectedPlayerIds[id]);
    if (!selectedTournamentId || playerIds.length === 0) {
       alert("Please select a tournament and at least one player.");
       return;
    }
    console.log('Creating group for tournament:', selectedTournamentId, 'with players:', playerIds);
    alert('Group created! Check the console for details.');
  };

  return (
    <div className="space-y-8">
      <div className="p-6 bg-gray-700/50 rounded-lg">
        <h3 className="text-xl font-bold text-green-400 mb-4">Assemble Player Groups</h3>
        <form onSubmit={handleCreateGroup} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">1. Select Tournament</label>
            <select value={selectedTournamentId} onChange={(e) => setSelectedTournamentId(e.target.value)} className="w-full sm:w-1/2 px-3 py-2 border border-gray-600 bg-gray-900 text-white rounded-md">
              <option value="">-- Select --</option>
              {mockTournaments.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
          {selectedTournamentId && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">2. Select Players for the Group</label>
              <div className="space-y-2 p-2 bg-gray-900/50 rounded-md">
                {mockPlayers.map(player => (
                  <div key={player.id} className="p-2 bg-gray-800 rounded">
                    <label className="flex items-center text-sm font-medium text-white">
                      <input type="checkbox" checked={!!selectedPlayerIds[player.id]} onChange={() => handlePlayerSelection(player.id)} className="h-4 w-4 bg-gray-700 border-gray-600 rounded text-green-600 focus:ring-green-500 mr-2"/>
                      {player.fullName}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
          <Button type="submit" disabled={!selectedTournamentId}>Create Group</Button>
        </form>
      </div>
    </div>
  );
};

export default ManageGroups;