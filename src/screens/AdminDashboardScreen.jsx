import React, { useState } from 'react';
import ManageCourses from '../components/admin/ManageCourses.jsx';
import ManageTournaments from '../components/admin/ManageTournaments.jsx';
import ManageGroups from '../components/admin/ManageGroups.jsx';

const AdminDashboardScreen = () => {
  const [activeTab, setActiveTab] = useState('courses');

  const TabButton = ({ tabName, label }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
        activeTab === tabName
          ? 'bg-green-600 text-white'
          : 'text-gray-300 hover:bg-gray-700'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Painel do Administrador</h1>
        <p className="text-gray-400">Gerencie os dados do seu torneio.</p>
      </div>
      
      <div className="flex flex-wrap gap-2 border-b border-gray-700 pb-3">
        <TabButton tabName="courses" label="Gerenciar Campos" />
        <TabButton tabName="tournaments" label="Gerenciar Torneios" />
        <TabButton tabName="groups" label="Gerenciar Grupos" />
      </div>

      <div>
        {activeTab === 'courses' && <ManageCourses />}
        {activeTab === 'tournaments' && <ManageTournaments />}
        {activeTab === 'groups' && <ManageGroups />}
      </div>
    </div>
  );
};

export default AdminDashboardScreen;