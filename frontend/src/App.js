import Navbar from "./components/navbar.jsx";
import { Routes, Route } from 'react-router-dom'; 
import HomePage from "./pages/homePage.jsx";
import LoginPage from './pages/loginPage.jsx';
import RegisterPage from './pages/registerPage.jsx';
import UsersPage from "./pages/usersPage.jsx";
import EventsPage from "./pages/eventsPage.jsx";
import AnalyticsPage from "./pages/analyticsPage.jsx";
import ForgotPasswordPage from "./pages/forgotPasswordPage.jsx";
import PublishEmailPage from "./pages/publishEmailPage.jsx";


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
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/publish-email" element={<PublishEmailPage />} />
    </Routes>
    </>
  );
}

export default App;