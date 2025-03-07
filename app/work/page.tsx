'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
  {
    title: 'Project Ostéopathe',
    description: 'Une site vitrine moderne pour un cabinet d\'ostéopathie',
    image: '/osteo.webp',
    tags: ['React', 'Maps API', 'Tailwind CSS'],
    link: 'https://philipot-osteo-aigondigne-niort.fr',
    github: 'https://github.com/giantprolu/SiteOsteo',
  },
  {
    title: 'Project Dératisateur',
    description: 'Un vitrine pour un dératisateur professionnel',
    image: '/derat.webp',
    tags: ['React', 'Formspree', 'TypeScript', 'Tailwind CSS'],
    link: 'https://site-deratisation.vercel.app',
    github: 'https://github.com/giantprolu/Site_deratisation',
  },
  // {
  //   title: 'Project Three',
  //   description: 'AI-powered content management system',
  //   image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2370&auto=format&fit=crop',
  //   tags: ['Python', 'TensorFlow', 'React'],
  //   link: 'https://example.com',
  //   github: 'https://github.com',
  // },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Work() {
  return (
    <div className="py-12">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-8"
      >
        Mes travaux
      </motion.h1>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {projects.map((project) => (
          <motion.div
            key={project.title}
            variants={item}
            className="group relative bg-card rounded-lg overflow-hidden"
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-muted-foreground mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <Button variant="outline" size="sm" asChild>
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    Code
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}