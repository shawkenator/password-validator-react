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
          <Route path="/" element={<OnClickValidationForm />} />

          {/* Route for the click-based validation form */}
          <Route path="/live-validation" element={<AuthForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
