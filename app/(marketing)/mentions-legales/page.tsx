import type { Metadata } from 'next'
import { LegalPage } from '@/components/shared/LegalPage'

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales de FormationsArgent.',
}

export default function MentionsLegalesPage() {
  return (
    <LegalPage
      title="Mentions légales"
      lastUpdated="1er janvier 2024"
      sections={[
        {
          title: 'Éditeur du site',
          content: `FormationsArgent
Forme juridique : [À compléter — SAS / Auto-entrepreneur / SASU]
Capital social : [À compléter]
RCS : [À compléter]
Adresse : [À compléter]
Email : contact@formartionsargent.fr
Directeur de la publication : [Votre nom]`,
        },
        {
          title: 'Hébergement',
          content: `Le site est hébergé par :
Vercel Inc.
340 Pine Street, Suite 701
San Francisco, CA 94104, États-Unis
Site : https://vercel.com`,
        },
        {
          title: 'Propriété intellectuelle',
          content: `L'ensemble du contenu de ce site (textes, images, vidéos, formations) est protégé par le droit d'auteur. Toute reproduction, même partielle, est interdite sans autorisation préalable écrite de FormationsArgent.`,
        },
        {
          title: 'Limitation de responsabilité',
          content: `Les informations fournies sur ce site sont à titre éducatif uniquement. Elles ne constituent pas des conseils en investissement. FormationsArgent ne saurait être tenu responsable des décisions financières prises par les utilisateurs sur la base du contenu du site.

Les investissements comportent des risques, y compris la perte totale du capital investi. Les performances passées ne présagent pas des performances futures.`,
        },
        {
          title: 'Droit applicable',
          content: `Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français seront compétents.`,
        },
      ]}
    />
  )
}
