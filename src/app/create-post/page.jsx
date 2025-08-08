'use client';

import { useState, useRef } from 'react';
import styles from './createPost.module.css';
import { useSelector } from 'react-redux';
import api from '@/service/axios';
import { useRouter } from 'next/navigation';
import PrivateRoute from '@/components/PrivateRoute';

export default function CreatePostPage() {

  const user = useSelector((state)=> state.user.user);
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [caption, setCaption] = useState('');
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !caption) {
      alert('Please provide an image and caption.');
      return;
    }

    const formData = new FormData();
    formData.append('file', image);
    formData.append('description', caption);
    formData.append('tags', JSON.stringify(tags));

    try {
      const response = await api.post('http://localhost:3000/posts', formData);
      console.log('Post created:', response);

      setImage(null);
      setCaption('');
      setTags([]);
      router.push('/feed')
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleTagKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim() !== '') {
        e.preventDefault();
        const newTag = tagInput.trim().replace(/[,]+$/, '');
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

  return (
    <PrivateRoute>
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
    </PrivateRoute>
  );
}
