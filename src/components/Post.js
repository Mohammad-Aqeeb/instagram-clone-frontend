// components/Post.js
import { useState } from "react";
import api from "../utils/api";

export default function Post({ post, refreshPosts }) {
  const [liked, setLiked] = useState(post.likedByUser);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post.comments || []);

  const toggleLike = async () => {
    try {
      await api.post(`/posts/${post.id}/like`);
      setLiked(!liked);
      setLikesCount(liked ? likesCount - 1 : likesCount + 1);
      refreshPosts();
    } catch (err) {
      alert("Error liking post");
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    try {
      await api.post(`/posts/${post.id}/comment`, { text: comment });
      setComment("");
      refreshPosts();
    } catch {
      alert("Error adding comment");
    }
  };

  return (
    <div className="post">
      <h4>{post.username}</h4>
      {post.imageUrl && <img src={post.imageUrl} alt="post" />}
      <p>{post.caption}</p>
      <button onClick={toggleLike}>{liked ? "❤️" : "🤍"} {likesCount}</button>

      <div className="comments">
        {comments.map((c, i) => (
          <p key={i}>
            <b>{c.username}:</b> {c.text}
          </p>
        ))}
      </div>

      <form onSubmit={addComment} className="comment-form">
        <input
          type="text"
          placeholder="Add comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}
