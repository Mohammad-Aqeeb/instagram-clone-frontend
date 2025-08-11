import styles from './page.module.css';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.logo}>Instagram</h1>
        <p className={styles.subtitle}>A simple InstaClone built with Next.js + NestJS</p>
        <Link href="/login">
          <button className={styles.loginBtn}>Log In</button>
        </Link>
        <Link href="/register">
          <button className={styles.signupBtn}>Sign Up</button>
        </Link>
        <div className={styles.orSeparator}>OR</div>
        <div className={styles.socialLogin}>
          <a href="#" className={styles.socialLink}>Log in with Facebook</a>
        </div>
        {/* <p className={styles.downloadText}>Get the app.</p>
        <div className={styles.badges}>
          <img src="/appstore.png" alt="App Store" />
          <img src="/googleplay.png" alt="Google Play" />
        </div> */}
      </div>
    </div>
  );
}
