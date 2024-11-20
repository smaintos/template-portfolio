// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
  const [images, setImages] = useState<string[]>([]);

  const fetchImages = async () => {
    const { data: list, error } = await supabase.storage
      .from('uploads')
      .list('', { limit: 100 });

    if (error) {
      console.error('Erreur lors de la récupération des images :', error);
    } else if (list) {
      const urls = await Promise.all(
        list.map(async (file) => {
          const { data } = supabase.storage
            .from('uploads')
            .getPublicUrl(file.name);
          return data.publicUrl;
        })
      );
      setImages(urls);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-4xl font-bold mb-4">Bienvenue sur mon portfolio</h1>

      <div className="grid grid-cols-3 gap-4">
        {images.map((url, index) => (
          <img key={index} src={url} alt={`Image ${index}`} className="w-full h-auto" />
        ))}
      </div>
    </main>
  );
}
