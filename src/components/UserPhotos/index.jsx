import React, { useState, useEffect } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
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

const fetchUserById = async (userCmtId) => {
  try {
    const userDetails = await fetchModel(`/api/user/${userCmtId}`);
    return userDetails ? `${userDetails.first_name} ${userDetails.last_name}` : 'Unknown User';
  } catch (error) {
    console.error('Error fetching user data:', error);
    return 'Unknown User';
  }
};

const fetchUsersForComments = async (photos) => {
  try {
    // Map over all comments and fetch user details asynchronously
    const userPromises = photos.flatMap(photo => photo.comments.map(comment => fetchUserById(comment.user_id)));
    const users = await Promise.all(userPromises);
    return users;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return [];
  }
};

function UserPhotos({userLoginId}) {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState(null);
  const [commentTexts, setCommentTexts] = useState({});
  const [commentUsers, setCommentUsers] = useState([]);

  // Define fetchPhotosAndUser function
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

  useEffect(() => {
    fetchPhotosAndUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    // Fetch user details for all comments when photos change
    const fetchUsers = async () => {
      const users = await fetchUsersForComments(photos);
      setCommentUsers(users);
    };

    fetchUsers();
  }, [photos]);

  // Function to handle submitting a comment
  const handleCommentSubmit = async (photoId) => {
    try {
      const response = await fetch(`http://localhost:8081/api/photo/commentsOfPhoto/${photoId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment: commentTexts[photoId], userId: userLoginId }), // Sử dụng commentTexts[photoId] thay vì commentText
      });
      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }

      // Clear the comment input field
      setCommentTexts(prevState => ({ ...prevState, [photoId]: '' }));

      // Refetch the photos to update the comments
      fetchPhotosAndUser();
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4" className="header">User Photos</Typography>
      {userLoginId === userId && (
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/photos/add"
          className="add-photo-button"
        >
          Add Photo
        </Button>
      )}
      <div className="user-photos-container">
        {photos.map((photo) => (
          <div key={photo._id} className="photo-container">
            <img src={`http://localhost:8081/api/photo/images/${photo.file_name}`} alt={user?.first_name} className="photo" />
            <Typography className="posted-time">Posted time: {formatDateTime(photo.date_time)}</Typography>
            {/* UI for adding comments */}
            <TextField
              label="Add a comment"
              variant="outlined"
              value={commentTexts[photo._id] || ''} // Lấy giá trị từ commentTexts
              onChange={(e) => setCommentTexts(prevState => ({ ...prevState, [photo._id]: e.target.value }))} // Cập nhật giá trị trong commentTexts
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleCommentSubmit(photo._id)}
            >
              Add Comment
            </Button>
            {/* Display existing comments */}
            <Typography className="comments-header">Comments:</Typography>
            {photo.comments && photo.comments.map((comment, commentIndex) => (
              <div key={comment._id} className={`comment ${comment.user_id === userId ? 'user-comment' : 'other-comment'}`}>
                <Typography className="user">{commentUsers[commentIndex]} </Typography>
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
