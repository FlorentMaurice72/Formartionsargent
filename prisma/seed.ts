import { PrismaClient, Category, Level } from '@prisma/client'

const prisma = new PrismaClient()

const modules = [
  {
    slug: 'immobilier',
    title: 'Immobilier',
    description: 'Maîtrisez l\'investissement immobilier : de l\'achat de votre premier bien à la gestion d\'un patrimoine locatif rentable.',
    category: Category.IMMOBILIER,
    level: Level.BEGINNER,
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
    order: 1,
    videos: [
      { title: 'Introduction à l\'investissement immobilier', description: 'Les bases pour commencer', url: 'https://vimeo.com/example1', isFree: true, order: 1, duration: 1200 },
      { title: 'Analyser la rentabilité d\'un bien', description: 'Calculs et méthodes', url: 'https://vimeo.com/example2', isFree: false, order: 2, duration: 1800 },
      { title: 'Financement et leviers bancaires', description: 'Stratégies de financement', url: 'https://vimeo.com/example3', isFree: false, order: 3, duration: 2100 },
      { title: 'Gestion locative et fiscalité', description: 'Optimiser votre imposition', url: 'https://vimeo.com/example4', isFree: false, order: 4, duration: 1500 },
    ],
  },
  {
    slug: 'crypto',
    title: 'Crypto & Web3',
    description: 'Naviguez dans l\'univers des cryptomonnaies avec confiance : Bitcoin, DeFi, NFT et stratégies d\'investissement.',
    category: Category.CRYPTO,
    level: Level.BEGINNER,
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800',
    order: 2,
    videos: [
      { title: 'Comprendre la blockchain', description: 'Les fondamentaux du Web3', url: 'https://vimeo.com/example5', isFree: true, order: 1, duration: 1100 },
      { title: 'Bitcoin et stratégie DCA', description: 'Investir régulièrement', url: 'https://vimeo.com/example6', isFree: false, order: 2, duration: 1600 },
      { title: 'DeFi : la finance décentralisée', description: 'Yield farming et staking', url: 'https://vimeo.com/example7', isFree: false, order: 3, duration: 2000 },
      { title: 'Sécuriser ses cryptos', description: 'Wallets et bonnes pratiques', url: 'https://vimeo.com/example8', isFree: false, order: 4, duration: 1300 },
    ],
  },
  {
    slug: 'bourse',
    title: 'Bourse & Trading',
    description: 'Apprenez à investir en bourse : ETF, actions, analyse fondamentale et construction d\'un portefeuille performant.',
    category: Category.BOURSE,
    level: Level.INTERMEDIATE,
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
    order: 3,
    videos: [
      { title: 'Premiers pas en bourse', description: 'Ouvrir un compte et commencer', url: 'https://vimeo.com/example9', isFree: true, order: 1, duration: 1400 },
      { title: 'Investir en ETF', description: 'La stratégie passive gagnante', url: 'https://vimeo.com/example10', isFree: false, order: 2, duration: 1900 },
      { title: 'Analyse fondamentale', description: 'Lire les bilans financiers', url: 'https://vimeo.com/example11', isFree: false, order: 3, duration: 2200 },
      { title: 'Psychologie du trader', description: 'Gérer ses émotions', url: 'https://vimeo.com/example12', isFree: false, order: 4, duration: 1700 },
    ],
  },
  {
    slug: 'business-en-ligne',
    title: 'Business en Ligne',
    description: 'Créez votre empire digital : e-commerce, dropshipping, infoproduits, affiliation et personal branding.',
    category: Category.BUSINESS_EN_LIGNE,
    level: Level.BEGINNER,
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    order: 4,
    videos: [
      { title: 'Les modèles business en ligne', description: 'Choisir le bon modèle', url: 'https://vimeo.com/example13', isFree: true, order: 1, duration: 1300 },
      { title: 'Lancer un e-commerce rentable', description: 'De zéro à la première vente', url: 'https://vimeo.com/example14', isFree: false, order: 2, duration: 2400 },
      { title: 'Marketing digital et acquisition', description: 'Attirer et convertir', url: 'https://vimeo.com/example15', isFree: false, order: 3, duration: 2100 },
      { title: 'Automatiser et scaler', description: 'Systèmes et délégation', url: 'https://vimeo.com/example16', isFree: false, order: 4, duration: 1800 },
    ],
  },
  {
    slug: 'business-physique',
    title: 'Business Physique',
    description: 'Montez et développez une entreprise physique rentable : franchise, restaurant, service local, investissement productif.',
    category: Category.BUSINESS_PHYSIQUE,
    level: Level.INTERMEDIATE,
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    order: 5,
    videos: [
      { title: 'Créer son business plan', description: 'Structurer son projet', url: 'https://vimeo.com/example17', isFree: true, order: 1, duration: 1600 },
      { title: 'Financement et levée de fonds', description: 'Obtenir les capitaux', url: 'https://vimeo.com/example18', isFree: false, order: 2, duration: 1900 },
      { title: 'Management et ressources humaines', description: 'Bâtir une équipe', url: 'https://vimeo.com/example19', isFree: false, order: 3, duration: 2000 },
      { title: 'Croissance et expansion', description: 'Dupliquer le modèle', url: 'https://vimeo.com/example20', isFree: false, order: 4, duration: 1700 },
    ],
  },
  {
    slug: 'formations',
    title: 'Meta-Learning & Compétences',
    description: 'Développez vos compétences clés : productivité, apprentissage accéléré, mindset d\'entrepreneur et gestion du temps.',
    category: Category.FORMATIONS,
    level: Level.BEGINNER,
    imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800',
    order: 6,
    videos: [
      { title: 'Le mindset de la liberté financière', description: 'Reprogrammer ses croyances', url: 'https://vimeo.com/example21', isFree: true, order: 1, duration: 1100 },
      { title: 'Apprendre à apprendre', description: 'Techniques d\'apprentissage rapide', url: 'https://vimeo.com/example22', isFree: false, order: 2, duration: 1500 },
      { title: 'Productivité et Deep Work', description: 'Travailler moins, produire plus', url: 'https://vimeo.com/example23', isFree: false, order: 3, duration: 1800 },
      { title: 'Gestion des finances personnelles', description: 'Budget, épargne, investissement', url: 'https://vimeo.com/example24', isFree: false, order: 4, duration: 2000 },
    ],
  },
]

async function main() {
  console.log('Seeding database...')

  for (const moduleData of modules) {
    const { videos, ...moduleInfo } = moduleData
    const module = await prisma.module.upsert({
      where: { slug: moduleInfo.slug },
      update: {},
      create: moduleInfo,
    })

    for (const video of videos) {
      await prisma.video.upsert({
        where: { id: `${module.id}-${video.order}` },
        update: {},
        create: { ...video, moduleId: module.id },
      })
    }
    console.log(`Module ${module.title} seeded`)
  }

  console.log('Seeding complete!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
