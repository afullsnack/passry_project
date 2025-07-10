import { useEffect, useState } from "react"
import { Slot, SplashScreen } from "expo-router"
import { KeyboardProvider } from "react-native-keyboard-controller"

import { useFonts } from "@expo-google-fonts/space-grotesk"
import { customFontsToLoad } from "@/theme"
import { initI18n } from "@/i18n"
import { loadDateFnsLocale } from "@/utils/formatDate"
import { useThemeProvider } from "@/utils/useAppTheme"
import { ModalProvider, createModalStack } from "react-native-modalfy"
import OnboardingSuccessModal from "@/components/Modals/OnboardingSuccess"
import { GestureHandlerRootView } from "react-native-gesture-handler"

SplashScreen.preventAutoHideAsync()

if (__DEV__) {
  // Load Reactotron configuration in development. We don't want to
  // include this in our production bundle, so we are using `if (__DEV__)`
  // to only execute this in development.
  console.log("Running in dev mode...")
  require("src/devtools/ReactotronConfig.ts")
}

export { ErrorBoundary } from "@/components/ErrorBoundary/ErrorBoundary"

export default function Root() {
  const [fontsLoaded, fontError] = useFonts(customFontsToLoad)
  const [isI18nInitialized, setIsI18nInitialized] = useState(false)
  const { themeScheme, setThemeContextOverride, ThemeProvider } = useThemeProvider("light")

  useEffect(() => {
    initI18n()
      .then(() => setIsI18nInitialized(true))
      .then(() => loadDateFnsLocale())
  }, [])

  const loaded = fontsLoaded && isI18nInitialized

  useEffect(() => {
    if (fontError) throw fontError
  }, [fontError])

  // useEffect(() => {
  //   if (loaded) {
  //     SplashScreen.hideAsync()
  //   }
  // }, [loaded])

  // wait for 1 minute before loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loaded) {
        SplashScreen.hideAsync()
      }
    }, 1000 * 2)

    return () => clearTimeout(timeout)
  }, [loaded])

  if (!loaded) {
    return null
  }

  const modalConfig = { OnboardingSuccessModal }
  const defaultOptions = { backdropOpacity: 0.6 }
  const modalStack = createModalStack(modalConfig, defaultOptions)

  return (
    <GestureHandlerRootView>
      <ThemeProvider value={{ themeScheme, setThemeContextOverride }}>
        <KeyboardProvider>
          <ModalProvider stack={modalStack}>
            <Slot />
          </ModalProvider>
        </KeyboardProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  )
}
