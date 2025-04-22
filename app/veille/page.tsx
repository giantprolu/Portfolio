"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export default function Veille() {
  const [feeds, setFeeds] = useState<{ title: string; link: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const response = await fetch("/api/rss");
        if (!response.ok) throw new Error("Erreur de récupération des flux");
        
        const data = await response.json();
        setFeeds(data);
      } catch (error) {
        console.error("Erreur lors du chargement des flux RSS :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeeds();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Veille Informatique: OVH vs Vercel</h1>
      <p>
        Voici les dernières mises à jour et articles liés à l'hébergement entre OVH et Vercel.
        Cette veille est mise à jour dynamiquement via des flux RSS.
      </p>

      {loading ? (
        <p>Chargement des articles...</p>
      ) : feeds.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {feeds.map((item, index) => (
            <Card key={index} className="p-4">
              <CardContent>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                >
                  {item.title} <ExternalLink size={16} />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p>Aucun article disponible pour le moment.</p>
      )}

      <h2 className="text-xl font-semibold">Outils utilisés</h2>
      <ul className="list-disc pl-5">
        <li>API Next.js pour contourner les restrictions CORS.</li>
        <li>Stockage local pour éviter les requêtes inutiles.</li>
        <li>Flux RSS pour suivre OVH et Vercel.</li>
      </ul>

      <Button asChild>
        <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
          Découvrir Vercel
        </a>
      </Button>
      <Button variant="outline" asChild>
        <a href="https://www.ovhcloud.com" target="_blank" rel="noopener noreferrer">
          Explorer OVH
        </a>
      </Button>
    </div>
  );
}
