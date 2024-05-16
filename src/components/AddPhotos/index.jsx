import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

function AddPhoto({ open, onClose, onPhotoUpload }) {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handlePhotoUpload = () => {
        if (selectedFile) {
            onPhotoUpload(selectedFile);
            onClose(); // Close the dialog after uploading
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Photo</DialogTitle>
            <DialogContent>
                <input type="file" accept="image/*" onChange={handleFileChange} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handlePhotoUpload} color="primary" disabled={!selectedFile}>
                    Upload
                </Button>
            </DialogActions>
        </Dialog>
    );
}


export default AddPhoto;
