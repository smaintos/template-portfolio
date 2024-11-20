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
      const urls = list.map((file) => {
        const { data } = supabase.storage
          .from('uploads')
          .getPublicUrl(file.name);
        return data.publicUrl;
      });
      setImages(urls);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <main className="relative p-6 min-h-screen">
      <br></br>      <br></br>      <br></br>      <br></br>
      <div className="relative z-10">
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl w-full">
            {images.map((url, index) => (
              <div
                key={index}
                className="relative w-full transform transition-transform duration-300 hover:scale-105"
                style={{ paddingBottom: '150%' }}
              >
                <div
                  className="ambilight"
                  style={{ backgroundImage: `url(${url})` }}
                ></div>
                <img
                  src={url}
                  alt={`Image ${index}`}
                  className="absolute top-0 left-0 w-full h-full object-cover z-10"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
