import Link from 'next/link';
import styles from './register.module.css';

export default function RegisterPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.logo}>Instagram</h1>
        <form className={styles.form}>
          <input type="text" placeholder="Email" className={styles.input} />
          <input type="text" placeholder="Full Name" className={styles.input} />
          <input type="text" placeholder="Username" className={styles.input} />
          <input type="password" placeholder="Password" className={styles.input} />
          <button type="submit" className={styles.button}>Sign up</button>
        </form>
        <p className={styles.text}>
          Have an account? <Link href="/login" className={styles.link}>Log in</Link>
        </p>
      </div>
    </div>
  );
}
