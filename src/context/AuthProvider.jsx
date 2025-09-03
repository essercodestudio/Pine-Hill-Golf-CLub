import React, { useState, useMemo, createContext, useContext } from 'react';

export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // O uso de useMemo evita recriações desnecessárias do objeto de contexto
  const authContextValue = useMemo(() => ({
    user,
    login: (loggedInUser) => setUser(loggedInUser),
    logout: () => setUser(null),
  }), [user]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook customizado para facilitar o acesso ao contexto de autenticação
export const useAuth = () => {
    return useContext(AuthContext);
}