import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, UserManagement } from "./home"; // Importa os componentes
import Login from "./login"; // Importa a tela de login

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/users/new" element={<div>Cadastro de Usuário</div>} /> 
        <Route path="/users/edit/:id" element={<div>Editar Usuário</div>} />
      </Routes>
    </Router>
  );
}

export default App;