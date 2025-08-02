'use client';
import { useState } from 'react';
import styles from './ProfilePage.module.css';
import { useSelector } from 'react-redux';

export default function FollowPage() {
  const user = useSelector((state)=> state.user.user);
  const [activeTab, setActiveTab] = useState('followers');
  const follower = user?.follower;
  const following = user?.following;

  console.log(follower);
  console.log(following);
  
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.pageContainer}>
    <h1 className={styles.title}>Followers & Following</h1>

      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${activeTab === 'followers' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('followers')}
        >
          Followers
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'following' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('following')}
        >
          Following
        </button>
      </div>

      {
        activeTab === "followers" ? 
          <div className={styles.list}>
            {follower.map((user) => (
              <div key={user.id} className={styles.userItem}>
                <img src={user.user.avatar.url || 'https://www.w3schools.com/howto/img_avatar.png'} alt={user.name} className={styles.avatar} />
                <div className={styles.userInfo}>
                  <p className={styles.name}>{user.user.name}</p>
                  <p className={styles.username}>@{user.user.username}</p>
                </div>
              </div>
            ))}
          </div> : 
          <div className={styles.list}>
            {following.map((user) => (
              <div key={user.id} className={styles.userItem}>
                <img src={user.target.avatar?.url || 'https://www.w3schools.com/howto/img_avatar.png'} alt={user.name} className={styles.avatar} />
                <div className={styles.userInfo}>
                  <p className={styles.name}>{user.target.name}</p>
                  <p className={styles.username}>@{user.target.username}</p>
                </div>
              </div>
            ))}
          </div>
      }
      
    </div>
  );
}
