import React, { useState, useEffect } from 'react';
import { getTournamentLeaderboard, getCourse } from '../services/supabaseMock';
import { LeaderboardPlayer, RankingMode, Course } from '../types';
import { useRealtimeLeaderboard } from '../hooks/useRealtime';
import Spinner from '../components/Spinner';
import Button from '../components/Button';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon';
import PlayerDetailScreen from './PlayerDetailScreen';

interface LeaderboardScreenProps {
  tournamentId: string;
  onBack: () => void;
}

const formatToPar = (score: number) => {
  if (score === 0) return 'E';
  return score > 0 ? `+${score}` : `${score}`;
};

const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ tournamentId, onBack }) => {
  const [initialData, setInitialData] = useState<LeaderboardPlayer[]>([]);
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<RankingMode>('NET');
  const [selectedPlayer, setSelectedPlayer] = useState<LeaderboardPlayer | null>(null);

  const liveData = useRealtimeLeaderboard(tournamentId, initialData);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const leaderboardRes = await getTournamentLeaderboard(tournamentId);
        if (leaderboardRes.error) {
          setError(leaderboardRes.error);
        } else {
          setInitialData(leaderboardRes.data);
        }
        
        const courseRes = await getCourse('c1'); // Assuming course 'c1' for the tournament
        if (courseRes.error) {
            console.error(courseRes.error);
        } else {
            setCourse(courseRes.data);
        }

      } catch (e) {
        setError('Ocorreu um erro inesperado.');
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, [tournamentId]);
  
  const handlePlayerSelect = (player: LeaderboardPlayer) => {
      setSelectedPlayer(player);
  };
  
  const handleBackToLeaderboard = () => {
      setSelectedPlayer(null);
  };

  const sortedData = [...liveData].sort((a, b) => {
    const scoreA = viewMode === 'NET' ? a.toParNet : a.toParGross;
    const scoreB = viewMode === 'NET' ? b.toParNet : b.toParGross;
    return scoreA - scoreB;
  });

  if (loading) return <Spinner />;

  if (selectedPlayer && course) {
    return <PlayerDetailScreen player={selectedPlayer} course={course} onBack={handleBackToLeaderboard} />;
  }

  return (
    <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-xl">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center">
            <Button onClick={onBack} variant="secondary" size="icon" className="mr-4">
              <ChevronLeftIcon className="h-6 w-6" />
            </Button>
            <h1 className="text-3xl font-bold text-white">Leaderboard ao Vivo</h1>
        </div>
        <div className="flex bg-gray-700 rounded-lg p-1">
          <Button
            onClick={() => setViewMode('NET')}
            variant={viewMode === 'NET' ? 'primary' : 'secondary'}
            size="sm"
            className={viewMode === 'NET' ? '' : 'bg-transparent hover:bg-gray-600'}
          >
            NET
          </Button>
          <Button
            onClick={() => setViewMode('GROSS')}
            variant={viewMode === 'GROSS' ? 'primary' : 'secondary'}
            size="sm"
            className={viewMode === 'GROSS' ? '' : 'bg-transparent hover:bg-gray-600'}
          >
            GROSS
          </Button>
        </div>
      </div>

      {error && <p className="text-red-400 text-center">{error}</p>}
      
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-1/12">Pos</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-5/12">Jogador</th>
                <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider w-2/12">To Par</th>
                <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider w-2/12">Bur.</th>
                <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider w-2/12">Total</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {sortedData.map((player, index) => (
                <tr key={player.playerId} className="hover:bg-gray-700/50 cursor-pointer" onClick={() => handlePlayerSelect(player)}>
                  <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-white">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{player.fullName}</td>
                  <td className={`px-3 py-4 whitespace-nowrap text-center text-lg font-bold ${viewMode === 'NET' ? 'text-green-400' : 'text-blue-400'}`}>
                    {formatToPar(viewMode === 'NET' ? player.toParNet : player.toParGross)}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-center text-sm text-gray-300">{player.through}</td>
                  <td className="px-3 py-4 whitespace-nowrap text-center text-sm text-gray-300">{viewMode === 'NET' ? player.netTotal : player.grossTotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LeaderboardScreen;