'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Spinner from './Spinner/Spinner';

export default function PrivateRoute({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      try {
          const token = localStorage.getItem('token');
          if (token) {
            setIsAuthenticated(true);
          } else {
            router.replace('/login');
          }
      } catch (err) {
        console.error('Auth check failed:', err);
        router.replace('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) return <Spinner />;

  if (!isAuthenticated) return null;

  return children;
}
