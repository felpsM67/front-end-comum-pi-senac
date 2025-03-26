import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login";
import { Home, UserManagement } from "./home";
import { UserForm } from "./user-form";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/users/new" element={<UserForm />} />
        <Route path="/users/edit/:id" element={<UserForm isEditing />} />
      </Routes>
    </Router>
  );
}

export default App;
