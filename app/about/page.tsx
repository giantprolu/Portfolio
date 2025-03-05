'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';

const skills = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
  { category: 'Backend', items: ['Node.js', 'Python', 'PostgreSQL', 'GraphQL'] },
  { category: 'Tools', items: ['Git', 'Docker', 'AWS', 'Figma'] },
];

export default function About() {
  return (
    <div className="py-12 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col-reverse md:flex-row gap-12 mb-16">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-6">About Me</h1>
            <div className="prose dark:prose-invert">
              <p className="text-lg mb-4">
                I'm a full-stack developer with over 5 years of experience building
                web applications. My journey in tech started with a curiosity about
                how things work on the internet, which led me to dive deep into
                web development.
              </p>
              <p className="text-lg mb-6">
                I specialize in creating performant, accessible, and beautiful web
                applications. My approach combines technical expertise with an eye
                for design, ensuring that the products I build are both functional
                and delightful to use.
              </p>
              <Button asChild>
                <a href="/cv.pdf" download>
                  <FileDown className="mr-2 h-4 w-4" />
                  Download CV
                </a>
              </Button>
            </div>
          </div>
          <div className="md:w-1/3">
            <img
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2662&auto=format&fit=crop"
              alt="Profile"
              className="rounded-lg object-cover aspect-square"
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold mb-8">Skills & Technologies</h2>
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
        </motion.div>
      </motion.div>
    </div>
  );
}