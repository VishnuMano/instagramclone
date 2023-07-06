import React from "react";
import "./Post.css";
import Avatar from "@mui/material/Avatar";

function Post({ username, caption, imageUrl }) {
  return (
    <div className="post">
      <div className="post_header">
        {/* Header (Avatar + Username) */}
        <Avatar
          className="post_avatar"
          alt={username}
          src="/static/images/avatar/1.jpg</div>"
        />
        {/* Utilizes Material UI Avatar*/}
        <h3>{username}</h3>
      </div>
      {/* Image */}
      <img className="post_image" src={imageUrl}></img>
      {/* Username: Caption */}
      <h4 className="post_text">
        <strong>{username} </strong>
        {caption}
      </h4>
    </div>
  );
}

export default Post;
