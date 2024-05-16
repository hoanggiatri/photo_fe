import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function TopBar({ isLoggedIn, onLogout, userName }) {
  const navigate = useNavigate();
  const [loggedOut, setLoggedOut] = useState(false);
  const handleLogout = () => {
    // Thực hiện đăng xuất ở đây
    onLogout();
    setLoggedOut(true);
    // Chuyển hướng đến trang đăng nhập
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Hoàng Gia Trí
        </Typography>
        {isLoggedIn ? (
          <>
            <Typography variant="body1">Hi, {userName.first_name}</Typography>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            {!loggedOut && (
              <>
                <Button color="inherit" component={Link} to="/login">Login</Button>
                <Button color="inherit" component={Link} to="/register">Register</Button>
              </>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
