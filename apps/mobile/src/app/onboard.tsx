import { Button, ButtonProps, Screen, Text } from "@/components"
import { $styles, ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
// import { useHeader } from "@/utils/useHeader"
import { router } from "expo-router"
import { Image, ImageStyle, TextStyle, View, ViewStyle, useWindowDimensions } from "react-native"

const topConfetti = require("../../assets/images/onboarding-slider-top.png")
const passryLogo = require("../../assets/images/passry-logo-text.png")

export default function OnboardScreen() {
  const { themed } = useAppTheme()

  return (
    <Screen
      ScrollViewProps={{ horizontal: false, scrollEnabled: true }}
      safeAreaEdges={["top"]}
      contentContainerStyle={[themed($container)]}
    >
      <View style={themed($screenContainer)}>
        <Image style={$styles.topConfetti} source={topConfetti} resizeMode="contain" />
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image
            style={themed($passryLogo)}
            source={passryLogo}
            resizeMode="contain"
            // tintColor={theme.colors.palette.neutral900}
          />

          <Text text="Login or Create an Account today!" />
          <Button
            text="Sign In"
            preset="reversed"
            style={themed($ctaStyle)}
            onPress={() => router.push("/(onboarding)/signin")}
          />
          <Button
            text="Sign Up"
            preset="default"
            style={themed($ctaStyle)}
            onPress={() => router.push("/(onboarding)/signup")}
          />
        </View>
      </View>
    </Screen>
  )
}

const $passryLogo: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  height: 40,
  width: "100%",
  marginBottom: spacing.md,
})

const $ctaStyle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: "100%",
  marginVertical: spacing.sm,
})

const $container: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  backgroundColor: colors.background,
})

const $screenContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "60%",
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
})
