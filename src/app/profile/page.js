'use client'
import { FiLogOut } from "react-icons/fi";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Profile.module.css";
import { CgMenuGridR } from "react-icons/cg";
import { BiMoviePlay } from "react-icons/bi";
import { LuSquareUser } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "@/components/Spinner/Spinner";
import PrivateRoute from "@/components/PrivateRoute";
import { logoutUser } from "@/slices/userSlice";

export default function Profile() {
    const dispatch = useDispatch();
    const user= useSelector((state)=> state.user.user)
    
    const [activeTab, setActiveTab] = useState('posts');
    const router = useRouter();

    if (!user) {
        return <Spinner/>
    }

    const handleLogout = () => {
        dispatch(logoutUser())
        router.push('/login')
    };

    return (
        <PrivateRoute>
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
                    <div className={styles.logoutIconContainer}>
                        <h2>{user.username}</h2>
                        <FiLogOut className={styles.logoutIcon} onClick={handleLogout} /> 
                    </div>
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
                    <div key={index} className={styles.postItem} onClick={()=> router.push(`/post/${post.id}`)}>
                        <img src={post.file.url} alt={`Post ${index}`} />
                    </div>
                ))}
            </div>
        </div>
        </PrivateRoute>
    );
}