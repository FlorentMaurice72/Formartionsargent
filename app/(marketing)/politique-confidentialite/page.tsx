import type { Metadata } from 'next'
import { LegalPage } from '@/components/shared/LegalPage'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Politique de confidentialité et gestion des données personnelles de FormationsArgent.',
}

export default function PolitiqueConfidentialitePage() {
  return (
    <LegalPage
      title="Politique de confidentialité"
      lastUpdated="1er janvier 2024"
      sections={[
        {
          title: 'Responsable du traitement',
          content: `FormationsArgent est responsable du traitement de vos données personnelles.
Contact DPO : contact@formartionsargent.fr`,
        },
        {
          title: 'Données collectées',
          content: `Nous collectons les données suivantes :

• Données d'identification : nom, prénom, adresse email (lors de la création de compte)
• Données de navigation : pages visitées, vidéos visionnées, progression dans les formations
• Données de paiement : traitées exclusivement par Stripe — nous ne conservons aucune donnée bancaire
• Données techniques : adresse IP, type de navigateur, appareil utilisé`,
        },
        {
          title: 'Finalités du traitement',
          content: `Vos données sont utilisées pour :
• Gérer votre compte et accès aux formations
• Suivre votre progression pédagogique
• Traiter vos paiements
• Vous envoyer des communications liées au service (avec votre consentement)
• Améliorer la plateforme (analyses statistiques anonymisées)`,
        },
        {
          title: 'Base légale',
          content: `Les traitements reposent sur :
• L'exécution du contrat (fourniture du service)
• Votre consentement (emails marketing)
• L'intérêt légitime (amélioration du service, sécurité)`,
        },
        {
          title: 'Durée de conservation',
          content: `• Données de compte : conservées pendant la durée de votre inscription + 3 ans
• Données de paiement : conservées selon les obligations légales (10 ans)
• Cookies : durée de vie maximum 13 mois`,
        },
        {
          title: 'Partage des données',
          content: `Vos données peuvent être partagées avec :
• Clerk (authentification) — https://clerk.com/privacy
• Stripe (paiement) — https://stripe.com/privacy
• Vercel (hébergement) — https://vercel.com/legal/privacy-policy

Nous ne vendons jamais vos données à des tiers.`,
        },
        {
          title: 'Vos droits (RGPD)',
          content: `Conformément au Règlement Général sur la Protection des Données, vous disposez des droits suivants :
• Droit d'accès à vos données
• Droit de rectification
• Droit à l'effacement (« droit à l'oubli »)
• Droit à la portabilité
• Droit d'opposition au traitement
• Droit de retrait du consentement

Pour exercer ces droits : contact@formartionsargent.fr

Vous pouvez également introduire une réclamation auprès de la CNIL : https://www.cnil.fr`,
        },
        {
          title: 'Cookies',
          content: `Nous utilisons des cookies strictement nécessaires au fonctionnement du service (authentification, session) et des cookies analytiques anonymisés pour améliorer l'expérience utilisateur.

Vous pouvez désactiver les cookies non essentiels dans les paramètres de votre navigateur.`,
        },
      ]}
    />
  )
}
