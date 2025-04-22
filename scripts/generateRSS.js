const axios = require('axios');
const cheerio = require('cheerio');
const RSS = require('rss');
const fs = require('fs');

const BLOG_URL = 'https://vercel.com/blog';

async function fetchArticles() {
  const { data } = await axios.get(BLOG_URL);
  const $ = cheerio.load(data);

  // Crée un objet RSS
  const feed = new RSS({
    title: 'Vercel Blog (Custom RSS)',
    description: 'Flux généré automatiquement depuis le blog Vercel',
    feed_url: 'https://portfolio-three-khaki-87.vercel.app/rss.xml', // Remplace par ton URL
    site_url: BLOG_URL,
    language: 'en',
  });

  // Cibler uniquement les liens des articles
  $('.grid a').each((i, el) => {
    // On ignore les liens vers les éléments non pertinents, comme les scripts
    if ($(el).is('script')) return; // Ignorer les balises <script>

    const href = $(el).attr('href');
    const title = $(el).find('h3').text();
    const date = new Date().toUTCString();

    // On ajoute un article seulement si le lien et le titre existent
    if (href && title) {
      feed.item({
        title: title.trim(),
        description: 'Article sur Vercel',
        url: `https://vercel.com${href}`, // Lien complet de l'article
        date: date,
      });
    }
  });

  // Sauvegarde le flux RSS dans le dossier 'public'
  fs.writeFileSync('public/rss.xml', feed.xml({ indent: true }));
  console.log('✅ Flux RSS généré dans public/rss.xml');
}

fetchArticles().catch(console.error);
