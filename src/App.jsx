import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/public/LandingPage';
import LoginPage from './components/public/LoginPage';
import Home from './pages/Home';
import User from './pages/User';
import Album from './pages/Album';
import Photo from './pages/Photo';

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/album" element={<Album />} />
        <Route path="/photo" element={<Photo />} />
      </Routes>
    </Router>
  );
}


export default App
