import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { fetchModel } from "../../lib/fetchModelData";
import "./styles.css";

function formatDateTime(dateTimeString) {
  const dateTime = new Date(dateTimeString);
  const hours = dateTime.getHours().toString().padStart(2, '0');
  const minutes = dateTime.getMinutes().toString().padStart(2, '0');
  const seconds = dateTime.getSeconds().toString().padStart(2, '0');
  const day = dateTime.getDate().toString().padStart(2, '0');
  const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
  const year = dateTime.getFullYear().toString();
  return `${hours}:${minutes}:${seconds}, ${day}/${month}/${year}`;
}

function UserPhotos() {
  const { userId } = useParams(); 
  const [photos, setPhotos] = useState([]); 
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const fetchPhotosAndUser = async () => {
      try {
        // Fetch photos for the user with userId
        const userPhotos = await fetchModel(`/api/photo/photosOfUser/${userId}`);
        setPhotos(userPhotos);

        // Fetch user details
        const userDetails = await fetchModel(`/api/user/${userId}`);
        setUser(userDetails);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPhotosAndUser();
  }, [userId]);

  return (
    <div>
      <Typography variant="h4" className="header">User Photos</Typography>
      <div className="user-photos-container">
        {photos.map((photo) => (
          <div key={photo._id} className="photo-container">
            <img src={`/assets/images/${photo.file_name}`} alt={user?.first_name} className="photo" />
            <Typography className="posted-time">Posted time: {formatDateTime(photo.date_time)}</Typography>
            <Typography className="comments-header">Comments:</Typography>
            {photo.comments && photo.comments.map((comment) => (
              <div key={comment._id} className={`comment ${comment.user_id === userId ? 'user-comment' : 'other-comment'}`}>
                <Typography className="user">{user?.first_name} {user?.last_name}</Typography>
                <Typography className="comment-time">{formatDateTime(comment.date_time)}</Typography>
                <Typography className="comment-text">{comment.comment}</Typography>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserPhotos;
