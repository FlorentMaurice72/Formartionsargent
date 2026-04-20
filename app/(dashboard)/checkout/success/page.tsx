import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function CheckoutSuccessPage() {
  return (
    <div className="max-w-md mx-auto text-center py-20 space-y-6">
      <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
        <CheckCircle className="w-8 h-8 text-green-400" />
      </div>
      <h1 className="text-2xl font-black">Paiement réussi ! 🎉</h1>
      <p className="text-zinc-400">
        Ton accès Premium est maintenant actif. Toutes les formations sont débloquées.
      </p>
      <Link
        href="/dashboard"
        className="inline-flex px-8 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold hover:opacity-90 transition-opacity"
      >
        Accéder à mes formations →
      </Link>
    </div>
  )
}
