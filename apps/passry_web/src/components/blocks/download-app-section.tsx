import playStoreDownload from '@/assets/play-store-download.png?url'
import appStoreDownload from '@/assets/app-store-download.png?url'

export function DownloadAppSection() {
  return (
    <section className="py-16 bg-[#F6F7FB] grid items-center justify-center">
      <div className="max-w-7xl mx-auto grid md:flex items-center justify-between">
        <div className="text-start grid gap-3">
          <h1 className="font-medium text-3xl md:text-4xl">
            Ready to Experience Smarter Event Management?
          </h1>
          <p className="text-xl text-balance md:max-w-3xl">
            Join hundreds of event organizers and users already using Passry to
            create memorable experiences.
          </p>
        </div>
        <div className="grid mt-10 md:flex items-center">
          <img src={playStoreDownload} className="object-cover h-[60px]" />
          <img src={appStoreDownload} className="object-cover h-[60px]" />
        </div>
      </div>
    </section>
  )
}
