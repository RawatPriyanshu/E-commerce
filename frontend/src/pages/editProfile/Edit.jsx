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

  console.log(userId);
  // 🔹 Fetch user on mount
  useEffect(() => {
    console.log("useEffect ran, userId:", userId);

    if (!userId) {
      console.log("No userId found in localStorage");
      return;
    }

    axios
      .get(`${API}/get-user/${userId}`)
      .then((res) => {
        console.log("Fetched user 👉", res.data);
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

  // 🔹 Handle image select
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // 🔹 Submit update
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

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>No user found</p>;

  return (
    <div style={{ Width: "100%", margin: "auto", height:"100vh", backgroundColor:"#e8e6e6" }} className="editProfile-container">
      <div className="heading">
        <img className="edit-page-logo" src="./images/logo.png" alt="logo" />
        <Link className="home-link" to={'/home'}>Home</Link>
        <img className="user-icon" src={
              preview ||
              (user.profilePicture
                ? `https://e-commerce-by-priyanshu.onrender.com/uploads/${user.profilePicture}`
                : "https://via.placeholder.com/150")
            } alt="pfp" />
      </div>
      <div className="editing-profile">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
        {/* Profile Picture */}
        <div className="upload-profile">
          <img
            src={
              preview ||
              (user.profilePicture
                ? `https://e-commerce-by-priyanshu.onrender.com/uploads/${user.profilePicture}`
                : "https://via.placeholder.com/150")
            }
            alt="Profile"
            style={{ width: "100px", height: "100px", borderRadius: "50%", marginTop:"15px" }}
          />
          <label className="camera" htmlFor="fileInput"><i class="fa fa-camera"></i></label>
          <input id="fileInput" type="file" accept="image/*" onChange={handleImageChange} style={{display:"none"}}></input>
        </div>

        {/* Username */}
        <div className="user-name">
          <label>Name</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Email (read-only) */}
        <div className="user-email">
          <label>Email:</label>
          <input type="text" value={user.email} disabled />
        </div>
        <div className="save-changes"><button type="submit">Save Changes</button></div>
        
      </form>
      </div>
      
    </div>
  );
}
