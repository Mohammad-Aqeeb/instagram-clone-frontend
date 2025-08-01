'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';
import api from '@/service/axios';
import { useDispatch } from 'react-redux';
import { setUser } from '@/slices/userSlice';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
        const response = await api.post('/auth/login', { email, password });
        dispatch(setUser(response.data.user))
        const token = response.data.accessToken;
        localStorage.setItem('token', token);    
        router.push('/feed');
    } catch (err) {
        setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
        />
        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
}
