const en = {
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
  },
  welcomeScreen: {
    slide1Title: "Find Events That Inspire you",
    slide1SubText:
      "From music shows to conferences, explore events happening around you, and never miss a moment.",
    slide2Title: "Host Events with Ease",
    slide2SubText:
      "Set up, publish, and track your events all in one place. Generate digital tickets in seconds.",
    slide3Title: "Secure, Seamless Ticketing",
    slide3SubText:
      "Purchase tickets safely and access them anytime with built-in QR codes and event reminders.",
    postscript:
      "psst  — This probably isn't what your app looks like. (Unless your designer handed you these screens, and in that case, ship it!)",
    readyForLaunch: "Your app, almost ready for launch!",
    exciting: "(ohh, this is exciting!)",
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "RESET APP",
  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content: "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
  },
}

export default en
export type Translations = typeof en
