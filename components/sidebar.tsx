'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { ModeToggle } from './mode-toggle';

const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Travaux', href: '/work' },
  { name: 'A propos', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Stage', href: '/stage' },
  { name: 'Veille', href: '/veille' },
];
const handleEmailClick = () => {
  window.location.href = 'mailto:nathnathchav@gmail.com';
};
const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/giantprolu', icon: Github },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/nathan-chavaudra/', icon: Linkedin },
  { name: 'Email', href: 'https://portfolio-three-khaki-87.vercel.app/contact', icon: Mail, onClick: handleEmailClick },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      <aside
        className={cn(
          'fixed top-0 left-0 w-[280px] h-full bg-background border-r z-40',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex-1">
            <Link href="/" className="block mb-12">
              <h1 className="text-2xl font-bold">Nathan Chavaudra</h1>
              <p className="text-muted-foreground">Développeur Full-Stack</p>
            </Link>

            <nav className="space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'block py-2 text-base transition-colors hover:text-primary',
                    pathname === item.href
                      ? 'text-primary font-medium'
                      : 'text-muted-foreground'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
            <ModeToggle />
          </div>
        </div>
      </aside>
    </>
  );
}