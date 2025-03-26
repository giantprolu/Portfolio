'use client';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-[80vh] flex items-center">
      <div className="max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Bienvenue sur le portfolio de <br /> Nathan Chavaudra
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground">
          Développeur Full-Stack et designer passionné, 
          je conçois des expériences numériques modernes et intuitives. 
          Spécialisé dans le développement d’applications web performantes, 
          je mets un point d’honneur à optimiser l’expérience utilisateur et 
          les performances techniques.
        </p>
        <div className="mt-8 grid grid-cols-3 gap-4">
          <Link href="/work">
            <Button className="w-full bg-white text-black hover:bg-black hover:text-white">
              Voir mes travaux
            </Button>
          </Link>
          <Link href="/about">
            <Button className="w-full bg-white text-black hover:bg-black hover:text-white">
              En savoir plus sur moi
            </Button>
          </Link>
          <Link href="/contact">
            <Button className="w-full bg-white text-black hover:bg-black hover:text-white">
              Me contacter
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
