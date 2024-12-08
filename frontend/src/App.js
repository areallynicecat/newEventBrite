import Navbar from "./components/navbar.jsx";
import { Routes, Route } from 'react-router-dom'; 
import HomePage from "./pages/homePage.jsx";
import LoginPage from './pages/loginPage.jsx';
import RegisterPage from './pages/registerPage.jsx';
import UsersPage from "./pages/usersPage.jsx";
import EventsPage from "./pages/eventsPage.jsx";

function App()
{
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/event-management" element={<EventsPage />} />
    </Routes>
    </>
  );
}

export default App;