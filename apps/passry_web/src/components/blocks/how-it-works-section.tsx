import howItWorks from '@/assets/how-passry-works.png?url'

export function HowItWorksSection() {
  return (
    <section>
      <div className="relative mx-auto max-w-6xl pt-32 lg:pb-16 lg:pt-48">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 items-center">
            <div>
              <h1 className="text-balance text-left text-3xl font-bold sm:text-3xl pl-6">
                How Passry Works
              </h1>

              <div className="grid gap-6 mt-6 p-6">
                <div className="flex gap-4 items-start justify-start w-full">
                  <div className="size-6 bg-black dark:bg-white rounded-full" />
                  <div className="grid items-center gap-3">
                    <h2 className="text-start font-bold text-lg">
                      Download the App
                    </h2>
                    <p className="max-w-2xl text-start text-pretty text-lg">
                      Available on Android. iOS version coming soon.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start justify-start w-full">
                  <div className="size-6 bg-[#00BCD4] rounded-full" />
                  <div className="grid items-center gap-3">
                    <h2 className="text-start font-bold text-lg">
                      Sign Up as Organizer or User
                    </h2>
                    <p className="max-w-2xl text-start text-pretty text-lg">
                      Quick onboarding based on your needs.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start justify-start w-full">
                  <div className="size-6 bg-black dark:bg-white rounded-full" />
                  <div className="grid items-center gap-3">
                    <h2 className="text-start font-bold text-lg">
                      Start Exploring or Hosting
                    </h2>
                    <p className="max-w-2xl text-start text-pretty text-lg">
                      Discover events, or create your own and sell tickets.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#00BCD4]/45 h-[600px] md:h-[600px] rounded-tl-[180px] mt-8 md:mt-0 grid items-center justify-center">
              <img
                src={howItWorks}
                className="object-cover h-[80vw] lg:h-[60%]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
