// src/app/owner/post/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient';
import { Session } from '@supabase/supabase-js';

export default function OwnerPostPage() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // États pour l'upload d'image
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      console.log('Session data:', data);
      console.log('Session error:', error);
      if (error || !data.session) {
        router.push('/owner');
      } else {
        setSession(data.session);
        console.log('Session set:', data.session);
      }
    };

    checkSession();
  }, [router]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert('Erreur lors de la déconnexion : ' + error.message);
    } else {
      router.push('/owner');
    }
  };

  // Gestion du changement de fichier
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  // Fonction pour uploader l'image
  const uploadImage = async () => {
    try {
      setUploading(true);

      if (!image) return;

      const fileExt = image.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('uploads')
        .upload(filePath, image);

      if (uploadError) {
        throw uploadError;
      }

      alert('Image uploadée avec succès !');
      setImage(null); // Réinitialiser l'état de l'image
    } catch (error) {
      console.error("Erreur lors du téléchargement de l'image :", error);
      alert("Erreur lors du téléchargement de l'image.");
    } finally {
      setUploading(false);
    }
  };

  if (!isMounted) {
    return null;
  }

  if (!session) {
    return <div className="flex items-center justify-center min-h-screen">Chargement...</div>;
  }

  return (
    <main className="relative p-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl mb-6">Bienvenue sur la page des posts du propriétaire</h1>

        {/* Formulaire d'upload d'image et bouton Déconnexion */}
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full md:w-auto px-4 py-2 bg-transparent border border-foreground text-foreground rounded"
          />
          <button
            onClick={uploadImage}
            disabled={uploading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 disabled:bg-gray-400 w-full md:w-auto"
          >
            {uploading ? 'Téléchargement...' : 'Uploader'}
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300 w-full md:w-auto"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </main>
  );
}
