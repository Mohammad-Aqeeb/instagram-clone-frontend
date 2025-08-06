'use client'
import { useEffect, useState } from 'react';
import styles from './likes.module.css';
import api from '@/service/axios';
import { useParams, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';


export default function LikesPage() {
  const params = useParams();
  const router = useRouter();

  const currentuser = useSelector((state)=> state.user.user);
  const [likes , setLikes] = useState([]);
  
  useEffect(()=>{

    async function getLikes() {
        try {
            const res = await api.get(`/posts/likes/${params.id}`);
            console.log(res);
            
            setLikes(res.data);
        } catch (error) {
            console.error('Error fetching likes:', error);
            return [];
        }
    }

    getLikes()
  }, [])

  const handleFollowToggle = async (targetUserId) => {
    try {
      const updatedLikes = likes.map((user) => {
        if (user.id === targetUserId) {
          return {
            ...user,
            isViewerFollowed: !user.isViewerFollowed,
          };
        }
        return user;
      });

      setLikes(updatedLikes);

      if (likes.find(user => user.id === targetUserId)?.isViewerFollowed) {
        await api.post(`/user/unfollow/${targetUserId}`);
      } 
      else {
        await api.post(`/user/follow/${targetUserId}`);
      }

    } catch (error) {
      console.error('Failed to toggle follow state:', error);
    }
  };

  if (!likes.length) {
    return <div className={styles.container}>No likes found.</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Liked by</h1>
      <ul className={styles.list}>
        {likes.map((user) => (
          <li key={user.id} className={styles.userItem}>
            <div className={styles.avatarName}>
              <img
                src={user?.avatar?.url || 'https://www.w3schools.com/howto/img_avatar.png'}
                alt={user.name}
                className={styles.avatar}
              />
              <span className={styles.name} onClick={()=> router.push(`/profile/${user.username}`)}>{user.name}</span>
            </div>

            {user.id !== currentuser?.id && (
              <button
                className={`${styles.followBtn} ${user.isViewerFollowed ? styles.unfollow : styles.follow}`}
                onClick={() => handleFollowToggle(user.id)}
              >
                {user.isViewerFollowed ? 'Unfollow' : 'Follow'}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
