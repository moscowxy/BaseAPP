import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>BaseAPP</title>
        <meta name="description" content="Base Miniapp starter" />
      </Head>
      <main className={styles.main}>
        <h1>Welcome to BaseAPP</h1>
        <p>Use this starter to build your Base Miniapp with Farcaster authentication.</p>
      </main>
    </div>
  );
}
