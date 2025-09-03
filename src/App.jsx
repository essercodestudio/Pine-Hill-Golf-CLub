import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import MainScreen from './screens/MainScreen';
import LoginScreen from './screens/LoginScreen';
import AdminDashboardScreen from './screens/AdminDashboardScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import ScorecardScreen from './screens/ScorecardScreen';

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