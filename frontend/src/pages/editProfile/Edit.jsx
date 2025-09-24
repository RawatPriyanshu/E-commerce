import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Edit = () => {
  
const [username, setUsername] = useState("");
  const [image, setImage] = useState(null);
  const [response, setResponse] = useState(null);
  const [userId, setUserId] = useState(null);

  const backendURL = "https://your-backend.onrender.com";

  useEffect(() => {
    // Get userId from localStorage
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
      fetchUser(storedUserId);
    }
  }, []);

  // Fetch current user info
  const fetchUser = async (id) => {
    try {
      const res = await axios.get(`${backendURL}/api/user-update/get-user/${id}`);
      setUsername(res.data.user.username); // preload username
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return;

    const formData = new FormData();
    if (username) formData.append("username", username);
    if (image) formData.append("image", image);

    try {
      const res = await axios.put(
        `${backendURL}/api/user-update/update-profile/${userId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setResponse(res.data);
      if (res.data.user?.username) setUsername(res.data.user.username); // update displayed name
    } catch (err) {
      console.error(err);
      setResponse(err.response?.data || err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username:{" "}
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>
            Profile Picture:{" "}
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </label>
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>
          Update Profile
        </button>
      </form>

      {response && (
        <div style={{ marginTop: "20px" }}>
          <h3>Response:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>

          {response.user?.profilePicture && (
            <img
              src={`${backendURL}/uploads/${response.user.profilePicture}`}
              alt="Profile"
              style={{ width: "150px", marginTop: "10px" }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Edit
