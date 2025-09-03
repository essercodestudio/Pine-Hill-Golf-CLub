import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getGroupForScorer, updateScore } from '../services/supabaseMock.js';
import { useRealtimeScorecard } from '../hooks/useRealtime.js';
import Spinner from '../components/Spinner.jsx';
import Button from '../components/Button.jsx';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon.jsx';
import ChevronRightIcon from '../components/icons/ChevronRightIcon.jsx';
import PlusIcon from '../components/icons/PlusIcon.jsx';
import MinusIcon from '../components/icons/MinusIcon.jsx';

const ScorecardScreen = () => {
  const { accessCode } = useParams();
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentHole, setCurrentHole] = useState(1);
  const [localScores, setLocalScores] = useState({});

  const liveData = useRealtimeScorecard(accessCode, initialData);
  const data = liveData || initialData;

  useEffect(() => {
    const fetchGroupData = async () => {
      setLoading(true);
      const { data: fetchedData, error: apiError } = await getGroupForScorer(accessCode);
      if (apiError) {
        setError(apiError);
      } else if (fetchedData) {
        setInitialData(fetchedData);
        setCurrentHole(fetchedData.group.startHole);
        
        const scoresMap = {};
        fetchedData.group.players.forEach(p => {
          scoresMap[p.id] = {};
        });
        fetchedData.group.scores.forEach(s => {
          if(scoresMap[s.playerId]) {
            scoresMap[s.playerId][s.holeNumber] = s.strokes;
          }
        });
        setLocalScores(scoresMap);

      }
      setLoading(false);
    };
    fetchGroupData();
  }, [accessCode]);

  useEffect(() => {
    if (liveData) {
      const scoresMap = {};
      liveData.group.players.forEach(p => {
        scoresMap[p.id] = {};
      });
      liveData.group.scores.forEach(s => {
        if (scoresMap[s.playerId]) {
          scoresMap[s.playerId][s.holeNumber] = s.strokes;
        }
      });
      setLocalScores(scoresMap);
    }
  }, [liveData]);


  const handleScoreChange = async (playerId, hole, change) => {
    const currentStrokes = localScores[playerId]?.[hole] ?? data?.course.holes.find(h => h.holeNumber === hole)?.par ?? 0;
    const newStrokes = Math.max(1, currentStrokes + change);
    
    setLocalScores(prev => ({
      ...prev,
      [playerId]: { ...prev[playerId], [hole]: newStrokes }
    }));

    if (data?.group.id) {
        await updateScore(data.group.id, playerId, hole, newStrokes);
    }
  };
  
  const isCurrentHoleComplete = useMemo(() => {
    if (!data?.group?.players) return false;
    return data.group.players.every(p => {
        const score = localScores[p.id]?.[currentHole];
        return typeof score === 'number' && score > 0;
    });
  }, [data?.group.players, localScores, currentHole]);

  const changeHole = (direction) => {
    const newHole = currentHole + direction;
    if(newHole > 0 && newHole <= 18) {
      if(direction > 0 && !isCurrentHoleComplete) return; // Prevent skipping forward
      setCurrentHole(newHole);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-400 text-center">{error}</p>;
  if (!data) return <p className="text-gray-400 text-center">Nenhum dado disponível para este código de acesso.</p>;

  const { group, course } = data;
  const holeInfo = course.holes.find(h => h.holeNumber === currentHole);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-xl flex flex-col h-[calc(100vh-10rem)]">
        <div className="flex justify-between items-center pb-4 border-b border-gray-700">
            <Button onClick={() => navigate('/')} variant="secondary" size="sm" className="flex items-center">
                <ChevronLeftIcon className="h-5 w-5 mr-1"/> Início
            </Button>
            <h2 className="text-xl font-bold">{group.name} - {course.name}</h2>
            <div/>
        </div>

        {/* Hole Navigation */}
        <div className="flex items-center justify-between p-4 my-4 bg-gray-900 rounded-lg">
            <Button size="icon" onClick={() => changeHole(-1)} disabled={currentHole === 1}>
                <ChevronLeftIcon className="h-6 w-6"/>
            </Button>
            <div className="text-center">
                <p className="text-gray-400 text-sm">BURACO</p>
                <p className="text-4xl font-bold text-white">{currentHole}</p>
                <p className="text-gray-400">PAR {holeInfo?.par} &bull; SI {holeInfo?.strokeIndex || 'N/D'}</p>
            </div>
            <Button size="icon" onClick={() => changeHole(1)} disabled={currentHole === 18 || !isCurrentHoleComplete}>
                <ChevronRightIcon className="h-6 w-6"/>
            </Button>
        </div>
        
        {!isCurrentHoleComplete && currentHole < 18 && (
            <div className="text-center text-xs text-yellow-400 mb-4 px-2">
                Insira as pontuações de todos os jogadores para liberar o próximo buraco.
            </div>
        )}

        {/* Players Score Entry */}
        <div className="flex-grow overflow-y-auto space-y-3 pr-2">
            {group.players.map(player => {
                const score = localScores[player.id]?.[currentHole];
                return (
                    <div key={player.id} className="grid grid-cols-3 items-center p-3 bg-gray-700 rounded-lg">
                        <div className="col-span-1">
                            <p className="font-bold text-white truncate">{player.fullName}</p>
                            <p className="text-xs text-gray-400">HCP: {player.courseHandicap}</p>
                        </div>
                        <div className="col-span-2 flex items-center justify-end space-x-2">
                            <Button size="icon" variant="secondary" onClick={() => handleScoreChange(player.id, currentHole, -1)} disabled={score === 1}>
                                <MinusIcon className="h-6 w-6"/>
                            </Button>
                            <span className="text-3xl font-bold w-12 text-center text-green-400">{score ?? '-'}</span>
                             <Button size="icon" variant="secondary" onClick={() => handleScoreChange(player.id, currentHole, 1)}>
                                <PlusIcon className="h-6 w-6"/>
                            </Button>
                        </div>
                    </div>
                );
            })}
        </div>
        
        {/* Footer actions */}
        <div className="mt-auto pt-4 border-t border-gray-700">
             <Button className="w-full" disabled={!isCurrentHoleComplete}>
                 {currentHole === 18 && isCurrentHoleComplete ? 'Finalizar e Enviar Rodada' : 'Rodada em Andamento'}
             </Button>
        </div>
    </div>
  );
};

export default ScorecardScreen;