import React from 'react';
import { NavLink } from 'react-router-dom';

const Layout = ({ children }) => {
  const activeLinkStyle = {
    backgroundColor: '#16a34a', // green-600
    color: 'white',
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <header className="bg-gray-800 shadow-lg sticky top-0 z-10">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <NavLink to="/" className="text-2xl font-bold text-white">
              Pine Hill Score
            </NavLink>
            <div className="flex items-center space-x-2">
              <NavLink
                to="/"
                style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
                className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-700"
              >
                Home
              </NavLink>
               <NavLink
                to="/leaderboard"
                style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
                className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-700"
              >
                Leaderboard
              </NavLink>
              <NavLink
                to="/scorecard"
                style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
                className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-700"
              >
                Scorecard
              </NavLink>
              <NavLink
                to="/admin"
                style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
                className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-700"
              >
                Admin
              </NavLink>
              <NavLink
                to="/login"
                className="px-3 py-2 rounded-md text-sm font-medium bg-gray-600 hover:bg-gray-700"
              >
                Login
              </NavLink>
            </div>
          </div>
        </nav>
      </header>
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
      <footer className="bg-gray-800 text-center py-4 text-sm text-gray-500">
        <p>&copy; 2024 Pine Hill Score. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;