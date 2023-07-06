import React, { useState, useRef } from "react";
import { Input, Button } from "@material-ui/core";
import { storage, db } from "./firebase.js";
import firebase from "firebase/compat/app";
import "firebase/firestore";
import "./ImageUpload.css";

function ImageUpload({ username }) {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (image) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
          console.log("Progress: ", progress);
        },
        (error) => {
          // error
          console.log(error);
          alert(error.message);
        },
        () => {
          // completion
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              // post image inside db
              db.collection("posts").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                imageUrl: url,
                username: username,
              });

              setProgress(0);
              setCaption("");
              setImage(null);
              fileInputRef.current.value = null; // Clear file input value
            });
        }
      );
    } else {
      alert("Please select an image to upload.");
    }
  };

  return (
    <div className="imageupload">
      <progress className="imageupload_progress" value={progress} max="100" />
      <input
        type="text"
        placeholder="Enter a caption ..."
        onChange={(event) => setCaption(event.target.value)}
        value={caption}
      />
      <input
        type="file"
        onChange={handleChange}
        ref={fileInputRef}
        accept="image/*"
      />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
}

export default ImageUpload;
