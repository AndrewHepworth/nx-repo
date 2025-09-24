// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';

import NxWelcome from './nx-welcome';

export function App() {
  return (
    <div className={styles.wheel}>
      <span className={styles.line}></span>
      <span className={styles.line}></span>
      <span className={styles.line}></span>
      <span className={styles.line}></span>
      <span className={styles.line}></span>
      <span className={styles.line}></span>

      <div className={styles.cabin}></div>
      <div className={styles.cabin}></div>
      <div className={styles.cabin}></div>
      <div className={styles.cabin}></div>
      <div className={styles.cabin}></div>
      <div className={styles.cabin}></div>
    </div>
  );
}

export default App;
