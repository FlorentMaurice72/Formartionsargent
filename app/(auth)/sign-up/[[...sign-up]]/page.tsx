import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black mb-1">Commence gratuitement 🚀</h1>
          <p className="text-zinc-400 text-sm">Rejoins +2400 apprenants sur la voie de la liberté financière</p>
        </div>
        <SignUp
          appearance={{
            elements: {
              rootBox: 'w-full',
              card: 'bg-white/5 border border-white/10 shadow-none rounded-2xl',
              headerTitle: 'hidden',
              headerSubtitle: 'hidden',
              socialButtonsBlockButton: 'bg-white/10 border-white/10 text-white hover:bg-white/20',
              formFieldInput: 'bg-white/10 border-white/20 text-white placeholder:text-zinc-500 focus:border-yellow-500',
              formButtonPrimary: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold hover:opacity-90',
              footerActionLink: 'text-yellow-400 hover:text-yellow-300',
              dividerLine: 'bg-white/10',
              dividerText: 'text-zinc-500',
            },
          }}
        />
      </div>
    </div>
  )
}
