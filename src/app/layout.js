import './globals.css';
import ReduxProvider from '@/store/Provider';
import LayoutWrapper from './LayoutWrapper';

export const metadata = {
  title: 'Instagram Clone',
  description: 'Made with Next.js and NestJS',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}