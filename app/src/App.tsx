import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './components/AppRoutes';
import './styles/globals.css';
import AppContext from './components/AppContext';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppContext>

          <AppRoutes />

        </AppContext>
      </BrowserRouter>
    </div>
  );
}

export default App;
