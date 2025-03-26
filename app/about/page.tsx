'use client';

import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
const skills = [
  { category: 'Frontend', items: ['React', 'Angular', 'TypeScript', 'Tailwind CSS'] },
  { category: 'Backend', items: ['Node.js', 'Python', 'SQLServer', 'C#'] },
  { category: 'Tools', items: ['Git', 'Docker', 'Azure', 'Figma'] },
];

export default function About() {
  return (
    <div className="py-12 max-w-4xl">
      <div>
        <div className="flex flex-col-reverse md:flex-row gap-12 mb-16">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-6">A propos de moi</h1>
            <div className="prose dark:prose-invert">
              <p className="text-lg mb-4">
              Développeur Full-Stack passionné, 
              j’ai acquis de l’expérience dans la conception et le développement d’applications web performantes et accessibles. 
              Mon parcours a débuté par une curiosité pour le fonctionnement du web,
              ce qui m’a poussé à approfondir mes compétences en développement.
              </p>
              <p className="text-lg mb-6">
              Actuellement en deuxième année de BTS SIO à l’EPSI Nantes, 
              je poursuis un cursus Bac +5 en tant qu’Expert Développeur Full-Stack. 
              J’ai eu l’opportunité de travailler sur divers projets lors de mes stages chez Macif et Exakis Nelite, 
              où j’ai développé des applications en Angular, .NET et SQL Server.
              </p>
              <Button asChild>
                <a href="/cv.pdf" download>
                  <FileDown className="mr-2 h-4 w-4" />
                  Télécharger mon CV
                </a>
              </Button>
            </div>
          </div>
          <div className="md:w-1/3">
            <img
              src="/me.jpg"
              alt="Profile"
              className="rounded-lg object-cover aspect-square"
            />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-8">Skills & Techno</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((skillGroup) => (
              <div
                key={skillGroup.category}
                className="bg-card rounded-lg p-6"
              >
                <h3 className="text-xl font-medium mb-4">{skillGroup.category}</h3>
                <ul className="space-y-2">
                  {skillGroup.items.map((item) => (
                    <li
                      key={item}
                      className="text-muted-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}