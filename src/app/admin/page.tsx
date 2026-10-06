'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, [router]);

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center p-6 text-center">
      <p className="text-xs font-bold text-neutral-500">Redirecting to Notes Store...</p>
    </div>
  );
}
