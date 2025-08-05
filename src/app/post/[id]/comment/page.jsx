'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from './comment.module.css';
import api from '@/service/axios';

export default function CommentsPage() {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  
  useEffect(() => {
    async function getComments(){
        try{
            if(id){
                const res = await api.get(`/posts/comments/${id}`)
                setComments(res.data)
            }
        }
        catch(error){
            console.error("Error fetching comments:", error)
        }
    }
    getComments();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comments for Post #{id}</h1>
      {comments.map((comment) => (
        <div key={comment.id} className={styles.comment}>
          <div className={styles.name}>{comment.name}</div>
          <div className={styles.body}>{comment.body}</div>
        </div>
      ))}
    </div>
  );
}
