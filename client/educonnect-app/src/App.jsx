// src/App.jsx
import React from 'react';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/common/Navbar';

const App = () => {
  return (
    <>
      <Navbar />
      <AppRoutes />
    </>
  );
};

export default App;
