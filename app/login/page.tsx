'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ChefHat } from 'lucide-react';
import { useAuthStore } from '@/lib/auth-store';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { login, user, isInitialized } = useAuthStore();

  useEffect(() => {
    if (user && isInitialized) {
      router.push('/recipes');
    }
  }, [user, router, isInitialized]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      
      if (success) {
        toast({
          title: "Connexion réussie",
          description: "Vous allez être redirigé...",
        });
        router.push('/recipes');
      } else {
        toast({
          title: "Erreur d'authentification",
          description: "Email ou mot de passe incorrect",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (user && isInitialized) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="flex flex-col items-center space-y-2">
          <ChefHat className="h-12 w-12 text-primary" />
          <h1 className="text-2xl font-bold">Bienvenue sur RecipeHub</h1>
          <p className="text-muted-foreground">Connectez-vous pour continuer</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="exemple@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </Button>
        </form>

        <div className="text-sm text-center text-muted-foreground">
          <p>Compte de test:</p>
          <p>Email: test@example.com</p>
          <p>Mot de passe: test123</p>
        </div>
      </div>
    </div>
  );
}