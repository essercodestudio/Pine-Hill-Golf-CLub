import React, { useState } from 'react';
import { db, AdminCourse, AdminHole, AdminTournament, AdminPlayer, AdminGroup, AdminGroupPlayer, AdminTee } from '../data/mockDatabase';
import ManageCourses from '../components/admin/ManageCourses';
import ManageTournaments from '../components/admin/ManageTournaments';
import ManageGroups from '../components/admin/ManageGroups';
import Button from '../components/Button';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon';

interface AdminDashboardScreenProps {
  onBack: () => void;
}

type AdminTab = 'courses' | 'tournaments' | 'groups';

const AdminDashboardScreen: React.FC<AdminDashboardScreenProps> = ({ onBack }) => {
  const [courses, setCourses] = useState<AdminCourse[]>(db.courses);
  const [holes, setHoles] = useState<AdminHole[]>(db.holes);
  const [tees, setTees] = useState<AdminTee[]>(db.tees);
  const [tournaments, setTournaments] = useState<AdminTournament[]>(db.tournaments);
  const [players, setPlayers] = useState<AdminPlayer[]>(db.players);
  const [groups, setGroups] = useState<AdminGroup[]>(db.groups);
  const [groupPlayers, setGroupPlayers] = useState<AdminGroupPlayer[]>(db.groupPlayers);

  const [activeTab, setActiveTab] = useState<AdminTab>('courses');
  
  const handleCreateCourse = (
    courseData: Omit<AdminCourse, 'id' | 'aerialImageUrl'>,
    imageFile: File | null,
    holesData: Array<{ par: number }>
  ) => {
    console.log("Simulating image upload for:", imageFile?.name);
    const newCourse: AdminCourse = {
      ...courseData,
      id: `c${Date.now()}`,
      aerialImageUrl: imageFile ? URL.createObjectURL(imageFile) : undefined,
    };
    setCourses(prev => [...prev, newCourse]);

    const newHoles: AdminHole[] = holesData.map((hole, i) => ({
      id: `h${newCourse.id}${i+1}`,
      courseId: newCourse.id,
      holeNumber: i + 1,
      par: hole.par, 
      strokeIndex: 0, // Default SI, can be edited later
    }));
    setHoles(prev => [...prev, ...newHoles]);
  };

  const handleCreateTeesForHole = (holeId: string, teeData: Omit<AdminTee, 'id' | 'holeId'>) => {
    const newTee: AdminTee = {
        ...teeData,
        id: `t${Date.now()}`,
        holeId: holeId,
    };
    setTees(prev => [...prev, newTee]);
  };
  
  const handleCreateTournament = (tournamentData: Omit<AdminTournament, 'id'>) => {
    const newTournament: AdminTournament = {
        ...tournamentData,
        id: `t${Date.now()}`,
    };
    setTournaments(prev => [...prev, newTournament]);
  };

  const handleCreateGroup = (data: { tournamentId: string; startHole: number; playerIds: string[]; responsiblePlayerId: string; playerTeeSelections: Record<string, string>; }): string => {
      const accessCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      
      const newGroup: AdminGroup = {
          id: `g${Date.now()}`,
          tournamentId: data.tournamentId,
          startHole: data.startHole,
          accessCode: accessCode,
      };
      setGroups(prev => [...prev, newGroup]);
      
      const newGroupPlayersData: AdminGroupPlayer[] = data.playerIds.map(playerId => ({
          id: `gp${Date.now()}${playerId}`,
          groupId: newGroup.id,
          playerId: playerId,
          isResponsible: playerId === data.responsiblePlayerId,
          teeId: data.playerTeeSelections[playerId],
      }));
      setGroupPlayers(prev => [...prev, ...newGroupPlayersData]);

      return accessCode;
  };

  const TabButton: React.FC<{tabName: AdminTab; label: string}> = ({ tabName, label }) => (
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
        <Button onClick={onBack} variant="secondary" size="icon" className="mr-4">
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
            courses={courses}
            holes={holes}
            tees={tees}
            onCreateCourse={handleCreateCourse}
            onCreateTeeForHole={handleCreateTeesForHole}
          />
        )}
        {activeTab === 'tournaments' && (
            <ManageTournaments
                tournaments={tournaments}
                courses={courses}
                onCreateTournament={handleCreateTournament}
            />
        )}
        {activeTab === 'groups' && (
            <ManageGroups
                tournaments={tournaments}
                players={players}
                groups={groups}
                groupPlayers={groupPlayers}
                holes={holes}
                tees={tees}
                onCreateGroup={handleCreateGroup}
            />
        )}
      </div>
    </div>
  );
};

export default AdminDashboardScreen;