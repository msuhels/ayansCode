import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './components/ToastContext';
import CompanyCrud from './Company/CompanyCrud';
import ReviewDetails from './Company/ReviewDetails';

function App() {
  return (
    <Router>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<CompanyCrud />} />
          <Route path="/review-details/:id" element={<ReviewDetails />} />

        </Routes>
      </ToastProvider>
    </Router>
  );
}

export default App;
