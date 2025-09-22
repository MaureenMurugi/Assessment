import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/private/AuthProvider';
import PrivateRoute from './components/private/PrivateRoute';
import LandingPage from './components/public/LandingPage';
import LoginPage from './components/public/LoginPage';
import Home from './pages/Home';
import User from './pages/User';
import Album from './pages/Album';
import Photo from './pages/Photo';

function App() {
  

  return (
    <Router>
      <AuthProvider>
      <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* Private routes */}
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/user" element={<PrivateRoute><User /></PrivateRoute>} />
        <Route path="/album" element={<PrivateRoute><Album /></PrivateRoute>} />
        <Route path="/photo" element={<PrivateRoute><Photo /></PrivateRoute>} />
      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App
