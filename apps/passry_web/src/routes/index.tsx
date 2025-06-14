import { createFileRoute } from '@tanstack/react-router'

import { Main} from '@/components/craft'
import { HeroSection } from '@/components/blocks/hero-section-3'
import { FooterSection } from '@/components/blocks/footer-section'
import LogoTextMark from '@/assets/PASSRY_Logo_TextMark.svg?url'
import PASSRYPolicy from '@/assets/PASSRY_Privacy_Policy.pdf?url'
import { Facebook, Instagram, Twitter } from 'lucide-react'
import { PiTiktokLogo } from 'react-icons/pi'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <Main className="min-h-screen overflow-hidden justify-center items-center">
      <HeroSection />
      <FooterSection
        logo={<img src={LogoTextMark} className="object-cover h-8 w-28" />}
        brandName=""
        socialLinks={[
          {
            icon: <PiTiktokLogo size={20} className="size-full" />,
            href: `https://www.tiktok.com/@passryapp`,
            label: 'TikTok',
          },
          {
            icon: <Instagram />,
            href: `https://www.instagram.com/passryapp?utm_source=qr&igsh=Y2I2MzJ0emlrOXZj`,
            label: 'Instagram',
          },
          {
            icon: <Facebook />,
            href: `https://www.facebook.com/passryapp`,
            label: 'Facebook',
          },
          {
            icon: <Twitter />,
            href: `https://x.com/passryapp`,
            label: 'Twitter',
          },
        ]}
        mainLinks={[
          {
            href: PASSRYPolicy,
            label: 'Privacy Policy',
          },
        ]}
        legalLinks={[]}
        copyright={{
          text: `© 2025 Passry LLC`,
          license: `All rights reserved.`,
        }}
      />
      {/* <Section className="grid grid-cols-2 gap-0">
        <Container>
          <h1>Passry</h1>
        </Container>
        <Container>
          <img
            src={logo}
            className="h-[40vmin] pointer-events-none animate-[spin_20s_linear_infinite]"
            alt="logo"
          />
        </Container>
      </Section> */}
    </Main>
  )
}
