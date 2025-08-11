'use client';

import { usePathname, useRouter } from 'next/navigation';
import BottomNav from '@/components/BottomNav/BottomNav';
import { useEffect, useState } from 'react';
import Spinner from '@/components/Spinner/Spinner';

export default function LayoutWrapper({ children }) {

  const router = useRouter();
  const pathname = usePathname();
  const showBottomNav = pathname !== '/' && pathname !== '/register' && pathname !== '/login';
  const [loading, setLoading] = useState(true);
  
  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(token){
      router.replace('/feed');
    }
    setLoading(false)
  },[])

  if(loading) return <Spinner/>

  return (
    <>
      <main className="main">{children}</main>
      {showBottomNav && <BottomNav />}
    </>
  );
}