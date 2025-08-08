import styles from './Spinner.module.css';

export default function Spinner() {
  return (
    <div className={styles.container}>
      <div className={styles.profileRow}>
        <div className={styles.circle}></div>
        <div className={styles.textLineShort}></div>
      </div>
      
      <div className={styles.image}></div>

      <div className={styles.textLine}></div>
      <div className={styles.textLine}></div>
      <div className={styles.textLineShort}></div>
    </div>
  );
}