import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button.jsx';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon.jsx';

const AdminDashboardScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-xl space-y-6">
      <div className="flex items-center">
        <Button onClick={() => navigate('/')} variant="secondary" size="icon" className="mr-4">
          <ChevronLeftIcon className="h-6 w-6" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-white">Painel de Administração</h1>
          <p className="text-gray-400">Gerencie os dados do seu torneio.</p>
        </div>
      </div>
      
      <div className="text-center py-16">
        <p className="text-gray-400">As ferramentas de gerenciamento de torneios, campos e grupos serão implementadas aqui.</p>
        <p className="text-gray-500 text-sm mt-2">Você conectará esta tela às suas rotas de API de administração.</p>
      </div>
    </div>
  );
};

export default AdminDashboardScreen;