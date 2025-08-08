'use client';

import { usePathname } from 'next/navigation';
import BottomNav from '@/components/BottomNav/BottomNav';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const showBottomNav = pathname !== '/';

  return (
    <>
      <main className="main">{children}</main>
      {showBottomNav && <BottomNav />}
    </>
  );
}
