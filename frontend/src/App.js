import Navbar from "./components/navbar.jsx";
import { Routes, Route } from 'react-router-dom'; 
import HomePage from "./pages/homePage.jsx";
import LoginPage from './pages/loginPage.jsx';
import RegisterPage from './pages/registerPage.jsx';
import UsersPage from "./pages/usersPage.jsx";

function App()
{
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/users" element={<UsersPage />} />
    </Routes>
    </>
  );
}

export default App;