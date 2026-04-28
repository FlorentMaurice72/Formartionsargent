import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

interface Section {
  title: string
  content: string
}

interface LegalPageProps {
  title: string
  lastUpdated: string
  sections: Section[]
}

export function LegalPage({ title, lastUpdated, sections }: LegalPageProps) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 max-w-3xl mx-auto px-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mb-10"
        >
          <ChevronLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>

        <h1 className="text-3xl font-black mb-2">{title}</h1>
        <p className="text-xs text-zinc-600 mb-10">Dernière mise à jour : {lastUpdated}</p>

        <div className="space-y-8">
          {sections.map((section, i) => (
            <div key={i}>
              <h2 className="text-lg font-bold mb-3 text-zinc-200">
                {i + 1}. {section.title}
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-4 rounded-xl bg-white/3 border border-white/10 text-xs text-zinc-500">
          Pour toute question : <strong className="text-zinc-300">contact@formartionsargent.fr</strong>
        </div>
      </main>
      <Footer />
    </>
  )
}
