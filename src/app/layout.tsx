// src/app/layout.tsx
import '@radix-ui/themes/styles.css';  // Importation du CSS global de Radix UI Themes
import './globals.css';  // Importation de vos styles globaux
import { Theme } from '@radix-ui/themes';  // Importer le composant Theme de Radix UI Themes
import Navbar from '@/components/NavBar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Theme>
          <Navbar />
          <main>{children}</main> {/* Ajout d'un padding top pour éviter que le contenu soit masqué par la Navbar */}
        </Theme>
      </body>
    </html>
  );
}
