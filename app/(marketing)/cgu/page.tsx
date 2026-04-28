import type { Metadata } from 'next'
import { LegalPage } from '@/components/shared/LegalPage'

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation",
  description: "Conditions générales d'utilisation de la plateforme FormationsArgent.",
}

export default function CguPage() {
  return (
    <LegalPage
      title="Conditions Générales d'Utilisation"
      lastUpdated="1er janvier 2024"
      sections={[
        {
          title: 'Objet',
          content: `Les présentes Conditions Générales d'Utilisation (CGU) régissent l'accès et l'utilisation de la plateforme FormationsArgent, accessible à l'adresse formartionsargent.fr.

En utilisant ce site, vous acceptez sans réserve les présentes CGU.`,
        },
        {
          title: 'Accès à la plateforme',
          content: `La plateforme propose deux niveaux d'accès :

• Accès gratuit : accessible après création d'un compte. Inclut 1 vidéo gratuite par module de formation.

• Accès Premium : accessible après paiement d'un abonnement mensuel ou annuel. Donne accès à l'intégralité des formations, à l'ebook premium et aux contenus exclusifs.

L'accès à la plateforme est strictement personnel et non cessible.`,
        },
        {
          title: 'Création de compte',
          content: `Pour utiliser la plateforme, vous devez créer un compte en fournissant une adresse email valide. Vous êtes responsable de la confidentialité de vos identifiants.

FormationsArgent se réserve le droit de suspendre ou supprimer tout compte en cas d'utilisation frauduleuse ou contraire aux présentes CGU.`,
        },
        {
          title: 'Paiement et abonnement',
          content: `Les paiements sont traités de manière sécurisée par Stripe. FormationsArgent ne conserve aucune donnée bancaire.

L'abonnement Premium est renouvelé automatiquement à échéance. Vous pouvez le résilier à tout moment depuis votre espace personnel, sans pénalité.

Conformément à la législation française, vous disposez d'un droit de rétractation de 14 jours après l'achat, sauf si vous avez commencé à accéder au contenu numérique.`,
        },
        {
          title: 'Propriété intellectuelle',
          content: `Les formations, vidéos, textes et supports pédagogiques disponibles sur la plateforme sont la propriété exclusive de FormationsArgent. Toute reproduction, diffusion ou revente est strictement interdite et peut faire l'objet de poursuites judiciaires.`,
        },
        {
          title: 'Comportement des utilisateurs',
          content: `Il est interdit de :
• Partager ses identifiants de connexion avec des tiers
• Télécharger ou enregistrer les vidéos de formation
• Utiliser le contenu à des fins commerciales sans autorisation
• Perturber le fonctionnement de la plateforme`,
        },
        {
          title: 'Modification des CGU',
          content: `FormationsArgent se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront notifiés par email des changements substantiels.`,
        },
      ]}
    />
  )
}
