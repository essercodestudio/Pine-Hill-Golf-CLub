import React from 'react';

const mockLeaderboardData = [
  { playerId: 'p2', fullName: 'Scottie Scheffler', toPar: -5, through: 18, total: 67 },
  { playerId: 'p3', fullName: 'Rory McIlroy', toPar: -4, through: 18, total: 68 },
  { playerId: 'p1', fullName: 'Jordan Spieth', toPar: -2, through: 18, total: 70 },
  { playerId: 'p4', fullName: 'Jon Rahm', toPar: 1, through: 18, total: 73 },
];

const formatToPar = (score) => {
  if (score === 0) return 'E';
  return score > 0 ? `+${score}` : `${score}`;
};

const LeaderboardScreen = () => {
  return (
    <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold text-white mb-6">Live Leaderboard</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Pos</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Player</th>
              <th className="px-3 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">To Par</th>
              <th className="px-3 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">Thru</th>
              <th className="px-3 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">Total</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {mockLeaderboardData.map((player, index) => (
              <tr key={player.playerId} className="hover:bg-gray-700/50">
                <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-white">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{player.fullName}</td>
                <td className="px-3 py-4 whitespace-nowrap text-center text-lg font-bold text-green-400">
                  {formatToPar(player.toPar)}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-center text-sm text-gray-300">{player.through}</td>
                <td className="px-3 py-4 whitespace-nowrap text-center text-sm text-gray-300">{player.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardScreen;