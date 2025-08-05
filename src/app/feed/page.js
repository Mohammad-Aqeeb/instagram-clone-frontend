"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../service/axios";
import styles from "./feed.module.css";
import { FaRegHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa6";
import { TbLocationShare } from "react-icons/tb";
import { RiBookmarkLine } from "react-icons/ri";
import { FcLike } from "react-icons/fc";

export default function FeedPage() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function toggleLike(id) {
    await api.post(`posts/like/${id}`);
  }

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/posts?page=1&limit=10");
        setPosts(res.data.items);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  if (loading) return <p className={styles.loading}>Loading posts...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Instagram</h1>
        <FaRegHeart
          className={styles.heardIcon}
          onClick={() => router.push("/notification")}
        />
      </div>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className={styles.postCard}>
            <div className={styles.postUserHeader}>
              {post?.user?.avatar ? (
                <img
                  src={post.user.avatar.url}
                  className={styles.postUserHeaderImage}
                ></img>
              ) : (
                <img
                  src="https://www.w3schools.com/howto/img_avatar.png"
                  className={styles.postUserHeaderImage}
                ></img>
              )}
              <p className={styles.username} onClick={()=> router.push(`/profile/${post.user.username}`)}>{post.user.username}</p>
            </div>
            <img
              src={post.file?.url}
              alt={post.caption}
              className={styles.image}
            />
            <div className={styles.postUserLikeCommentsSaveContainer}>
              <div className={styles.postUserLikeCommentsContainer}>
                <div className={styles.postUserLikeContainer}>
                  {post.isViewerLiked ? (
                    <FcLike
                      className={styles.heardIcon}
                      onClick={() => {
                        toggleLike(post.id);
                      }}
                    />
                  ) : (
                    <FaRegHeart
                      className={styles.heardIcon}
                      onClick={() => {
                        toggleLike(post.id);
                      }}
                    />
                  )}
                  <div className={styles.postUserLikeCount} onClick={()=> {router.push(`/post/${post.id}/likes`)}}>
                    {post.like.length}
                  </div>
                </div>

                <FaRegComment className={styles.commentIcon} onClick={()=> router.push(`/post/${post.id}/comment`)}/>
                <TbLocationShare className={styles.heardIcon} />
              </div>
              <div>
                <RiBookmarkLine className={styles.heardIcon} />
              </div>
            </div>
            {post.description && (
              <div className={styles.postCaptionContainer}>
                <p className={styles.caption}>{post.user.username}.</p>
                <div>{post.description}</div>
              </div>
            )}

            {post.tags && post.tags.length > 0 && (
              <div className={styles.tagsContainer}>
                {post.tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>
                    #{tag.name}
                  </span>
                ))}
              </div>
            )}

          </div>
        ))
      )}
    </div>
  );
}
