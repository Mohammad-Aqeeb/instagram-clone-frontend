//src/app/profile/[username]/page.js

"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "./profile.module.css";
import { CgMenuGridR } from "react-icons/cg";
import { BiMoviePlay } from "react-icons/bi";
import { LuSquareUser } from "react-icons/lu";
import api from "@/service/axios";
import { useSelector } from "react-redux";

export default function OtherUserProfile() {
  const currentUser = useSelector((state)=>state.user.user)

  const { username } = useParams();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("posts");
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      if (username === currentUser?.username) {
        router.push("/profile");
        return;
      }
      try {
        const res = await api.get(`/user/${username}`);
        setUser(res.data.user);
        setIsFollowing(res.data.isviewerFollowed);
      } catch (err) {
        console.error("Error fetching user profile", err);
      }
    }

    fetchUser();
  }, [username]);

  const handleFollowClick = async () => {
    setIsFollowing((prev) => !prev);
    if(isFollowing === false){
      await api.post(`/user/follow/${user.id}`)
    }
    if(isFollowing === true){
      await api.post(`/user/unfollow/${user.id}`)
    }
  };

  if (!user) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.profileHeader}>
        <img
          src={ user.avatar?.url || "https://www.w3schools.com/howto/img_avatar.png" }
          alt="Profile"
          className={styles.profileImage}
        />
        <div className={styles.info}>
          <h2>{user.username}</h2>
          <p>{user.fullName}</p>
          <div className={styles.stats}>
            <span>
              <strong>{user?.posts?.length}</strong> posts
            </span>
            <span onClick={()=>{ router.push(`${username}/follow?tab=followers`)}} >
              <strong>{user?.follower?.length}</strong> followers
            </span>
            <span onClick={()=>{ router.push(`${username}/follow?tab=following`)}}>
              <strong>{user?.following?.length}</strong> following
            </span>
          </div>
        </div>
      </div>

      <span className={styles.description}>{user.description}</span>

      <div className={styles.actionButtons}>
        <button
          className={isFollowing ? styles.followingButton : styles.followButton}
          onClick={handleFollowClick}
        >
          {isFollowing ? "Following" : "Follow"}
        </button>
        <button className={styles.messageButton}>Message</button>
      </div>

      <div className={styles.tabSelector}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "posts" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("posts")}
        >
          <CgMenuGridR />
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "reels" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("reels")}
        >
          <BiMoviePlay />
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "tagged" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("tagged")}
        >
          <LuSquareUser />
        </button>
      </div>

      <div className={styles.postsGrid}>
        {user?.posts.map((post, index) => (
          <div key={index} className={styles.postItem} onClick={()=> router.push(`/post/${post.id}`)}>
            <img src={post.file.url} alt={`Post ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
