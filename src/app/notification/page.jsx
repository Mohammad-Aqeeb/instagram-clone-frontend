'use client'

import styles from './notification.module.css';
import { useEffect, useState } from 'react';
import api from '@/service/axios';
import NotificationItem from '@/components/NotificationItem/NotificationItem';
import PrivateRoute from '@/components/PrivateRoute';

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
      <PrivateRoute>
      <div className={styles.container}>
        <h2 className={styles.header}>Notifications</h2>
        {notifications.map((notif) => (
          <NotificationItem key={notif.id} data={notif} />
        ))}
      </div>
      </PrivateRoute>
  );
}