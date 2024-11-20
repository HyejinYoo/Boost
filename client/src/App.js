import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Home from './views/Home';
import Login from './views/Login';
import Signup from './views/Signup';
import './styles/App.css'; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const response = await axios.get('http://localhost:3001/users/me', { withCredentials: true });
      setUser(response.data);
      setIsLoggedIn(true);
    } catch (error) {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogin = () => {
    fetchUser();
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3001/auth/logout', {}, { withCredentials: true });
      setIsLoggedIn(false);
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Voting App</h1>
      </header>
      <main className="app-main">
        {isLoggedIn && user && (
          <div className="user-info">
            <div className="center-content">
              <div className="name-region">
                <h2>{user.username}</h2>
                <h6>{user.region}</h6>
              </div>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
        <Routes>
          {isLoggedIn ? (
            <Route path="/" element={<Home user={user} />} />
          ) : (
            <>
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<Login onLogin={handleLogin} />} />
            </>
          )}
        </Routes>
      </main>
    </div>
  );
}

export default App;