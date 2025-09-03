import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider.jsx';
import Button from '../components/Button.jsx';

const MainScreen = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');
  
  const handleStartScoring = useCallback(() => {
    if (accessCode.trim()) {
        setError('');
        navigate(`/scorecard/${accessCode.trim()}`);
    } else {
        setError('Por favor, insira um código de acesso válido.');
    }
  }, [accessCode, navigate]);

  return (
    <div className="space-y-8">
      <div className="p-6 bg-gray-800 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-white">Bem-vindo, {user?.fullName}!</h1>
        <p className="text-gray-400 mt-2">O que você gostaria de fazer hoje?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {user?.role === 'player' && (
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-green-400 mb-4">Marcar Pontuação</h2>
            <p className="text-gray-300 mb-4">Insira o código de acesso fornecido pelo administrador para começar a marcar os pontos do seu grupo.</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Insira o Código de Acesso do Grupo"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                className="flex-grow px-3 py-2 border border-gray-700 bg-gray-900 text-white placeholder-gray-500 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
              <Button onClick={handleStartScoring} className="w-full sm:w-auto">Iniciar Marcação</Button>
            </div>
            {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}
          </div>
        )}

        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-green-400 mb-4">Ver Leaderboard</h2>
          <p className="text-gray-300 mb-4">Confira o leaderboard em tempo real do torneio principal.</p>
          <Button onClick={() => navigate('/leaderboard/t1')} className="w-full sm:w-auto">Ver Leaderboard</Button>
        </div>

        {user?.role === 'admin' && (
             <div className="p-6 bg-gray-800 rounded-lg shadow-lg md:col-span-2">
                <h2 className="text-2xl font-bold text-green-400 mb-4">Painel do Administrador</h2>
                <p className="text-gray-300 mb-4">Gerencie campos, torneios e grupos para os seus eventos.</p>
                 <div className="flex space-x-4">
                  <Button onClick={() => navigate('/admin')}>Acessar Painel</Button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default MainScreen;