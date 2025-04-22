import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { parseString } from "xml2js";
import { promisify } from "util";

const parseXml = promisify(parseString);

export async function GET() {
  try {
    // Chemin vers le fichier XML généré
    const xmlPath = path.join(process.cwd(), "public", "rss.xml");
    
    // Vérifier si le fichier existe
    if (!fs.existsSync(xmlPath)) {
      console.error("Fichier RSS introuvable :", xmlPath);
      return NextResponse.json(
        { error: "Le fichier RSS n'existe pas" },
        { status: 404 }
      );
    }
    
    // Lire le fichier XML
    const xmlContent = fs.readFileSync(xmlPath, "utf-8");
    
    // Parser le XML en JSON
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
    
    // Extraire les items du flux RSS
    const items = result.rss.channel[0].item.map((item: any) => ({
      title: item.title[0],
      link: item.link[0],
      description: item.description ? item.description[0] : ""
    }));
    
    return NextResponse.json(items);
  } catch (error) {
    console.error("Erreur lors de la lecture du flux RSS local:", error);
    return NextResponse.json(
      { error: "Impossible de lire le flux RSS local" },
      { status: 500 }
    );
  }
}