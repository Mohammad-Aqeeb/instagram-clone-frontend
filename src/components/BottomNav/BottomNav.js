'use client';
import styles from './BottomNav.module.css';
import Link from 'next/link';
import { GrHomeRounded } from "react-icons/gr";
import { GrSearch } from "react-icons/gr";
import { BsPlusSquare } from "react-icons/bs";
import { useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/slices/userSlice';
import api from '@/service/axios';
import PrivateRoute from '../PrivateRoute';

const BottomNav = () => {
  const dispatch = useDispatch();
  const user= useSelector((state)=> state.user.user);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await api.get('user/self');
        dispatch(setUser(res.data));
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    }
    fetchUser();
  }, []);

  return (
    <PrivateRoute>
    <nav className={styles.bottomNav}>
      <Link href="/feed">
        <GrHomeRounded />
      </Link>
      <Link href="/search">
        <GrSearch />
      </Link>
      <Link href="/create-post">
        <BsPlusSquare />
      </Link>
      <Link href="/profile">
        <img src={user?.avatar?.url || 'https://www.w3schools.com/howto/img_avatar.png'} className={styles.postUserHeaderImage}/>
      </Link>
    </nav>
    </PrivateRoute>
  );
};

export default BottomNav;