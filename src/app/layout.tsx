// src/app/layout.tsx
import './globals.css';
import Navbar from '@/components/NavBar';

export const metadata = {
  title: 'Mon Portfolio',
  description: 'Bienvenue sur mon portfolio',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
