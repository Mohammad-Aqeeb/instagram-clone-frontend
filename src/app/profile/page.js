'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Profile.module.css";
import { CgMenuGridR } from "react-icons/cg";
import { BiMoviePlay } from "react-icons/bi";
import { LuSquareUser } from "react-icons/lu";
import { useSelector } from "react-redux";

export default function Profile() {
    const user= useSelector((state)=> state.user.user)
    
    const [activeTab, setActiveTab] = useState('posts');
    const router = useRouter();

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.profileHeader}>
                {
                    user.avatar ?
                    <img
                        src={user?.avatar?.url}
                        alt="Profile Picture"
                        width={120}
                        height={120}
                        className={styles.profileImage}
                    /> :
                    <img src='https://www.w3schools.com/howto/img_avatar.png' className={styles.profileImage}></img>
                }
                <div className={styles.info}>
                    <h2>{user.username}</h2>
                    <p>{user.fullName}</p>
                    <div className={styles.stats} >
                        <span><strong>{user?.posts?.length}</strong> posts</span>
                        <span onClick={() => router.push('/profile/follow?tab=followers')}><strong>{user?.follower?.length}</strong> followers</span>
                        <span onClick={() => router.push('/profile/follow?tab=following')}><strong>{user?.following?.length}</strong> following</span>
                    </div>
                </div>
            </div>
            <span className={styles.description}>{user.description}</span>

            <div className={styles.actionButtons}>
                <button className={styles.editButton} onClick={()=> router.push('profile/edit')}>Edit Profile</button>
                <button className={styles.shareButton}>Share Profile</button>
            </div>

            <div className={styles.tabSelector}>
                <button
                    className={`${styles.tabButton} ${activeTab === 'posts' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('posts')}
                >
                    <CgMenuGridR />
                </button>
                <button
                    className={`${styles.tabButton} ${activeTab === 'reels' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('reels')}
                >
                    <BiMoviePlay />
                </button>
                <button
                    className={`${styles.tabButton} ${activeTab === 'tagged' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('tagged')}
                >
                    <LuSquareUser />
                </button>
            </div>

            <div className={styles.postsGrid}>
                {user?.posts.map((post, index) => (
                    <div key={index} className={styles.postItem}>
                        <img src={post.file.url} alt={`Post ${index}`} />
                    </div>
                ))}
            </div>
        </div>
    );
}