"use client";

import { useState, useEffect } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
  {
    title: 'Site Ostéopathe',
    description: 'Une site vitrine moderne pour un cabinet d\'ostéopathie',
    image: '/osteo.webp',
    tags: ['React', 'Maps API', 'Tailwind CSS'],
    link: 'https://philipot-osteo-aigondigne-niort.fr',
    github: 'https://github.com/giantprolu/SiteOsteo',
  },
  {
    title: 'G&K Hygiène 3D',
    description: 'Un site vitrine pour un dératisateur professionnel à Niort',
    image: '/logo.webp',
    tags: ['React', 'Formspree', 'TypeScript', 'Tailwind CSS'],
    link: 'https://gk-hygiene-3d.fr',
    github: 'https://github.com/giantprolu/Site-deratisation-greg',
  },
  {
    title: 'Hygiène Protect 3D',
    description: 'Un site vitrine pour un dératisateur professionnel à Paris',
    image: '/derat.webp',
    tags: ['React', 'Formspree', 'TypeScript', 'Tailwind CSS'],
    link: 'https://site-deratisation.vercel.app',
    github: 'https://github.com/giantprolu/Site_deratisation',
  }
  // {
  //   title: 'Project Three',
  //   description: 'Description of Project Three',
  //   image: '/project-three.webp',
  //   tags: ['Tag1', 'Tag2', 'Tag3'],
  //   link: 'https://project-three.com',
  //   github: 'https://github.com/username/project-three',
  // },
];

export default function Work() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString());
  }, []);

  return (
    <div className="py-12">
      <h1 className="text-4xl font-bold mb-8">Mes travaux</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <div key={project.title} className="group relative bg-card rounded-lg overflow-hidden">
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
                  <span key={tag} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
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
          </div>
        ))}
      </div>
    </div>
  );
}