import './globals.css';
import BottomNav from '@/components/BottomNav';
import ReduxProvider from '@/store/Provider';

export const metadata = {
  title: 'Instagram Clone',
  description: 'Made with Next.js and NestJS',
};

export default function RootLayout({ children }) { 
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <main className='main'>{children}</main>
          <BottomNav/>
        </ReduxProvider>
      </body>
    </html>
  );
}