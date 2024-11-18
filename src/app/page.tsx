// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const uploadImage = async () => {
    try {
      setUploading(true);

      if (!image) return;

      const fileExt = image.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('uploadart')
        .upload(filePath, image);

      if (uploadError) {
        throw uploadError;
      }

      await fetchImages();
    } catch (error) {
      console.error('Erreur lors du téléchargement de l\'image :', error);
    } finally {
      setUploading(false);
    }
  };

  const fetchImages = async () => {
    const { data: list, error } = await supabase.storage
      .from('uploadart')
      .list();

    if (error) {
      console.error('Erreur lors de la récupération des images :', error);
    } else {
      const urls = await Promise.all(
        list!.map(async (file) => {
          const { data } = supabase.storage
            .from('uploadart')
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

      <div className="grid grid-cols-3 gap-4">
        {images.map((url, index) => (
          <img key={index} src={url} alt={`Image ${index}`} className="w-full h-auto" />
        ))}
      </div>
    </main>
  );
}
