// Login.js
import React, { useState } from 'react';
import { fetchModel } from '../../lib/fetchModelData';

const Login = () => {
    const [loginName, setLoginName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetchModel('/api/login', {
                method: 'post',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ loginName, password })
            });
            if(response.ok) {
                return response.send("complete");
            }else {
                return response.send("error");
            }
        } catch (error) {
            setError('Login failed. Please try again.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username or Email" value={loginName} onChange={(e) => setLoginName(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
