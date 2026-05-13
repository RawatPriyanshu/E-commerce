import React, { useEffect, useState } from "react";
import axios from "axios";
import "./edit.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const API = "https://e-commerce-by-priyanshu.onrender.com/api/user-update";

export default function Edit() {
  const users = localStorage.getItem("user");
  const userId = users ? JSON.parse(users).id : null;
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    axios
      .get(`${API}/get-user/${userId}`)
      .then((res) => {
        const userData = res.data.user || res.data;
        setUser(userData);
        setUsername(userData.username);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
        setLoading(false);
      });
  }, [userId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    if (image) formData.append("image", image);
    try {
      const res = await axios.put(`${API}/update-profile/${userId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUser(res.data.user);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Failed to update profile.");
    }
  };

  const avatarSrc =
    preview ||
    (user?.profilePicture
      ? `https://e-commerce-by-priyanshu.onrender.com/uploads/${user.profilePicture}`
      : "https://via.placeholder.com/150");

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>No user found</p>;

  return (
    <div className="editProfile-container">

      {/* ── Navbar ── */}
      <div className="heading">
        <img className="edit-page-logo" src="./images/logo.png" alt="logo" />
        <Link className="home-link" to="/home">
          <i className="fa-solid fa-house"></i> Home
        </Link>
        <img className="user-icon" src={avatarSrc} alt="profile" />
      </div>

      {/* ── Form ── */}
      <div className="editing-profile">
        <h2>Edit Profile</h2>

        <form onSubmit={handleSubmit}>

          {/* Avatar */}
          <div className="upload-profile">
            <img src={avatarSrc} alt="Profile" />
            <label className="camera" htmlFor="fileInput">
              <i className="fa fa-camera"></i>
            </label>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>

          {/* Name */}
          <div className="user-name">
            <label htmlFor="nameInput">Name</label>
            <input
              id="nameInput"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your name"
            />
          </div>

          {/* Email (read-only) */}
          <div className="user-email">
            <label>Email</label>
            <input type="text" value={user.email} disabled />
          </div>

          {/* Save */}
          <div className="save-changes">
            <button type="submit">Save Changes</button>
          </div>

        </form>
      </div>
    </div>
  );
}