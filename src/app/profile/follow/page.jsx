'use client';
import { useEffect, useState } from 'react';
import styles from './ProfilePage.module.css';
import { useSelector } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import Spinner from '@/components/Spinner/Spinner';
import PrivateRoute from '@/components/PrivateRoute';

export default function FollowPage() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');  

  const user = useSelector((state)=> state.user.user);
  const [activeTab, setActiveTab] = useState(tab);
  const follower = user?.follower;
  const following = user?.following;

  useEffect(() => {
    router.push(`/profile/follow?tab=${activeTab}`)
  }, [activeTab]);

  if (!user) return <Spinner/>

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
                  <p className={styles.name}>{user.user.name}</p>
                  <p className={styles.username}>@{user.user.username}</p>
                </div>
              </div>
            ))}
          </div> : 
          <div className={styles.list}>
            {following.map((user) => (
              <div key={user.id} className={styles.userItem} onClick={()=>{ router.push(`/profile/${user.target.username}`)}}>
                <img src={user.target?.avatar?.url || 'https://www.w3schools.com/howto/img_avatar.png'} alt={user.name} className={styles.avatar} />
                <div className={styles.userInfo}>
                  <p className={styles.name}>{user.target.name}</p>
                  <p className={styles.username}>@{user.target.username}</p>
                </div>
              </div>
            ))}
          </div>
      }
      
    </div>
    </PrivateRoute>
  );
}
