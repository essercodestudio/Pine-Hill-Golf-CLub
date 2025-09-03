import React, { useState } from 'react';
import Button from '../Button';

const initialHoleState = () => Array(18).fill(null).map((_, i) => ({
  holeNumber: i + 1,
  par: 4,
  strokeIndex: 0,
  tees: [],
}));

const ManageCourses = () => {
  const [courses, setCourses] = useState([
    { id: 'c1', name: 'Pebble Beach', location: 'California, USA', holes: initialHoleState() }
  ]);
  const [newCourseName, setNewCourseName] = useState('');
  const [newCourseLocation, setNewCourseLocation] = useState('');

  const handleCreateCourse = (e) => {
    e.preventDefault();
    if (!newCourseName.trim() || !newCourseLocation.trim()) return;
    const newCourse = {
      id: `c${Date.now()}`,
      name: newCourseName,
      location: newCourseLocation,
      holes: initialHoleState(),
    };
    setCourses(prev => [...prev, newCourse]);
    setNewCourseName('');
    setNewCourseLocation('');
  };

  return (
    <div className="space-y-8">
      <div className="p-6 bg-gray-700/50 rounded-lg">
        <h3 className="text-xl font-bold text-green-400 mb-4">Create New Course</h3>
        <form onSubmit={handleCreateCourse} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" value={newCourseName} onChange={(e) => setNewCourseName(e.target.value)} placeholder="Course Name" required className="w-full px-3 py-2 border border-gray-600 bg-gray-900 text-white rounded-md"/>
            <input type="text" value={newCourseLocation} onChange={(e) => setNewCourseLocation(e.target.value)} placeholder="Location" required className="w-full px-3 py-2 border border-gray-600 bg-gray-900 text-white rounded-md"/>
          </div>
          {/* In a real app, hole and tee management would be here */}
          <p className="text-sm text-gray-400">Note: Hole and tee management for new courses would be built out here. For now, new courses are created with default values.</p>
          <Button type="submit">Save Course</Button>
        </form>
      </div>

      <div className="p-6 bg-gray-700/50 rounded-lg">
        <h3 className="text-xl font-bold text-green-400 mb-4">Existing Courses</h3>
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