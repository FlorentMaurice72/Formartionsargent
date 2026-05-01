import { PrismaClient, Category, Level } from '@prisma/client'

const prisma = new PrismaClient()

const modules = [
  {
    slug: 'immobilier',
    title: 'Immobilier',
    description: "Apprendre les bases de l'investissement immobilier, comprendre le crédit, la rentabilité et les premières stratégies.",
    category: Category.IMMOBILIER,
    level: Level.BEGINNER,
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
    order: 1,
    videos: [
      { title: "Comprendre l'investissement immobilier", description: 'Les bases pour commencer à investir dans la pierre', url: 'https://vimeo.com/76979871', isFree: true,  order: 1, duration: 1200 },
      { title: "Calculer la rentabilité d'un bien",       description: 'Formules, méthodes et exemples concrets',           url: 'https://vimeo.com/76979871', isFree: false, order: 2, duration: 1800 },
      { title: 'Financement, crédit et effet de levier',  description: 'Stratégies bancaires et optimisation du financement', url: 'https://vimeo.com/76979871', isFree: false, order: 3, duration: 2100 },
      { title: "Erreurs à éviter avant d'acheter",        description: 'Les pièges classiques du primo-investisseur',        url: 'https://vimeo.com/76979871', isFree: false, order: 4, duration: 1500 },
    ],
  },
  {
    slug: 'crypto',
    title: 'Crypto',
    description: 'Comprendre Bitcoin, les cryptomonnaies, la sécurité et les stratégies simples sans tomber dans le trading risqué.',
    category: Category.CRYPTO,
    level: Level.BEGINNER,
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800',
    order: 2,
    videos: [
      { title: 'Comprendre Bitcoin et la blockchain',        description: 'Les fondamentaux expliqués simplement',              url: 'https://vimeo.com/76979871', isFree: true,  order: 1, duration: 1100 },
      { title: 'Les principales cryptomonnaies',             description: 'Bitcoin, Ethereum et les altcoins à connaître',      url: 'https://vimeo.com/76979871', isFree: false, order: 2, duration: 1600 },
      { title: 'Sécuriser ses cryptos',                      description: 'Wallets, hardware wallets et bonnes pratiques',      url: 'https://vimeo.com/76979871', isFree: false, order: 3, duration: 2000 },
      { title: 'Stratégie long terme et erreurs à éviter',   description: 'DCA, HODL et les pièges à ne pas reproduire',       url: 'https://vimeo.com/76979871', isFree: false, order: 4, duration: 1300 },
    ],
  },
  {
    slug: 'business-en-ligne',
    title: 'Business en ligne',
    description: "Découvrir les modèles de revenus en ligne, les offres digitales, l'automatisation et l'acquisition client.",
    category: Category.BUSINESS_EN_LIGNE,
    level: Level.BEGINNER,
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    order: 3,
    videos: [
      { title: 'Les modèles de business en ligne',   description: 'Freelance, affiliation, SaaS, infoproduit : choisir',  url: 'https://vimeo.com/76979871', isFree: true,  order: 1, duration: 1300 },
      { title: 'Créer une offre digitale simple',    description: 'Concevoir un produit ou service vendable rapidement',  url: 'https://vimeo.com/76979871', isFree: false, order: 2, duration: 2400 },
      { title: 'Trouver ses premiers clients',       description: 'Acquisition, réseaux sociaux et bouche-à-oreille',     url: 'https://vimeo.com/76979871', isFree: false, order: 3, duration: 2100 },
      { title: 'Automatiser sans complexifier',      description: 'Outils, systèmes et délégation progressive',           url: 'https://vimeo.com/76979871', isFree: false, order: 4, duration: 1800 },
    ],
  },
  {
    slug: 'bourse',
    title: 'Bourse',
    description: 'Comprendre les bases de la bourse, les ETF, la diversification et l\'investissement progressif.',
    category: Category.BOURSE,
    level: Level.BEGINNER,
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
    order: 4,
    videos: [
      { title: 'Comprendre la bourse simplement',       description: 'Actions, marchés, indices : les bases essentielles',  url: 'https://vimeo.com/76979871', isFree: true,  order: 1, duration: 1400 },
      { title: 'Actions, ETF et dividendes',            description: 'Différences, avantages et comment choisir',          url: 'https://vimeo.com/76979871', isFree: false, order: 2, duration: 1900 },
      { title: 'Diversification et gestion du risque',  description: 'Construire un portefeuille solide et équilibré',     url: 'https://vimeo.com/76979871', isFree: false, order: 3, duration: 2200 },
      { title: 'Construire une stratégie long terme',   description: 'DCA, PEA et investissement sur 10-20 ans',           url: 'https://vimeo.com/76979871', isFree: false, order: 4, duration: 1700 },
    ],
  },
  {
    slug: 'formations',
    title: 'Formations',
    description: 'Apprendre à développer ses compétences, choisir les bonnes formations et transformer son savoir en valeur.',
    category: Category.FORMATIONS,
    level: Level.BEGINNER,
    imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800',
    order: 5,
    videos: [
      { title: 'Pourquoi se former financièrement',        description: 'Le retour sur investissement de l\'éducation',      url: 'https://vimeo.com/76979871', isFree: true,  order: 1, duration: 1100 },
      { title: 'Choisir les bonnes formations',            description: 'Critères pour évaluer et sélectionner une formation', url: 'https://vimeo.com/76979871', isFree: false, order: 2, duration: 1500 },
      { title: 'Apprendre efficacement',                   description: 'Techniques de mémorisation et d\'ancrage des savoirs', url: 'https://vimeo.com/76979871', isFree: false, order: 3, duration: 1800 },
      { title: 'Transformer ses compétences en revenus',   description: 'Monétiser son expertise et créer de la valeur',      url: 'https://vimeo.com/76979871', isFree: false, order: 4, duration: 2000 },
    ],
  },
  {
    slug: 'business-physique',
    title: 'Business physique',
    description: 'Comprendre les bases d\'un commerce ou service local, l\'offre, la gestion, la rentabilité et la prospection.',
    category: Category.BUSINESS_PHYSIQUE,
    level: Level.BEGINNER,
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    order: 6,
    videos: [
      { title: 'Les bases d\'un business physique',         description: 'Commerce local, franchise ou service : les modèles',  url: 'https://vimeo.com/76979871', isFree: true,  order: 1, duration: 1600 },
      { title: 'Choisir une offre rentable',               description: 'Analyse de marché et positionnement local',           url: 'https://vimeo.com/76979871', isFree: false, order: 2, duration: 1900 },
      { title: 'Gérer ses coûts et sa marge',              description: 'Comptabilité de base et seuil de rentabilité',        url: 'https://vimeo.com/76979871', isFree: false, order: 3, duration: 2000 },
      { title: 'Trouver ses premiers clients localement',  description: 'Prospection, bouche-à-oreille et réseaux locaux',    url: 'https://vimeo.com/76979871', isFree: false, order: 4, duration: 1700 },
    ],
  },
]

async function main() {
  console.log('🌱 Seeding database...')

  for (const moduleData of modules) {
    const { videos, ...moduleInfo } = moduleData

    const module = await prisma.module.upsert({
      where: { slug: moduleInfo.slug },
      update: moduleInfo,
      create: moduleInfo,
    })

    for (const videoData of videos) {
      const existing = await prisma.video.findFirst({
        where: { moduleId: module.id, order: videoData.order },
      })

      if (existing) {
        await prisma.video.update({
          where: { id: existing.id },
          data: videoData,
        })
      } else {
        await prisma.video.create({
          data: { ...videoData, moduleId: module.id },
        })
      }
    }

    console.log(`  ✓ ${module.title} — ${videos.length} vidéos (1 gratuite, 3 premium)`)
  }

  console.log('\n✅ Seed terminé sans doublon.')
}

main()
  .catch((e) => {
    console.error('❌ Erreur seed:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
