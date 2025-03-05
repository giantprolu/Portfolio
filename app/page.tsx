'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-[80vh] flex items-center">
      <div className="max-w-2xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          Bienvenue sur le portfolio de <br/> Nathan Chavaudra
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl text-muted-foreground"
        >
          Développeur Full-Stack et designer passionné, 
          je conçois des expériences numériques modernes et intuitives. 
          Spécialisé dans le développement d’applications web performantes, 
          je mets un point d’honneur à optimiser l’expérience utilisateur et 
          les performances techniques.
        </motion.p>
      </div>
    </div>
  );
}