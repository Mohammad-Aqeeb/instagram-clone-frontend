'use client';

import { RxCross2 } from "react-icons/rx";
import React, { useState, useEffect } from 'react';
import styles from './SearchPage.module.css';
import api from '@/service/axios';
import { useRouter } from "next/navigation";

export default function SearchPage() {
  const router = useRouter();

  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState([]);

  const handleSearchRemove = async (idToRemove) => {
    await api.delete(`user/recent-search/${idToRemove}`)
    const updatedHistory = history.filter((u) => u.recentSearch !== idToRemove);
    setHistory(updatedHistory);
  };

  const handleSearchAdd = async (idToadd) => {
    await api.post(`/user/recent-search` , {id : idToadd, type : 'user'})
  }
  
  useEffect(() => {
    async function getRecentSearch(){
      const response = await api.get(`/user?search=${input}`)
      setSearch(response.data);
    }
    getRecentSearch();
  }, [input]);

  useEffect(() => {
    async function getSearch(){
      const response = await api.get('/user/recent-search');
      setHistory(response.data);
    }
    getSearch();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Instagram Search</h1>

      <form className={styles.form}>
        <input
          type="text"
          placeholder="Search Instagram..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={styles.input}
        />
      </form>

      {input==='' && history.length > 0 && (
        <div className={styles.history}>
            <h3>Search History</h3>
            <ul className={styles.historyList}>
            {history.map((user, index) => (
              <li
                key={index}
                className={styles.historyItem}
                onClick={()=> router.push(`/profile/${user.username}`)}
              >
                {
                  user.avatar ? 
                  <img
                    src={user.avatar.url}
                    alt={user.username}
                    className={styles.profilePic}
                  /> : 
                  <img
                    src='https://www.w3schools.com/howto/img_avatar.png'
                    alt={user.username}
                    className={styles.profilePic}
                  />
                }
                
                <div className={styles.userInfo}>
                  <span className={styles.fullName}>{user.name}</span>
                  <span className={styles.username}>@{user.username}</span>
                </div>

                <button className={styles.removeButton} onClick={() => handleSearchRemove(user.recentSearch)}><RxCross2 /></button>
              </li>
            ))}
            </ul>
        </div>
       )}


      {input !== '' && (
        <div className={styles.results}>
          <h3>Results for: {input}</h3>
          <p>🔍 Showing results for "{input}"</p>

          {search.map((user, index) => (
              <li
                key={index}
                className={styles.historyItem}
                onClick={()=> {handleSearchAdd(user.id)}}
              >
                {
                  user.avatar ? 
                  <img
                      src={user.avatar.url}
                      alt={user.username}
                      className={styles.profilePic}
                  /> : 
                  <img
                      src='https://www.w3schools.com/howto/img_avatar.png'
                      alt={user.username}
                      className={styles.profilePic}
                  />
                }
                
                <div className={styles.userInfo}>
                  <span className={styles.fullName}>{user.name}</span>
                  <span className={styles.username}>@{user.username}</span>
                </div>
              </li>
            ))}
        </div>
      )}
    </div>
  );
}