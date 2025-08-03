'use client';

import { useState, useRef } from 'react';
import styles from './createPost.module.css';
import { useSelector } from 'react-redux';

export default function CreatePostPage() {

    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');

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


  const handleTagKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim() !== '') {
        e.preventDefault();
        const newTag = tagInput.trim().replace(/[,]+$/, ''); // Remove trailing comma
        if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
        }
        setTagInput('');
    } else if (e.key === 'Backspace' && tagInput === '') {
        setTags(tags.slice(0, -1));
    }
    };

    const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
    };

    console.log({ image, caption, tags });

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.card}>
        <div className={styles.header}>
          <img src={user?.avatar?.url || 'https://www.w3schools.com/howto/img_avatar.png'} alt="User" className={styles.avatar} />
          <span className={styles.username}>{user?.username}</span>
        </div>

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

        {/* Tags Input */}
<div className={styles.tagsWrapper}>
  {tags.map((tag, index) => (
    <span key={index} className={styles.tag}>
      #{tag}
      <button
        type="button"
        onClick={() => removeTag(index)}
        className={styles.removeTagBtn}
      >
        &times;
      </button>
    </span>
  ))}
  <input
    type="text"
    placeholder="Add tags (press Enter)"
    value={tagInput}
    onChange={(e) => setTagInput(e.target.value)}
    onKeyDown={handleTagKeyDown}
    className={styles.tagInput}
  />
</div>

        <textarea
          placeholder="Write a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className={styles.caption}
          maxLength={2200}
        />

        <button type="submit" className={styles.postButton}>
          Post
        </button>
      </form>
    </div>
  );
}
