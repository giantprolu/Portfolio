import { NextResponse } from "next/server";
import Parser from "rss-parser";

const parser = new Parser();

const rssFeeds = [
  // Flux alternatifs pour tester
  //{ name: "Mozilla Blog", url: "https://blog.mozilla.org/feed/" },
  //{ name: "CSS Tricks", url: "https://css-tricks.com/feed/" },
  // Originaux (à commenter temporairement)
  { name: "OVH Blog", url: "https://blog.ovhcloud.com/feed/" },
  { name: "Vercel Changelog", url: "https://vercel.com/changelog/feed" },
];

export async function GET() {
  try {
    let allFeeds: { title: string; link: string }[] = [];

    for (let feed of rssFeeds) {
      console.log(`Tentative de récupération du flux : ${feed.name}`);
      
      const response = await fetch(feed.url);
      if (!response.ok) {
        console.error(`Erreur HTTP: ${response.status} pour ${feed.name}`);
        throw new Error(`Impossible de récupérer ${feed.name}`);
      }

      const xml = await response.text();
      console.log(`XML reçu pour ${feed.name}: ${xml.substring(0, 200)}...`);
      
      const parsedFeed = await parser.parseString(xml);
      console.log(`Flux parsé pour ${feed.name}, ${parsedFeed.items.length} articles trouvés`);

      allFeeds = [
        ...allFeeds,
        ...parsedFeed.items.map((item) => ({
          title: item.title || "Sans titre",
          link: item.link || "#",
        })),
      ];
    }

    console.log(`Total articles récupérés: ${allFeeds.length}`);
    return NextResponse.json(allFeeds);
  } catch (error) {
    console.error("Erreur API RSS détaillée:", error);
    // Afficher plus de détails sur l'erreur
    if (error instanceof Error) {
      console.error("Message:", error.message);
      console.error("Stack:", error.stack);
    }
    return NextResponse.json({ error: "Impossible de récupérer les flux RSS" }, { status: 500 });
  }
}
