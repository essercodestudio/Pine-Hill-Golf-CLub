import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTournamentLeaderboard, getCourse } from '../services/supabaseMock.js';
import { useRealtimeLeaderboard } from '../hooks/useRealtime.js';
import Spinner from '../components/Spinner.jsx';
import Button from '../components/Button.jsx';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon.jsx';

const formatToPar = (score) => {
  if (score === 0) return 'E';
  return score > 0 ? `+${score}` : `${score}`;
};

const LeaderboardScreen = () => {
  const { tournamentId } = useParams();
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState([]);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('NET');

  const liveData = useRealtimeLeaderboard(tournamentId, initialData);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      setError(null);
      try {
        const leaderboardRes = await getTournamentLeaderboard(tournamentId);
        if (leaderboardRes.error) {
          setError(leaderboardRes.error);
        } else {
          setInitialData(leaderboardRes.data);
        }
        
        const courseRes = await getCourse('c1'); // Assumindo o campo 'c1' para este torneio
        if (courseRes.error) {
            console.error(courseRes.error);
        } else {
            setCourse(courseRes.data);
        }

      } catch (e) {
        setError('Ocorreu um erro inesperado ao carregar o leaderboard.');
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, [tournamentId]);
  
  const handlePlayerSelect = (player) => {
      if(course) {
        navigate(`/leaderboard/${tournamentId}/player/${player.playerId}`, { state: { player, course } });
      } else {
        setError("Não foi possível carregar os detalhes do campo para ver o scorecard do jogador.")
      }
  };
  
  const sortedData = [...liveData].sort((a, b) => {
    const scoreA = viewMode === 'NET' ? a.toParNet : a.toParGross;
    const scoreB = viewMode === 'NET' ? b.toParNet : b.toParGross;
    return scoreA - scoreB;
  });

  if (loading) return <Spinner />;

  return (
    <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-xl">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center">
            <Button onClick={() => navigate('/')} variant="secondary" size="icon" className="mr-4">
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

      {error && <p className="text-red-400 text-center py-4">{error}</p>}
      
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