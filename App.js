import React from 'react'
import { AuthProvider } from './components/AuthContext';
import AppNav from './navigations/AppNav';

function App() {
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}

export default App;