'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from './comment.module.css';
import api from '@/service/axios';

export default function CommentsPage() {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyInputs, setReplyInputs] = useState({});

  console.log(replyInputs);
  
  useEffect(() => {
    async function getComments() {
      try {
        if (id) {
          const res = await api.get(`/posts/comments/${id}`);
          setComments(res.data);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    }
    getComments();
  }, [id]);

  async function handleAddComment(replyToId = null) {
    const text = replyToId ? replyInputs[replyToId] : newComment;
    if (!text.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await api.post(`/posts/comment`, {
        postID: id,
        text,
        replyCommentID: replyToId,
      });

      if (replyToId) {
        setComments((prev) =>
          prev.map((comment) =>
            comment.id === replyToId
              ? { ...comment, replies: [...(comment.replies || []), res.data] }
              : comment
          )
        );
        setReplyInputs((prev) => ({ ...prev, [replyToId]: '' }));
      } else {
        setComments((prev) => [...prev, res.data]);
        setNewComment('');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLikeComment = async (commentId) => {
    try {
      const res = await api.post(`/posts/comments/${commentId}/like`);
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId
            ? { ...comment, likes: res.data.likes }
            : comment
        )
      );
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Comments</h2>

      <div className={styles.commentsWrapper}>
        {comments.map((comment) => (
          <div key={comment.id} className={styles.comment}>
            <div className={styles.avatar}>
              <img src={comment?.user?.avatar?.url || 'https://www.w3schools.com/howto/img_avatar.png'} />
            </div>
            <div className={styles.content}>

              <div className={styles.commentHeader}>
                <span className={styles.name}>{comment.user.username}</span>
                <button
                  onClick={() => handleLikeComment(comment.id)}
                  className={styles.likeButton}
                >
                  ❤️ {comment.likes || 0}
                </button>
              </div>

              <span className={styles.body}>{comment.text}</span>

              <div className={styles.actions}>
                <button
                  onClick={() =>
                    setReplyInputs((prev) => ({
                      ...prev,
                      [comment.id]: prev[comment.id] ? '' : '',
                    }))
                  }
                  className={styles.replyButton}
                >
                  Reply
                </button>
              </div>

              {replyInputs[comment.id] !== undefined && (
                <div className={styles.replyInputWrapper}>
                  <input
                    type="text"
                    placeholder="Write a reply..."
                    value={replyInputs[comment.id]}
                    onChange={(e) =>
                      setReplyInputs((prev) => ({
                        ...prev,
                        [comment.id]: e.target.value,
                      }))
                    }
                    className={styles.input}
                  />
                  <button
                    onClick={() => handleAddComment(comment.id)}
                    disabled={!replyInputs[comment.id].trim() || isSubmitting}
                    className={styles.postButton}
                  >
                    Reply
                  </button>
                </div>
              )}

              {comment.replies?.map((reply) => (
                <div key={reply.id} className={styles.reply}>
                  <div className={styles.avatar}>
                    <img src={reply?.user?.avatar?.url || 'https://www.w3schools.com/howto/img_avatar.png'} />
                  </div>
                  <div className={styles.content}>
                    <span className={styles.name}>{reply.user.username}</span>
                    <span className={styles.body}>{reply.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.inputWrapper}>
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className={styles.input}
        />
        <button
          onClick={() => handleAddComment(null)}
          disabled={!newComment.trim() || isSubmitting}
          className={styles.postButton}
        >
          Post
        </button>
      </div>
    </div>
  );
}
