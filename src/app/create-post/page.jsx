'use client';

import { useState, useRef } from 'react';
import styles from './createPost.module.css';
import { useSelector } from 'react-redux';

export default function CreatePostPage() {
  const user = useSelector((state)=> state.user.user)
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ image, caption });
    // TODO: Submit logic here
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.card}>
        {/* Header */}
        <div className={styles.header}>
          <img src={user?.avatar?.url} alt="User" className={styles.avatar} />
          <span className={styles.username}>{user?.username}</span>
        </div>

        {/* Upload Area */}
        <div
          className={styles.uploadArea}
          onClick={() => fileInputRef.current.click()}
        >
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className={styles.preview}
            />
          ) : (
            <span className={styles.uploadText}>Click to upload image</span>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className={styles.hiddenInput}
          />
        </div>

        {/* Caption */}
        <textarea
          placeholder="Write a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className={styles.caption}
          maxLength={2200}
        />

        {/* Submit */}
        <button type="submit" className={styles.postButton}>
          Post
        </button>
      </form>
    </div>
  );
}
