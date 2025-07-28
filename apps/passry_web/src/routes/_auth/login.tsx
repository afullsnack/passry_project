import { SignInForm } from '@/components/blocks/signin-form'
import { Container, Main, Section } from '@/components/craft'
import { Link, createFileRoute } from '@tanstack/react-router'

import logoMark from '@/assets/PASSRY_Logo_TextMark.svg'

export const Route = createFileRoute('/_auth/login')({
  component: Login,
})

function Login() {
  return (
    <Main>
      <Section className="!w-full !mx-0 !p-0 min-h-screen flex">
        <Container className="hidden lg:flex lg:w-1/2 relative">
          <div
            className="w-full bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 relative overflow-hidden"
            style={{
              backgroundImage: "url('/images/hero-bg.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-slate-900/60  z-[1]" />

            {/* Logo */}
            <div className="absolute top-8 left-8 z-20">
              <Link to="/">
                <div className="text-2xl font-bold text-cyan-400">PASSRY</div>
              </Link>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-center items-center h-full px-12 text-center">
              <h1 className="text-4xl font-bold text-white mb-6">
                Find Events That Inspire you
              </h1>
              <p className="text-lg text-gray-300 max-w-md leading-relaxed">
                From music shows to conferences, explore events happening around
                you, and never miss a moment.
              </p>

              {/* Pagination dots */}
              <div className="flex space-x-2 mt-12">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                <div className="w-2 h-2 bg-white/50 rounded-full"></div>
              </div>
            </div>
          </div>
        </Container>
        <Container className="w-full lg:w-1/2 flex">
          <div className="w-full max-w-md mx-auto flex flex-col justify-center px-6 py-12">
            {/* Mobile logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="lg:hidden grid justify-center mb-8">
                <img src={logoMark} className="object-cover w-32" />
              </div>
            </div>
            <SignInForm />
          </div>
        </Container>
      </Section>
    </Main>
  )
}
