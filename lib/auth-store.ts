import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
}

interface AuthState {
  user: User | null;
  isInitialized: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setInitialized: () => void;
}

const users = [
  {
    id: "1",
    email: "test@example.com",
    password: "test123",
    name: "Test User"
  },
  {
    id: "2",
    email: "mum@example.com",
    password: "test123",
    name: "Maman"
  }
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isInitialized: false,
      login: async (email: string, password: string) => {
        const user = users.find(u => u.email === email);
        if (!user || user.password !== password) {
          return false;
        }
        const { password: _, ...userWithoutPassword } = user;
        set({ user: userWithoutPassword });
        return true;
      },
      logout: () => set({ user: null }),
      setInitialized: () => set({ isInitialized: true }),
    }),
    {
      name: 'auth-storage',
    }
  )
);