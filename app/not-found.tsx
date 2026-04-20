import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <p className="text-8xl font-black text-gradient mb-4">404</p>
      <h1 className="text-2xl font-bold mb-2">Page introuvable</h1>
      <p className="text-zinc-400 mb-8 text-sm">Cette page n'existe pas ou a été déplacée.</p>
      <Link
        href="/"
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-sm hover:opacity-90 transition-opacity"
      >
        Retour à l'accueil
      </Link>
    </div>
  )
}
