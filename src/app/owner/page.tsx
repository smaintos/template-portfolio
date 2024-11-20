// src/app/owner/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';
export default function OwnerLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // L'utilisateur est déjà connecté
        router.push('/owner/post');
      }
    };

    checkSession();
  }, [router]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert('Erreur de connexion : ' + error.message);
    } else {
      // Rediriger vers /owner/post après la connexion réussie
      router.push('/owner/post');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl mb-4 text-center">Connexion Propriétaire</h2>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            className="w-full border px-3 py-2 rounded"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Votre email"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Mot de passe</label>
          <input
            className="w-full border px-3 py-2 rounded"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Votre mot de passe"
          />
        </div>
        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200" type="submit">
          Se connecter
        </button>
      </form>
    </div>
  );
}
