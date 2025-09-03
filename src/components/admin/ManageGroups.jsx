import React, { useState } from 'react';
import Button from '../Button.jsx';

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
  const [scorerPlayerId, setScorerPlayerId] = useState('');
  const [startTee, setStartTee] = useState(1);

  const handlePlayerSelection = (playerId) => {
    setSelectedPlayerIds(prev => {
      const newSelection = { ...prev };
      if (newSelection[playerId]) {
          delete newSelection[playerId];
          if (scorerPlayerId === playerId) {
            setScorerPlayerId('');
          }
      } else {
          newSelection[playerId] = true;
      }
      return newSelection;
    });
  };

  const handleCreateGroup = (e) => {
    e.preventDefault();
    const playerIds = Object.keys(selectedPlayerIds).filter(id => selectedPlayerIds[id]);
    if (!selectedTournamentId || playerIds.length === 0 || !scorerPlayerId) {
       alert("Por favor, selecione um torneio, pelo menos um jogador e designe um marcador.");
       return;
    }
    console.log('Creating group for tournament:', selectedTournamentId, {
      players: playerIds,
      scorer: scorerPlayerId,
      startTee: startTee
    });
    alert('Grupo criado! Verifique a consola para mais detalhes.');
  };

  return (
    <div className="space-y-8">
      <div className="p-6 bg-gray-700/50 rounded-lg">
        <h3 className="text-xl font-bold text-green-400 mb-4">Montar Grupos de Jogadores</h3>
        <form onSubmit={handleCreateGroup} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">1. Selecione o Torneio</label>
            <select value={selectedTournamentId} onChange={(e) => setSelectedTournamentId(e.target.value)} className="w-full sm:w-1/2 px-3 py-2 border border-gray-600 bg-gray-900 text-white rounded-md" required>
              <option value="">-- Selecione --</option>
              {mockTournaments.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
          
          {selectedTournamentId && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">2. Tee de Saída</label>
                <input type="number" value={startTee} onChange={e => setStartTee(parseInt(e.target.value))} min="1" max="18" className="w-24 px-3 py-2 border border-gray-600 bg-gray-900 text-white rounded-md" required/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">3. Selecione os Jogadores e o Marcador</label>
                <div className="space-y-2 p-2 bg-gray-900/50 rounded-md">
                  {mockPlayers.map(player => (
                    <div key={player.id} className="p-2 bg-gray-800 rounded flex items-center justify-between">
                      <label className="flex items-center text-sm font-medium text-white">
                        <input type="checkbox" checked={!!selectedPlayerIds[player.id]} onChange={() => handlePlayerSelection(player.id)} className="h-4 w-4 bg-gray-700 border-gray-600 rounded text-green-600 focus:ring-green-500 mr-2"/>
                        {player.fullName}
                      </label>
                      <label className="text-xs text-gray-300 flex items-center">
                        <input type="radio" name="scorer" checked={scorerPlayerId === player.id} onChange={() => setScorerPlayerId(player.id)} disabled={!selectedPlayerIds[player.id]} className="h-4 w-4 bg-gray-700 border-gray-600 text-green-600 focus:ring-green-500 mr-1"/>
                        Marcador
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <Button type="submit" disabled={!selectedTournamentId}>Criar Grupo</Button>
        </form>
      </div>
    </div>
  );
};

export default ManageGroups;