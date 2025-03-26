'use client';

import { ExternalLink, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const reports = [
  {
    title: 'Rapport de Stage 1ère année de BTS',
    description: 'Participation au développement et à la maintenance des outils informatiques au sein du pôle IT d’une grande mutuelle d’assurance. Découverte des environnements techniques et des méthodologies en entreprise',
    image: '/Rapportimg1.webp',
    tags: ['Stage 1ère année BTS', '10-06-2024 au 28-06-2024', 'Macif'],
    link: '/Rapport1.pdf',
  },
  {
    title: 'Rapport de Stage 2ème année de BTS',
    description: 'Développement d’une application web avec Angular, .NET Minimal API et SQL Server. Mise en place d’un CRUD, intégration d’API RESTful, et déploiement sur Azure DevOps avec un pipeline CI/CD.',
    image: '/Rapportimg2.webp',
    tags: ['Stage 2ème année BTS', '08-01-2025 au 28-02-2025', 'Exakis Nelite'],
    link: '/Rapport2.pdf',
  },
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
      <h1 className="text-4xl font-bold mb-8">
        Mes Rapports de Stage
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {reports.map((report) => (
          <div
            key={report.title}
            className="group relative bg-card rounded-lg overflow-hidden"
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={report.image}
                alt={report.title}
                className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{report.title}</h3>
              <p className="text-muted-foreground mb-4">{report.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {report.tags.map((tag) => (
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
                  <a href={report.link} target="_blank" rel="noopener noreferrer" download>
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger
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