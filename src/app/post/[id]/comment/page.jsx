'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import styles from './comment.module.css';
import api from '@/service/axios';
import { FaRegHeart } from 'react-icons/fa6';
import { useSelector } from 'react-redux';

export default function CommentsPage() {
  const router = useRouter();
  const { id } = useParams();

  const currentUser = useSelector((state)=> state.user.user)
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyInputs, setReplyInputs] = useState({});

  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState('');

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
  }

  const handleUpdateComment = async (commentId) => {
    if (!editCommentText.trim()) return;

    try {
      const res = await api.patch(`/posts/comment/${commentId}`, {
        text: editCommentText,
      });

      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId ? { ...comment, text: res.data.text } : comment
        )
      );

      setEditCommentId(null);
      setEditCommentText('');
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await api.delete(`/posts/comment/${commentId}`);
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleLikeComment = async (commentId) => {
    try {
      const res = await api.post(`/posts/comment/like/${commentId}`);
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId
            ? { ...comment, isViewerLiked: res.data.isViewerLiked, likeCount: res.data.likeCount }
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
                <span className={styles.name} onClick={() => router.push(`/profile/${comment.user.username}`)}>
                  {comment.user.username}
                </span>
                <div className={styles.commentLikesContainer}>
                  <button onClick={() => handleLikeComment(comment.id)} className={styles.likeButton}>
                    {comment.isViewerLiked ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1rem" height="1rem" fill="red">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    ) : (
                      <FaRegHeart />
                    )}
                  </button>
                  {comment.likeCount}
                </div>
              </div>

              <span className={styles.body}>{comment.text}</span>

              <div className={styles.actions}>
                <button
                  onClick={() => setReplyInputs((prev) => ({ ...prev, [comment.id]: '' }))}
                  className={styles.replyButton}
                >
                  Reply
                </button>

                {comment.user.id === currentUser.id && (
                  <>
                    <button
                      onClick={() => {
                        setEditCommentId(comment.id);
                        setEditCommentText(comment.text);
                      }}
                      className={styles.editButton}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className={styles.deleteButton}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>

              {editCommentId === comment.id && (
                <div className={styles.editInputWrapper}>
                  <input
                    type="text"
                    value={editCommentText}
                    onChange={(e) => setEditCommentText(e.target.value)}
                    className={styles.input}
                  />
                  <button
                    onClick={() => handleUpdateComment(comment.id)}
                    className={styles.postButton}
                    disabled={!editCommentText.trim() || isSubmitting}
                  >
                    Update
                  </button>
                </div>
              )}

              {replyInputs[comment.id] !== undefined && (
                <div className={styles.replyInputWrapper}>
                  <input
                    type="text"
                    placeholder="Write a reply..."
                    value={replyInputs[comment.id]}
                    onChange={(e) =>
                      setReplyInputs((prev) => ({ ...prev, [comment.id]: e.target.value }))
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
                    <span className={styles.name} onClick={() => router.push(`/profile/${reply.user.username}`)}>
                      {reply.user.username}
                    </span>
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
