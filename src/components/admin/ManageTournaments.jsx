import React, { useState } from 'react';
import Button from '../Button';

const ManageTournaments = () => {
  // Mock data that would typically come from state management or an API
  const [courses, setCourses] = useState([
    { id: 'c1', name: 'Pebble Beach' },
    { id: 'c2', name: 'St Andrews Links' }
  ]);
  const [tournaments, setTournaments] = useState([
     { id: 't1', name: 'Pine Hill Open 2024', date: '2024-07-21', courseId: 'c1' }
  ]);
  
  const [newTournamentName, setNewTournamentName] = useState('');
  const [newTournamentDate, setNewTournamentDate] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState('');

  const handleCreateTournament = (e) => {
    e.preventDefault();
    if (newTournamentName.trim() && newTournamentDate && selectedCourseId) {
      const newTournament = {
        id: `t${Date.now()}`,
        name: newTournamentName,
        date: newTournamentDate,
        courseId: selectedCourseId,
      };
      setTournaments(prev => [...prev, newTournament]);
      setNewTournamentName('');
      setNewTournamentDate('');
      setSelectedCourseId('');
    }
  };
  
  const getCourseName = (courseId) => {
    return courses.find(c => c.id === courseId)?.name || 'Unknown Course';
  }

  return (
    <div className="space-y-8">
      <div className="p-6 bg-gray-700/50 rounded-lg">
        <h3 className="text-xl font-bold text-green-400 mb-4">Create New Tournament</h3>
        <form onSubmit={handleCreateTournament} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-300 mb-1">Tournament Name</label>
            <input type="text" value={newTournamentName} onChange={(e) => setNewTournamentName(e.target.value)} className="w-full px-3 py-2 border border-gray-600 bg-gray-900 text-white rounded-md" required />
          </div>
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-300 mb-1">Date</label>
            <input type="date" value={newTournamentDate} onChange={(e) => setNewTournamentDate(e.target.value)} className="w-full px-3 py-2 border border-gray-600 bg-gray-900 text-white rounded-md" required />
          </div>
           <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-300 mb-1">Course</label>
            <select value={selectedCourseId} onChange={(e) => setSelectedCourseId(e.target.value)} className="w-full px-3 py-2 border border-gray-600 bg-gray-900 text-white rounded-md" required>
              <option value="">-- Select --</option>
              {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="lg:col-span-1">
            <Button type="submit" className="w-full">Create Tournament</Button>
          </div>
        </form>
      </div>

      <div className="p-6 bg-gray-700/50 rounded-lg">
        <h3 className="text-xl font-bold text-green-400 mb-4">Existing Tournaments</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-600">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase">Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase">Date</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase">Course</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-600">
              {tournaments.map(t => (
                <tr key={t.id}>
                  <td className="px-4 py-3 font-medium">{t.name}</td>
                  <td className="px-4 py-3">{new Date(t.date).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-gray-300">{getCourseName(t.courseId)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageTournaments;