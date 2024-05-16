import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css'; // Import CSS file

const Register = ({ onLogin, onRegister }) => {
    const [login_name, setLoginName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [occupation, setOccupation] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('http://localhost:8081/admin/register', {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    login_name,
                    password,
                    first_name,
                    last_name,
                    location,
                    description,
                    occupation
                })
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(true);
                setTimeout(() => {
                    navigate('/login'); // Redirect to login page
                }, 2000); // Redirect after 3 seconds
            } else {
                console.error('Failed to register user:', data.error);
                // Handle failure, such as displaying an error message to the user
                setError(data.error); // Update error state with the error message from the server
            }
        } catch (error) {
            console.error('Error registering user:', error);
            // Handle network or other errors
            setError('An error occurred while registering. Please try again later.');
        }
    };

    return (
        <div className="register-container">
            <div className="register-form">
                <h1>Login or Register</h1>
                <input type="text" placeholder="Login Name" value={login_name} onChange={(e) => setLoginName(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <input type="text" placeholder="First Name" value={first_name} onChange={(e) => setFirstName(e.target.value)} />
                <input type="text" placeholder="Last Name" value={last_name} onChange={(e) => setLastName(e.target.value)} />
                <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <input type="text" placeholder="Occupation" value={occupation} onChange={(e) => setOccupation(e.target.value)} />
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">Registration successful. Redirecting...</p>}
                <button onClick={handleRegister}>Register</button>
                <div className="back-link">
                    <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
