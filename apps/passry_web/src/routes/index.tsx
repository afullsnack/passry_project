import { createFileRoute } from '@tanstack/react-router'

import { Main } from '@/components/craft'
import { HeroSection } from '@/components/blocks/hero-section-3'
import { FooterSection } from '@/components/blocks/footer-section'
import LogoTextMark from '@/assets/PASSRY_Logo_TextMark.svg?url'
import PASSRYPolicy from '@/assets/PASSRY_Privacy_Policy.pdf?url'
import { Facebook, Instagram, Twitter } from 'lucide-react'
import { PiTiktokLogo } from 'react-icons/pi'
import { UpcomingEventsSection } from '@/components/blocks/upcoming-events-section'
import { AboutSection } from '@/components/blocks/about-section'
import { CandoSection } from '@/components/blocks/cando-section'
import { HowItWorksSection } from '@/components/blocks/how-it-works-section'
import { DownloadAppSection } from '@/components/blocks/download-app-section'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <Main className="min-h-screen overflow-hidden justify-center items-center">
      <HeroSection />
      <UpcomingEventsSection />
      <AboutSection />
      <CandoSection />
      <HowItWorksSection />
      <DownloadAppSection />
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
    </Main>
  )
}
