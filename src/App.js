import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Grid, Paper } from '@mui/material';

import TopBar from './components/TopBar';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import UserPhotos from './components/UserPhotos';
import Login from './components/Login';
import Home from './components/Home/home';
import Register from './components/Register';
import PhotoUploader from './components/PhotoUpload';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userId, setUserId] = useState(null);
  const handleLogin = (userData) => {
    if (userData) {
      setIsLoggedIn(true);
      setUserName(userData);
      setUserId(userData.user_id);
    } else {
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName(null);
  };

  return (
    <Router>
      <div>
        <TopBar isLoggedIn={isLoggedIn} onLogout={handleLogout} userName={userName} />
        <Grid container spacing={2}>
          {isLoggedIn && (
            <Grid item sm={3}>
              <Paper>
                <UserList />
              </Paper>
            </Grid>
          )}
          <Grid item sm={isLoggedIn ? 9 : 12}>
            <Paper>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/users/:userId" element={isLoggedIn ? <UserDetail /> : <Navigate to="/login" />} />
                <Route path="/photos/:userId" element={isLoggedIn ? <UserPhotos userLoginId={userId} /> : <Navigate to="/login" />} />
                <Route path="/photos/add" element={isLoggedIn ? <PhotoUploader userId={userId} /> : <Navigate to="/login" />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
}

export default App;
