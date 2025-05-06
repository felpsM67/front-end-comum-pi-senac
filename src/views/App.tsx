import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import UserManagement from './UserManagement';
import UserForm from './UserForm';
import ProtectedRoute from '../ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/users/new" element={<UserForm />} />
          <Route path="/users/edit/:id" element={<UserForm isEditing />} />
        </Route>
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
