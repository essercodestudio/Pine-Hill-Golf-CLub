import React, { useState } from 'react';
import { db } from '../data/mockDatabase.js';
import ManageCourses from '../components/admin/ManageCourses.jsx';
import ManageTournaments from '../components/admin/ManageTournaments.jsx';
import ManageGroups from '../components/admin/ManageGroups.jsx';
import Button from '../components/Button.jsx';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon.jsx';
import { useNavigate } from 'react-router-dom';

const AdminDashboardScreen = () => {
  const navigate = useNavigate();
  // Gerencia todo o estado do "banco de dados" localmente
  const [database, setDatabase] = useState(db);
  const [activeTab, setActiveTab] = useState('courses');
  
  const handleCreateCourse = (courseData, imageFile, holesData) => {
    const newCourse = {
      ...courseData,
      id: `c${Date.now()}`,
      aerialImageUrl: imageFile ? URL.createObjectURL(imageFile) : undefined,
    };
    
    const newHoles = holesData.map((hole, i) => ({
      id: `h${newCourse.id}${i+1}`,
      courseId: newCourse.id,
      holeNumber: i + 1,
      par: hole.par, 
      strokeIndex: 0, // Default SI
    }));

    setDatabase(prevDb => ({
        ...prevDb,
        courses: [...prevDb.courses, newCourse],
        holes: [...prevDb.holes, ...newHoles],
    }));
  };

  const handleCreateTeesForHole = (holeId, teeData) => {
    const newTee = { ...teeData, id: `t${Date.now()}`, holeId: holeId };
    setDatabase(prevDb => ({ ...prevDb, tees: [...prevDb.tees, newTee] }));
  };
  
  const handleCreateTournament = (tournamentData) => {
    const newTournament = { ...tournamentData, id: `t${Date.now()}` };
    setDatabase(prevDb => ({ ...prevDb, tournaments: [...prevDb.tournaments, newTournament] }));
  };

  const handleCreateGroup = (data) => {
      const accessCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      const newGroup = {
          id: `g${Date.now()}`,
          tournamentId: data.tournamentId,
          startHole: data.startHole,
          accessCode: accessCode,
      };
      
      const newGroupPlayersData = data.playerIds.map(playerId => ({
          id: `gp${Date.now()}${playerId}`,
          groupId: newGroup.id,
          playerId: playerId,
          isResponsible: playerId === data.responsiblePlayerId,
          teeId: data.playerTeeSelections[playerId],
      }));

      setDatabase(prevDb => ({
          ...prevDb,
          groups: [...prevDb.groups, newGroup],
          groupPlayers: [...prevDb.groupPlayers, ...newGroupPlayersData],
      }));

      return accessCode;
  };

  const TabButton = ({tabName, label}) => (
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
      <div className="flex items-center">
        <Button onClick={() => navigate('/')} variant="secondary" size="icon" className="mr-4">
          <ChevronLeftIcon className="h-6 w-6" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-white">Painel de Administração</h1>
          <p className="text-gray-400">Gerencie os dados do seu torneio.</p>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 border-b border-gray-700 pb-3">
        <TabButton tabName="courses" label="Gerenciar Campos" />
        <TabButton tabName="tournaments" label="Gerenciar Torneios" />
        <TabButton tabName="groups" label="Gerenciar Grupos" />
      </div>

      <div>
        {activeTab === 'courses' && (
          <ManageCourses
            courses={database.courses}
            holes={database.holes}
            tees={database.tees}
            onCreateCourse={handleCreateCourse}
            onCreateTeeForHole={handleCreateTeesForHole}
          />
        )}
        {activeTab === 'tournaments' && (
            <ManageTournaments
                tournaments={database.tournaments}
                courses={database.courses}
                onCreateTournament={handleCreateTournament}
            />
        )}
        {activeTab === 'groups' && (
            <ManageGroups
                tournaments={database.tournaments}
                players={database.players}
                groups={database.groups}
                groupPlayers={database.groupPlayers}
                holes={database.holes}
                tees={database.tees}
                onCreateGroup={handleCreateGroup}
            />
        )}
      </div>
    </div>
  );
};

export default AdminDashboardScreen;