import AppMock from '@/assets/app-mock-about.png?url'

export function AboutSection() {
  return (
    <section className="py-16 px-4 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="grid items-center justify-center md:order-2 order-1">
          <div>
            <h2 className="text-3xl md:text-4xl text-start text-gray-900 mb-4 font-semibold">
              What is passry?
            </h2>
            <p className="text-[16px] text-start">
              PASSRY is your all-in-one platform for creating, managing,
              selling, and verifying digital tickets and access passes.
            </p>
            <p className="text-[16px] text-start">
              We’re pioneering the first invite-to-earn ticketing system.
              Empowering users to earn by inviting others to events. With
              PASSRY, event organizers drive growth, attendees get rewarded, and
              everyone wins.
            </p>
          </div>
        </div>
        <div className="bg-[#00BCD4]/30 px-12 pt-12 rounded-xl md:order-1 order-2">
          <img src={AppMock} className="bg-cover" />
        </div>
      </div>
    </section>
  )
}
