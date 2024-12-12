'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/auth-store';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setInitialized } = useAuthStore();

  useEffect(() => {
    useAuthStore.persist.rehydrate();
    setInitialized();
  }, [setInitialized]);

  return <>{children}</>;
}