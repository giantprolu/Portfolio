import { NextResponse } from "next/server";
import Parser from "rss-parser";

const parser = new Parser();

const rssFeeds = [
  { name: "OVH Blog", url: "https://blog.ovhcloud.com/feed/" },
  { name: "Vercel Changelog", url: "https://vercel.com/changelog/feed.xml" },
];

export async function GET() {
  try {
    let allFeeds: { title: string; link: string }[] = [];

    for (let feed of rssFeeds) {
      const response = await fetch(feed.url);
      if (!response.ok) throw new Error(`Impossible de récupérer ${feed.name}`);

      const xml = await response.text();
      const parsedFeed = await parser.parseString(xml);

      allFeeds = [
        ...allFeeds,
        ...parsedFeed.items.map((item) => ({
          title: item.title || "Sans titre",
          link: item.link || "#",
        })),
      ];
    }

    return NextResponse.json(allFeeds);
  } catch (error) {
    console.error("Erreur API RSS :", error);
    return NextResponse.json({ error: "Impossible de récupérer les flux RSS" }, { status: 500 });
  }
}
