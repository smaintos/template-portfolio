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
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/owner');
      } else {
        setSession(session);
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
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl">Bienvenue sur la page des posts du propriétaire</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
        >
          Déconnexion
        </button>
      </div>

      {/* Formulaire d'upload d'image */}
      <div className="mb-4">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button
          onClick={uploadImage}
          disabled={uploading}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          {uploading ? 'Téléchargement...' : 'Uploader'}
        </button>
      </div>
    </div>
  );
}
