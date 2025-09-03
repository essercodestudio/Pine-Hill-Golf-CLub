import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import MainScreen from './screens/MainScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import AdminDashboardScreen from './screens/AdminDashboardScreen.jsx';
import LeaderboardScreen from './screens/LeaderboardScreen.jsx';
import ScorecardScreen from './screens/ScorecardScreen.jsx';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/admin" element={<AdminDashboardScreen />} />
          <Route path="/leaderboard" element={<LeaderboardScreen />} />
          <Route path="/scorecard" element={<ScorecardScreen />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;