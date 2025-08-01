import styles from './page.module.css';
import Link from 'next/link';

export default function HomePage() {

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to InstaClone 📸</h1>
      <p className={styles.subtitle}>A simple Instagram clone built with Next.js + NestJS</p>

      <div className={styles.links}>
        <Link href="/login">
          <button className={styles.button}>Login</button>
        </Link>
        <Link href="/register">
          <button className={styles.button}>Register</button>
        </Link>
      </div>
    </div>
  );
}