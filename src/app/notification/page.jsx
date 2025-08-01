'use client'

import NotificationItem from '@/components/NotificationItem';
import styles from './notification.module.css';
import { useEffect, useState } from 'react';
import api from '@/service/axios';

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState([])
    
    useEffect(()=>{
      async function getNotification() {
        const response = await api.get('/notifications')
        setNotifications(response.data);
      }

      getNotification();
    }, [])

    return (
    <div className={styles.container}>
      <h2 className={styles.header}>Notifications</h2>
      {notifications.map((notif) => (
        <NotificationItem key={notif.id} data={notif} />
      ))}
    </div>
  );
}