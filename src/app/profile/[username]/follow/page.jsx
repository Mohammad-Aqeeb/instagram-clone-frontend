'use client';
import { useEffect, useState } from 'react';
import styles from './followPage.module.css';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import api from '@/service/axios';
import PrivateRoute from '@/components/PrivateRoute';

export default function FollowPage() {

  const router = useRouter();
  const {username} = useParams()
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab'); 

  const [activeTab, setActiveTab] = useState(tab);
  const [user, setUser] = useState(null);
  const follower = user?.follower || [];
  const following = user?.following || [];

  useEffect(() => {
    router.push(`/profile/${username}/follow?tab=${activeTab}`)
  }, [activeTab]);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await api.get(`/user/${username}`);
        console.log(res);
        setUser(res.data.user);
      } catch (err) {
        console.error("Error fetching user profile", err);
      }
    }

    fetchUser();
  }, []);

  return (
    <PrivateRoute>
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
              <div key={user.id} className={styles.userItem} onClick={()=>{ router.push(`/profile/${user.user.username}`)}}>
                <img src={user?.user?.avatar?.url || 'https://www.w3schools.com/howto/img_avatar.png'} alt={user.name} className={styles.avatar} />
                <div className={styles.userInfo}>
                  <p className={styles.name}>{user?.user?.name}</p>
                  <p className={styles.username}>@{user?.user?.username}</p>
                </div>
              </div>
            ))}
          </div> : 
          <div className={styles.list}>
            {following.map((user) => (
              <div key={user.id} className={styles.userItem} onClick={()=>{ router.push(`/profile/${user.target.username}`)}}>
                <img src={user?.target?.avatar?.url || 'https://www.w3schools.com/howto/img_avatar.png'} alt={user.name} className={styles.avatar} />
                <div className={styles.userInfo}>
                  <p className={styles.name}>{user?.target?.name}</p>
                  <p className={styles.username}>@{user?.target?.username}</p>
                </div>
              </div>
            ))}
          </div>
      }
    </div>
    </PrivateRoute>
  );
}
