import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css'; // Import CSS file

const Login = ({ onLogin }) => {
    const [login_name, setLoginName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8081/admin/login', {
                method: 'post',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ login_name, password })
            });

            // Extract token from response
            const data = await response.json();
            
            const {user_id, first_name } = data;
            if (response.ok) {
                // Store token in sessionStorage
                onLogin && onLogin({ user_id, first_name });
                navigate(`/users/${user_id}`);
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setError('An error occurred while logging in. Please try again later.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h1>Login</h1>
                <input type="text" placeholder="Login Name" value={login_name} onChange={(e) => setLoginName(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {error && <p className="error-message">{error}</p>}
                <button onClick={handleLogin}>Login</button>
                <p className="signup-link">Don't have an account? <a href="/register">Sign up</a></p>
            </div>
        </div>
    );
};

export default Login;
