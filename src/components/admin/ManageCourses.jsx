import React, { useState } from 'react';
import Button from '../Button.jsx';

const initialHoleState = () => Array(18).fill(null).map((_, i) => ({
  holeNumber: i + 1,
  par: 4,
  strokeIndex: i + 1,
  tees: [], // { color: 'Branco', yardage: 350 }
}));

const ManageCourses = () => {
  const [courses, setCourses] = useState([
    { id: 'c1', name: 'Pebble Beach', location: 'California, USA', holes: initialHoleState() }
  ]);
  const [newCourseName, setNewCourseName] = useState('');
  const [newCourseLocation, setNewCourseLocation] = useState('');
  const [courseHoles, setCourseHoles] = useState(initialHoleState());

  const handleCreateCourse = (e) => {
    e.preventDefault();
    if (!newCourseName.trim() || !newCourseLocation.trim()) return;
    const newCourse = {
      id: `c${Date.now()}`,
      name: newCourseName,
      location: newCourseLocation,
      holes: courseHoles,
    };
    setCourses(prev => [...prev, newCourse]);
    setNewCourseName('');
    setNewCourseLocation('');
    setCourseHoles(initialHoleState());
  };

  const handleHoleChange = (index, field, value) => {
    const newHoles = [...courseHoles];
    newHoles[index][field] = parseInt(value, 10) || 0;
    setCourseHoles(newHoles);
  };

  return (
    <div className="space-y-8">
      <div className="p-6 bg-gray-700/50 rounded-lg">
        <h3 className="text-xl font-bold text-green-400 mb-4">Criar Novo Campo</h3>
        <form onSubmit={handleCreateCourse} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" value={newCourseName} onChange={(e) => setNewCourseName(e.target.value)} placeholder="Nome do Campo" required className="w-full px-3 py-2 border border-gray-600 bg-gray-900 text-white rounded-md"/>
            <input type="text" value={newCourseLocation} onChange={(e) => setNewCourseLocation(e.target.value)} placeholder="Localização" required className="w-full px-3 py-2 border border-gray-600 bg-gray-900 text-white rounded-md"/>
          </div>
          
          <div className="pt-4 border-t border-gray-600">
            <h4 className="text-lg font-semibold text-gray-200">Buracos do Campo</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mt-2">
              {courseHoles.map((hole, index) => (
                <div key={index} className="p-2 bg-gray-800 rounded">
                  <label className="text-sm font-bold text-white">Buraco {hole.holeNumber}</label>
                  <div className="flex flex-col gap-1 mt-1">
                    <input type="number" value={hole.par} onChange={e => handleHoleChange(index, 'par', e.target.value)} placeholder="Par" className="w-full text-center text-sm p-1 border border-gray-700 bg-gray-900 rounded"/>
                    <input type="number" value={hole.strokeIndex} onChange={e => handleHoleChange(index, 'strokeIndex', e.target.value)} placeholder="SI" className="w-full text-center text-sm p-1 border border-gray-700 bg-gray-900 rounded"/>
                  </div>
                </div>
              ))}
            </div>
             <p className="text-xs text-gray-400 mt-2">A gestão de tees (cor e jardas) seria adicionada aqui para cada buraco.</p>
          </div>

          <Button type="submit">Salvar Campo</Button>
        </form>
      </div>

      <div className="p-6 bg-gray-700/50 rounded-lg">
        <h3 className="text-xl font-bold text-green-400 mb-4">Campos Existentes</h3>
        <ul className="space-y-2">
            {courses.map(course => (
                <li key={course.id} className="p-3 bg-gray-800 rounded-md">
                    <p className="font-bold">{course.name}</p>
                    <p className="text-sm text-gray-400">{course.location}</p>
                </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageCourses;