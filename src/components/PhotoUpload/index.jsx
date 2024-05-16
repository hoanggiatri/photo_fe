import React, { useState } from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';

function PhotoUploader({ userId }) {
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            if (!file) {
                throw new Error('Please select a file.');
            }

            const formData = new FormData();
            formData.append('photo', file);
            formData.append('userId', userId);

            const response = await fetch('http://localhost:8081/api/photo/new', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to upload photo');
            }

            alert('Photo uploaded successfully!');

            navigate(`/photos/${userId}`);

            
        } catch (error) {
            console.error('Error uploading photo:', error.message);
            alert('Failed to upload photo. Please try again.');
        }
    };

    return (
        <div className="photo-uploader-container">
            <input
                type="file"
                onChange={handleFileChange}
                className="photo-uploader-input"
            />
            <button onClick={handleUpload} className="photo-uploader-button">
                Upload Photo
            </button>
        </div>
    );
}

export default PhotoUploader;
