import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthProvider.jsx';
import Layout from './components/Layout.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import MainScreen from './screens/MainScreen.jsx';
import LeaderboardScreen from './screens/LeaderboardScreen.jsx';
import ScorecardScreen from './screens/ScorecardScreen.jsx';
import AdminDashboardScreen from './screens/AdminDashboardScreen.jsx';
import PlayerDetailScreen from './screens/PlayerDetailScreen.jsx';

// Componente que renderiza as rotas corretas com base no estado de autenticação
const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <Routes>
        {user ? (
          <>
            <Route path="/" element={<MainScreen />} />
            <Route path="/leaderboard/:tournamentId" element={<LeaderboardScreen />} />
            <Route path="/leaderboard/:tournamentId/player/:playerId" element={<PlayerDetailScreen />} />
            <Route path="/scorecard/:accessCode" element={<ScorecardScreen />} />
            {user.role === 'admin' ? (
                 <Route path="/admin" element={<AdminDashboardScreen />} />
            ) : (
                 <Route path="/admin" element={<Navigate to="/" replace />} />
            )}
            {/* Se um usuário logado tentar acessar /login, redireciona para a home */}
            <Route path="/login" element={<Navigate to="/" replace />} />
            {/* Rota de fallback para usuários logados */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<LoginScreen />} />
            {/* Qualquer outra rota é redirecionada para o login se não estiver autenticado */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Routes>
    </Layout>
  );
};


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;