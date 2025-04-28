const axios = require('axios');
const cheerio = require('cheerio');
const RSS = require('rss');
const fs = require('fs');

const BLOG_URL = 'https://vercel.com/blog';

async function fetchArticles() {
  try {
    console.log(`Récupération des articles depuis ${BLOG_URL}...`);
    
    // Ajouter un User-Agent pour simuler un navigateur
    const { data } = await axios.get(BLOG_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    console.log(`Page récupérée, taille: ${data.length} caractères`);
    const $ = cheerio.load(data);

    // Crée un objet RSS
    const feed = new RSS({
      title: 'Vercel Blog (Custom RSS)',
      description: 'Flux généré automatiquement depuis le blog Vercel',
      feed_url: 'https://portfolio-three-khaki-87.vercel.app/rss.xml',
      site_url: BLOG_URL,
      language: 'en',
    });

    // Afficher la structure pour comprendre les éléments disponibles
    console.log("Structure de la page détectée:");
    console.log("Tags h3 trouvés:", $('h3').length);
    console.log("Tags article trouvés:", $('article').length);
    
    // Essayer différents sélecteurs qui pourraient fonctionner
    let articleCount = 0;
    
    // Premier essai: utiliser les éléments article qui contiennent généralement des posts de blog
    $('article').each((i, el) => {
      const title = $(el).find('h3, h2').text().trim();
      let link = $(el).find('a').attr('href');
      
      // Normaliser le lien
      if (link && !link.startsWith('http')) {
        link = link.startsWith('/') ? `https://vercel.com${link}` : `https://vercel.com/${link}`;
      }
      
      if (title && link) {
        articleCount++;
        feed.item({
          title: title,
          description: $(el).find('p').text() || 'Article sur Vercel',
          url: link,
          date: new Date().toUTCString(),
        });
        console.log(`Article trouvé: ${title} (${link})`);
      }
    });
    
    // Si aucun article n'a été trouvé avec le premier sélecteur, essayer un autre
    if (articleCount === 0) {
      console.log("Aucun article trouvé avec le sélecteur 'article', essai avec '.blog-post, .post, .entry'");
      
      $('.blog-post, .post, .entry, [data-testid*="blog"], [class*="blog"]').each((i, el) => {
        const title = $(el).find('h3, h2').text().trim();
        let link = $(el).find('a').attr('href');
        
        // Normaliser le lien
        if (link && !link.startsWith('http')) {
          link = link.startsWith('/') ? `https://vercel.com${link}` : `https://vercel.com/${link}`;
        }
        
        if (title && link) {
          articleCount++;
          feed.item({
            title: title,
            description: $(el).find('p').text() || 'Article sur Vercel',
            url: link,
            date: new Date().toUTCString(),
          });
          console.log(`Article trouvé: ${title} (${link})`);
        }
      });
    }
    
    // Si toujours aucun article, dernière tentative avec h2/h3 en supposant qu'ils sont des titres d'articles
    if (articleCount === 0) {
      console.log("Toujours aucun article, essai avec 'h3, h2'");
      
      $('h3, h2').each((i, el) => {
        const title = $(el).text().trim();
        let link = $(el).closest('a').attr('href') || $(el).parent().closest('a').attr('href');
        
        // Normaliser le lien
        if (link && !link.startsWith('http')) {
          link = link.startsWith('/') ? `https://vercel.com${link}` : `https://vercel.com/${link}`;
        }
        
        if (title && link) {
          articleCount++;
          feed.item({
            title: title,
            description: 'Article sur Vercel',
            url: link,
            date: new Date().toUTCString(),
          });
          console.log(`Article trouvé: ${title} (${link})`);
        }
      });
    }
    
    // Si aucun article n'a été trouvé, ajouter des articles statiques pour éviter un flux vide
    if (articleCount === 0) {
      console.log("Aucun article trouvé, ajout d'articles statiques");
      
      // Ajouter quelques articles statiques pour éviter un flux vide
      feed.item({
        title: "Déployer une application Next.js sur Vercel",
        description: "Découvrez comment déployer facilement votre application Next.js sur la plateforme Vercel.",
        url: "https://vercel.com/docs/frameworks/nextjs",
        date: new Date().toUTCString(),
      });
      
      feed.item({
        title: "Découvrir les fonctionnalités de Vercel",
        description: "Explorer les fonctionnalités avancées de Vercel pour améliorer votre workflow de développement.",
        url: "https://vercel.com/features",
        date: new Date().toUTCString(),
      });
    }

    // Sauvegarde le flux RSS dans le dossier 'public'
    fs.writeFileSync('public/rss.xml', feed.xml({ indent: true }));
    console.log(`✅ Flux RSS généré dans public/rss.xml avec ${articleCount || 2} articles`);
    
  } catch (error) {
    console.error("❌ Erreur lors de la génération du flux RSS:", error.message);
    if (error.response) {
      console.error(`Code HTTP: ${error.response.status}`);
    }
    
    // Créer un flux d'erreur de secours
    const fallbackFeed = new RSS({
      title: 'Vercel Blog (Custom RSS)',
      description: 'Flux généré automatiquement depuis le blog Vercel (version de secours)',
      feed_url: 'https://portfolio-three-khaki-87.vercel.app/rss.xml',
      site_url: BLOG_URL,
      language: 'en',
    });
    
    fallbackFeed.item({
      title: "Erreur de génération du flux RSS",
      description: `Une erreur s'est produite lors de la récupération des articles: ${error.message}`,
      url: BLOG_URL,
      date: new Date().toUTCString(),
    });
    
    fs.writeFileSync('public/rss.xml', fallbackFeed.xml({ indent: true }));
    console.log('✅ Flux RSS de secours généré dans public/rss.xml');
  }
}

fetchArticles().catch(error => {
  console.error("Erreur non gérée:", error);
});
