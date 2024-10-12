import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthForm from './authform'
import OnClickValidationForm from './authform-ocv';
import './App.css'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for the live validation form */}
          <Route path="/" element={<AuthForm />} />

          {/* Route for the click-based validation form */}
          <Route path="/on-click-validation" element={<OnClickValidationForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
