import { Suspense } from 'react'
import { CheckoutContent } from './CheckoutContent'

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-zinc-400">Chargement du paiement...</p>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  )
}
