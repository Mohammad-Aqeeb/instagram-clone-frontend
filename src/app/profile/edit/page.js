'use client';
import React, { useEffect, useState } from 'react';
import styles from './edit-profile.module.css';
import api from '@/service/axios';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '@/slices/userSlice';

export default function EditProfilePage() {

  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state)=> state.user.user);
  const [file, setFile] = useState('');
  
  const [formData, setFormData] = useState({
    avatar : user.avatar ? user?.avatar?.url : "",
    name: user.name || "",
    username: user.username || "",
    website: user.website || "",
    description: user.description || "",
    email: user.email || "",
    phone: user.phone || "",
    gender: user.gender || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFormData({ ...formData, avatar: URL.createObjectURL(e.target.files[0])});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    delete formData.avatar;
    const newUserData = await api.patch(`/user/${user.id}`, formData)

    if(file){
      const formDataFile = new FormData();
      formDataFile.append('file', file); 
      const avatar = await api.post('user/avatar', formDataFile)
      newUserData.avatar = avatar;
    }

    dispatch(updateUser(newUserData.data))

    router.push("/profile")
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Edit Profile</h1>

      <form className={styles.form} onSubmit={handleSubmit}>

        <div className={styles.profilePicSection}>
          <img
            src={ formData.avatar || 'https://www.w3schools.com/howto/img_avatar.png' }
            alt="Profile"
            className={styles.profilePic}
          />
          <label htmlFor="profilePicUpload" className={styles.changePicBtn}>
            Change Profile Photo
          </label>
          <input
            id="profilePicUpload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={styles.fileInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Name</label>
          <input
            className={styles.input}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            maxLength={30}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Username</label>
          <input
            className={styles.input}
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            maxLength={30}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Website</label>
          <input
            className={styles.input}
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="https://"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Bio</label>
          <textarea
            className={styles.textarea}
            name="description"
            value={formData.description}
            onChange={handleChange}
            maxLength={150}
            placeholder="About you"
          ></textarea>
        </div>

        <hr className={styles.divider} />

        <div className={styles.formGroup}>
          <label className={styles.label}>Email</label>
          <input
            className={styles.input}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Phone Number</label>
          <input
            className={styles.input}
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Gender</label>
          <select
            className={styles.select}
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="prefer_not_say">Prefer not to say</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className={styles.changePasswordLink}>
          <a href="#" onClick={(e) => e.preventDefault()}>
            Change Password
          </a>
        </div>

        <button className={styles.submitBtn} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
