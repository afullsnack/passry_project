export function HowItWorksSection() {
  return (
    <section>
      <div className="relative mx-auto max-w-6xl px-6 pt-32 lg:pb-16 lg:pt-48">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
            <div>
              <h1 className="text-balance text-left text-4xl font-medium sm:text-5xl md:text-6xl">
                One App, All Access
              </h1>

              <p className="mt-6 max-w-2xl text-left text-pretty text-lg">
                Passry is a digital platform for creating events, selling
                tickets, and managing access.
              </p>
              <p className="mt-6 max-w-2xl text-left text-pretty text-lg">
                We’re creating something amazing! Join the waitlist to be front
                row when the app launches.
              </p>

              <div className="grid bg-[#00BCD4]/40 rounded-2xl py-8 items-center justify-center mt-6">
                <h1 className="text-start mb-3">
                  Join Passry waitlist community
                </h1>
              </div>
            </div>
            <div className="bg-[#00BCD4]/45 h-[600px] md:h-[600px] rounded-tl-[180px] grid items-center justify-center">
              <img src={PASSRY_Hero} className="object-cover h-[80%]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
