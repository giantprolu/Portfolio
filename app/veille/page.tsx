"use client";

import { useEffect, useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Globe } from "lucide-react";
import Image from "next/image";

type FeedItem = {
  title: string;
  link: string;
  description?: string;
  image?: string;
  source?: string;
};

export default function Veille() {
  // États
  const [feeds, setFeeds] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<"fr" | "en">("fr");
  const [originalFeeds, setOriginalFeeds] = useState<FeedItem[]>([]);  // Stocker les flux d'origine

  // Récupérer la langue depuis localStorage au chargement initial
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage === 'fr' || savedLanguage === 'en') {
      setLanguage(savedLanguage);
    }
    
    fetchFeeds();
  }, []);

  // Créer un dictionnaire de traduction enrichi pour les contenus spécifiques d'OVH
  const specificTranslations = {
    en: {
      "Reference Architecture": "Architecture de référence",
      "set up MLflow Remote Tracking Server on OVHcloud": "configurer un serveur de suivi MLflow sur OVHcloud",
      "Travel through": "Voyagez à travers",
      "Data & AI universe": "l'univers des données et de l'IA",
      "with the MLflow integration": "avec l'intégration MLflow",
      "As Artificial Intelligence": "Alors que l'Intelligence Artificielle",
      "continues to grow": "continue de croître",
      "in importance": "en importance",
      "Data Scientists and Machine Learning Engineers": "Les data scientists et les ingénieurs en apprentissage automatique",
      "need": "ont besoin",
      "machine learning": "apprentissage automatique",
      "artificial intelligence": "intelligence artificielle",
      "data scientists": "data scientists",
      "tracking server": "serveur de suivi",
      "remote tracking": "suivi distant",
    },
    fr: {
      "Architecture de référence": "Reference Architecture",
      "configurer un serveur de suivi MLflow sur OVHcloud": "set up MLflow Remote Tracking Server on OVHcloud",
      "Voyagez à travers": "Travel through",
      "l'univers des données et de l'IA": "Data & AI universe",
      "avec l'intégration MLflow": "with the MLflow integration",
      "Alors que l'Intelligence Artificielle": "As Artificial Intelligence",
      "continue de croître": "continues to grow",
      "en importance": "in importance",
      "Les data scientists et les ingénieurs en apprentissage automatique": "Data Scientists and Machine Learning Engineers",
      "ont besoin": "need",
      "apprentissage automatique": "machine learning",
      "intelligence artificielle": "artificial intelligence",
      "data scientists": "data scientists",
      "serveur de suivi": "tracking server",
      "suivi distant": "remote tracking",
    }
  };

  // Dictionnaire simplifié pour la traduction des contenus d'article
  const translationDict = {
    fr: {
      // Mots clés anglais vers français
      "cloud": "cloud",
      "web": "web",
      "hosting": "hébergement",
      "server": "serveur",
      "update": "mise à jour",
      "new": "nouveau",
      "launch": "lancement",
      "feature": "fonctionnalité",
      "security": "sécurité",
      "performance": "performance",
      "platform": "plateforme",
      "service": "service",
      "pricing": "tarification",
      "customer": "client",
      "developer": "développeur",
      "deployment": "déploiement",
      "infrastructure": "infrastructure",
      "solution": "solution",
      "OVH": "OVH",
      "Vercel": "Vercel",
      "API": "API",
      "blog": "blog",
    },
    en: {
      // Mots clés français vers anglais
      "cloud": "cloud",
      "web": "web",
      "hébergement": "hosting",
      "serveur": "server",
      "mise à jour": "update",
      "nouveau": "new",
      "lancement": "launch",
      "fonctionnalité": "feature",
      "sécurité": "security",
      "performance": "performance",
      "plateforme": "platform",
      "service": "service",
      "tarification": "pricing",
      "client": "customer",
      "développeur": "developer",
      "déploiement": "deployment",
      "infrastructure": "infrastructure", 
      "solution": "solution",
      "OVH": "OVH",
      "Vercel": "Vercel",
      "API": "API",
      "blog": "blog",
    }
  };

  // Traductions de l'interface
  type TranslationKey = 
  | "title" 
  | "subtitle" 
  | "loading" 
  | "noArticles" 
  | "toolsTitle" 
  | "tools1" 
  | "tools2" 
  | "tools3" 
  | "tools4" 
  | "tools5" 
  | "discoverVercel" 
  | "exploreOVH" 
  | "readMore" 
  | "switchToEN" 
  | "switchToFR";

// 2. Définir le type pour l'objet de traduction
type TranslationsType = {
  [lang in "fr" | "en"]: {
    [key in TranslationKey]?: string;
  };
};

const translations: TranslationsType = {
    fr: {
      title: "Veille Informatique: OVH vs Vercel",
      subtitle: "Voici les dernières mises à jour et articles liés à l'hébergement entre OVH et Vercel. Cette veille est mise à jour dynamiquement via des flux RSS et générée automatiquement.",
      loading: "Chargement des articles...",
      noArticles: "Aucun article disponible pour le moment.",
      toolsTitle: "Outils utilisés",
      tools1: "API Next.js pour contourner les restrictions CORS et combiner différentes sources",
      tools2: "Stockage local pour éviter les requêtes inutiles et améliorer les performances",
      tools3: "Flux RSS d'OVH Cloud pour suivre leurs actualités",
      tools4: "Génération statique de flux RSS pour le blog Vercel (sans flux officiel)",
      tools5: "Web scraping avec Cheerio pour extraire le contenu du blog Vercel",
      discoverVercel: "Découvrir Vercel",
      exploreOVH: "Explorer OVH",
      readMore: "Lire l'article",
      switchToEN: "Switch to English",
    },
    en: {
      title: "Tech Watch: OVH vs Vercel",
      subtitle: "Here are the latest updates and articles related to hosting between OVH and Vercel. This tech watch is dynamically updated via RSS feeds and automatically generated.",
      loading: "Loading articles...",
      noArticles: "No articles available at the moment.",
      toolsTitle: "Tools used",
      tools1: "Next.js API to bypass CORS restrictions and combine different sources",
      tools2: "Local storage to avoid unnecessary requests and improve performance",
      tools3: "OVH Cloud RSS feeds to follow their news",
      tools4: "Static RSS feed generation for the Vercel blog (without official feed)",
      tools5: "Web scraping with Cheerio to extract content from the Vercel blog",
      discoverVercel: "Discover Vercel",
      exploreOVH: "Explore OVH",
      readMore: "Read article",
      switchToFR: "Passer en français",
    }
  };

  // Obtenir le texte traduit (pour l'interface)
  const t = (key: TranslationKey) => translations[language][key] || key;

  // Fonction pour traduire une chaîne de texte
  const translateText = (text: string, sourceLang: "fr" | "en", targetLang: "fr" | "en") => {
    if (!text || sourceLang === targetLang) return text;
    
    let translated = text;
    
    // 1. Essayer d'abord les traductions spécifiques (phrases complètes)
    Object.entries(specificTranslations[sourceLang]).forEach(([source, target]) => {
      if (text.includes(source)) {
        // Vérifier que la cible existe dans les traductions
        const targetTranslation = specificTranslations[targetLang][target as keyof typeof specificTranslations[typeof targetLang]];
        if (targetTranslation) {
          translated = translated.replace(new RegExp(source, 'g'), targetTranslation);
        }
      }
    });
    
    // 2. Ensuite appliquer les traductions de mots individuels
    Object.entries(translationDict[sourceLang]).forEach(([source, target]) => {
      try {
        const regex = new RegExp(`\\b${source}\\b`, 'gi');
        if (regex.test(translated)) {
          translated = translated.replace(regex, (match) => {
            // Récupérer le mot cible et vérifier qu'il existe
            const targetWord = translationDict[targetLang][source as keyof typeof translationDict[typeof targetLang]];
            
            // Si le mot cible n'existe pas, retourner le mot original
            if (!targetWord) return match;
            
            // Préserver la casse
            if (match === match.toLowerCase()) return targetWord.toLowerCase();
            if (match === match.toUpperCase()) return targetWord.toUpperCase();
            if (match.charAt(0) === match.charAt(0).toUpperCase()) {
              return targetWord.charAt(0).toUpperCase() + targetWord.slice(1);
            }
            return targetWord;
          });
        }
      } catch (error) {
        console.error(`Erreur lors de la traduction du mot '${source}':`, error);
        // En cas d'erreur, continuer avec les autres mots
      }
    });
    
    return translated;
  };

  // Fonction pour détecter la langue d'un texte
  const detectLanguage = (text: string): "fr" | "en" => {
    if (!text) return "en";
    
    const frenchWords = ["mise", "à", "jour", "hébergement", "serveur", "nouveau", "développeur", "sécurité", "référence"];
    const englishWords = ["update", "hosting", "server", "new", "feature", "security", "developer", "reference"];
    
    let frCount = 0;
    let enCount = 0;
    
    const lowerText = text.toLowerCase();
    
    frenchWords.forEach(word => {
      if (lowerText.includes(word.toLowerCase())) frCount++;
    });
    
    englishWords.forEach(word => {
      if (lowerText.includes(word.toLowerCase())) enCount++;
    });
    
    // Si contenu OVH en anglais, donner plus de poids à l'anglais
    if (lowerText.includes("ovhcloud") && lowerText.includes("reference architecture")) {
      enCount += 2;
    }
    
    return frCount > enCount ? "fr" : "en";
  };

  // Fonction pour traduire un article complet
  const translateFeedItem = (item: FeedItem, targetLang: "fr" | "en"): FeedItem => {
    const sourceLang = detectLanguage(item.title);
    
    return {
      ...item,
      title: translateText(item.title, sourceLang, targetLang),
      description: item.description ? translateText(item.description, sourceLang, targetLang) : undefined
    };
  };

  // Traduire tous les articles quand la langue change
  useEffect(() => {
    if (originalFeeds.length > 0) {
      const translatedFeeds = originalFeeds.map(item => translateFeedItem(item, language));
      setFeeds(translatedFeeds);
    }
  }, [language, originalFeeds]);

  // Sauvegarder la langue lorsqu'elle change
  const changeLanguage = (newLanguage: "fr" | "en") => {
    setLanguage(newLanguage);
    localStorage.setItem('preferredLanguage', newLanguage);
  };

  // Récupérer les flux RSS
  const fetchFeeds = async () => {
    try {
      // Vérifier d'abord le stockage local
      const cachedData = localStorage.getItem('rssFeeds');
      const cachedTime = localStorage.getItem('rssFeedsTimestamp');
      
      // Si des données existent et sont récentes (moins de 1 heure)
      if (cachedData && cachedTime && 
          (Date.now() - parseInt(cachedTime)) < 3600000) {
        const parsedData = JSON.parse(cachedData);
        setOriginalFeeds(parsedData);
        setFeeds(parsedData.map((item: FeedItem) => translateFeedItem(item, language)));
        setLoading(false);
        return;
      }
      
      // Utiliser l'API RSS qui combine maintenant OVH et notre flux Vercel
      const response = await fetch("/api/rss");
      if (!response.ok) throw new Error("Erreur de récupération des flux");
      
      const data = await response.json();
      setOriginalFeeds(data);
      setFeeds(data.map((item: FeedItem) => translateFeedItem(item, language)));
      
      // Sauvegarder dans le stockage local
      localStorage.setItem('rssFeeds', JSON.stringify(data));
      localStorage.setItem('rssFeedsTimestamp', Date.now().toString());
    } catch (error) {
      console.error("Erreur lors du chargement des flux RSS :", error);
    } finally {
      setLoading(false);
    }
  };

  // Images locales pour les sources
  const defaultImages = {
    "OVH": "/ovhcloud-logo.webp",
    "Vercel": "/vercel-logo.png"
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t('title')}</h1>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => changeLanguage(language === "fr" ? "en" : "fr")}
          className="flex items-center gap-2"
        >
          <Globe size={16} />
          {language === "fr" ? t('switchToEN') : t('switchToFR')}
        </Button>
      </div>
      
      <p className="text-gray-600">
        {t('subtitle')}
      </p>

      {loading ? (
        <div className="flex justify-center py-8">
          <p>{t('loading')}</p>
        </div>
      ) : feeds.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {feeds.map((item, index) => (
            <Card key={index} className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow">
              <div className="h-40 relative bg-gray-100">
                {(item.image || item.source) && (
                  <Image
                    src={
                      item.source === "OVH" 
                        ? "/ovhcloud-logo.webp" 
                        : item.source === "Vercel" 
                          ? "/vercel-logo.png" 
                          : item.image || "/vercel-logo.png"
                    }
                    alt={item.title}
                    fill
                    style={{ objectFit: "contain", padding: "10px" }}
                  />
                )}
                {item.source && (
                  <span className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded">
                    {item.source}
                  </span>
                )}
              </div>
              <CardContent className="flex-grow flex flex-col p-4">
                <h3 className="font-bold text-lg mb-2 line-clamp-2">
                  {item.title}
                </h3>
                
                {item.description && (
                  <p className="text-sm text-gray-600 line-clamp-3 flex-grow mb-4">
                    {item.description}
                  </p>
                )}
                
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-blue-600 hover:bg-blue-50 font-medium mt-auto py-2 px-4 rounded-md transition-colors"
                >
                  <span>{t('readMore')}</span>
                  <ExternalLink size={16} />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p>{t('noArticles')}</p>
      )}

      <h2 className="text-xl font-semibold mt-10">{t('toolsTitle')}</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>{t('tools1')}</li>
        <li>{t('tools2')}</li>
        <li>{t('tools3')}</li>
        <li>{t('tools4')}</li>
        <li>{t('tools5')}</li>
      </ul>

      <div className="flex flex-wrap gap-3 mt-6">
        <Button asChild>
          <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
            {t('discoverVercel')}
          </a>
        </Button>
        <Button variant="outline" asChild>
          <a href="https://www.ovhcloud.com" target="_blank" rel="noopener noreferrer">
            {t('exploreOVH')}
          </a>
        </Button>
      </div>
    </div>
  );
}
