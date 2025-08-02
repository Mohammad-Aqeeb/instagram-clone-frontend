import styles from './NotificationItem.module.css';
import Link from 'next/link';
import { formatDistanceToNowStrict } from 'date-fns';

export default function NotificationItem({ data }) {
  const { initiatorUser, notificationType, post, createdAt } = data;

  const timeAgo = formatDistanceToNowStrict(new Date(createdAt));

  const getShortTime = (time) => {
    const map = {
      seconds: 's',
      second: 's',
      minutes: 'm',
      minute: 'm',
      hours: 'h',
      hour: 'h',
      days: 'd',
      day: 'd',
      months: 'mo',
      month: 'mo',
      years: 'y',
      year: 'y',
    };
    return time
      .split(' ')
      .map((word) => (map[word] ? map[word] : word))
      .join('');
  };

  const shortTime = getShortTime(timeAgo);

  return (
    <div className={styles.notification}>
      <img
        src={initiatorUser?.avatar?.url || "https://www.w3schools.com/howto/img_avatar.png"}
        alt={`${initiatorUser.name}'s avatar`}
        className={styles.avatar}
        width={40}
        height={40}
      />
      <div className={styles.content}>
          <Link href={`/profile/${initiatorUser.username}`} className={styles.username}>
            {initiatorUser.name}
          </Link>{' '}
          {notificationType === 'likedPhoto' ? 'liked your photo' : 'started following you'}
          <span className={styles.time}>{shortTime}</span>
      </div>
      {notificationType === 'likedPhoto' && (
        <img
          src={post.file.url}
          alt="Post thumbnail"
          className={styles.thumbnail}
          width={40}
          height={40}
        />
      )}
    </div>
  );
}
