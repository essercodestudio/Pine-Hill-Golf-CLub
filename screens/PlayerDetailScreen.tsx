import React from 'react';
import { LeaderboardPlayer, Course, Hole, Score } from '../types';
import Button from '../components/Button';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon';

interface PlayerDetailScreenProps {
  player: LeaderboardPlayer;
  course: Course;
  onBack: () => void;
}

const getScoreStyle = (strokes: number, par: number) => {
  if (strokes === 0) return { text: '-', color: 'text-gray-400', bg: 'bg-gray-700/50' };
  const diff = strokes - par;
  if (strokes === 1) return { text: 'Ace!', color: 'text-yellow-300', bg: 'bg-yellow-500/20' };
  if (diff <= -2) return { text: 'Eagle', color: 'text-green-300', bg: 'bg-green-500/20' };
  if (diff === -1) return { text: 'Birdie', color: 'text-green-400', bg: 'bg-green-500/20' };
  if (diff === 0) return { text: 'Par', color: 'text-white', bg: 'bg-gray-700' };
  if (diff === 1) return { text: 'Bogey', color: 'text-red-400', bg: 'bg-red-500/20' };
  if (diff >= 2) return { text: 'D. Bogey+', color: 'text-red-300', bg: 'bg-red-500/20' };
  return { text: '-', color: 'text-gray-400', bg: 'bg-gray-700/50' };
};

const PlayerDetailScreen: React.FC<PlayerDetailScreenProps> = ({ player, course, onBack }) => {

  const getPlayerScoreForHole = (holeNumber: number): Score | undefined => {
      return player.scores.find(s => s.holeNumber === holeNumber);
  }

  return (
    <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-xl">
      <div className="flex items-center mb-6">
        <Button onClick={onBack} variant="secondary" size="icon" className="mr-4">
          <ChevronLeftIcon className="h-6 w-6" />
        </Button>
        <div>
            <h1 className="text-3xl font-bold text-white">{player.fullName}</h1>
            <p className="text-gray-400">Desempenho no Torneio</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {course.holes.map((hole: Hole) => {
          const score = getPlayerScoreForHole(hole.holeNumber);
          const strokes = score?.strokes ?? 0;
          const style = getScoreStyle(strokes, hole.par);

          let netStrokes = null;
          if (strokes > 0 && hole.strokeIndex && player.courseHandicap > 0) {
            netStrokes = strokes;
            if (player.courseHandicap >= hole.strokeIndex) {
              netStrokes -= 1;
            }
          }
          
          return (
            <div key={hole.holeNumber} className={`rounded-lg p-3 text-center flex flex-col justify-between ${style.bg}`}>
              <div>
                <p className="text-xs text-gray-400">Buraco {hole.holeNumber}</p>
                <p className="font-bold text-4xl text-white my-1">{strokes || '-'}</p>
                <p className={`font-bold text-sm ${style.color}`}>{style.text}</p>
              </div>
              <div className="mt-2 text-xs text-gray-300 border-t border-gray-600 pt-2">
                <span>Par {hole.par}</span>
                {netStrokes !== null && <span className="ml-2 font-semibold">Net {netStrokes}</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayerDetailScreen;
