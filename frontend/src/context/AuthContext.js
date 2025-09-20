import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved authentication on app load
    const savedAuth = localStorage.getItem('gothic-auth');
    if (savedAuth) {
      try {
        const authData = JSON.parse(savedAuth);
        if (authData.user && authData.user.isAuthenticated) {
          setUser(authData.user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Failed to parse saved auth data:', error);
        localStorage.removeItem('gothic-auth');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData, token) => {
    const authData = {
      user: { ...userData, isAuthenticated: true },
      token
    };
    
    localStorage.setItem('gothic-auth', JSON.stringify(authData));
    setUser(authData.user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('gothic-auth');
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (userData) => {
    const updatedUser = { ...user, ...userData };
    const authData = {
      user: updatedUser,
      token: JSON.parse(localStorage.getItem('gothic-auth') || '{}').token
    };
    
    localStorage.setItem('gothic-auth', JSON.stringify(authData));
    setUser(updatedUser);
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};