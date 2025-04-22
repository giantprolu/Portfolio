import { NextResponse } from "next/server";
import Parser from "rss-parser";
import fs from "fs";
import path from "path";
import { parseString } from "xml2js";
import { promisify } from "util";

const parser = new Parser();
const parseXml = promisify(parseString);

const rssFeeds = [
  { name: "OVH Blog", url: "https://blog.ovhcloud.com/feed/" },
  // Vercel Changelog n'est plus utilisé puisque nous avons notre propre flux
];

export async function GET() {
  try {
    let allFeeds: { title: string; link: string; description?: string; image?: string; source: string }[] = [];

    // 1. D'abord récupérer les flux externes (OVH)
    for (let feed of rssFeeds) {
      console.log(`Tentative de récupération du flux : ${feed.name}`);
      
      try {
        const response = await fetch(feed.url);
        if (!response.ok) {
          console.error(`Erreur HTTP: ${response.status} pour ${feed.name}`);
          continue; // Passer au flux suivant au lieu d'échouer complètement
        }

        const xml = await response.text();
        console.log(`XML reçu pour ${feed.name}: ${xml.substring(0, 100)}...`);
        
        const parsedFeed = await parser.parseString(xml);
        console.log(`Flux parsé pour ${feed.name}, ${parsedFeed.items.length} articles trouvés`);

        allFeeds = [
          ...allFeeds,
          ...parsedFeed.items.map((item) => {
            // Extraire l'image si disponible
            let image = "";
            if (item.content && item.content.includes("<img")) {
              const imgMatch = item.content.match(/<img[^>]+src="([^">]+)"/);
              if (imgMatch && imgMatch[1]) {
                image = imgMatch[1];
              }
            }
            
            return {
              title: item.title || "Sans titre",
              link: item.link || "#",
              description: item.contentSnippet || item.description || "",
              image: image,
              source: "OVH"
            };
          }),
        ];
      } catch (feedError) {
        console.error(`Erreur avec le flux ${feed.name}:`, feedError);
        // Continuer avec les autres flux
      }
    }

    // 2. Ensuite, récupérer notre flux local Vercel
    try {
      const xmlPath = path.join(process.cwd(), "public", "rss.xml");
      
      if (fs.existsSync(xmlPath)) {
        const xmlContent = fs.readFileSync(xmlPath, "utf-8");
        const result = await parseXml(xmlContent) as {
          rss: {
            channel: Array<{
              item: Array<{
                title: string[];
                link: string[];
                description?: string[];
              }>;
            }>;
          };
        };
        
        const vercelItems = result.rss.channel[0].item.map((item: any) => ({
          title: item.title[0],
          link: item.link[0],
          description: item.description ? item.description[0] : "",
          image: "https://assets.vercel.com/image/upload/v1673827475/front/vercel/favicon.ico", // Image par défaut pour Vercel
          source: "Vercel"
        }));
        
        allFeeds = [...allFeeds, ...vercelItems];
      }
    } catch (localError) {
      console.error("Erreur avec le flux RSS local:", localError);
    }

    // 3. Trier les articles par ordre chronologique (les plus récents d'abord)
    // allFeeds.sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());
    
    console.log(`Total articles récupérés: ${allFeeds.length}`);
    return NextResponse.json(allFeeds);
  } catch (error) {
    console.error("Erreur API RSS détaillée:", error);
    return NextResponse.json({ error: "Impossible de récupérer les flux RSS" }, { status: 500 });
  }
}
