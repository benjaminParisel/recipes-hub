'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChefHat, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { useAuthStore } from '@/lib/auth-store';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const routes = [
  { href: '/recipes', label: 'Recettes' },
  { href: '/menu-generator', label: 'Générateur de Menu' },
];

export function Navigation() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  if (!user) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/recipes" className="mr-6 flex items-center space-x-2">
            <ChefHat className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              Livre de Recettes
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={
                  pathname === route.href
                    ? 'text-foreground'
                    : 'text-foreground/60 transition-colors hover:text-foreground'
                }
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <SheetHeader>
              <SheetTitle className="flex items-center space-x-2">
                <ChefHat className="h-6 w-6" />
                <span>Livre de Recettes</span>
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col space-y-4 mt-4">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={
                    pathname === route.href
                      ? 'text-foreground'
                      : 'text-foreground/60 transition-colors hover:text-foreground'
                  }
                >
                  {route.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">Menu utilisateur</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href="/profile">
                <DropdownMenuItem className="cursor-pointer">
                  Mon Profil
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-red-600 dark:text-red-400"
                onClick={() => {
                  logout();
                  window.location.href = '/login';
                }}
              >
                Se déconnecter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}