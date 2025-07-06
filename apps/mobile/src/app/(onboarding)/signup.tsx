import { Button, ButtonProps, Screen, Text } from "@/components"
import { $styles, ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { useHeader } from "@/utils/useHeader"
import { useNavigation } from "expo-router"
import { Image, ImageStyle, TextStyle, View, ViewStyle, useWindowDimensions } from "react-native"

const topConfetti = require("../../../assets/images/onboarding-slider-top.png")

export default function SignupScreen() {
  const { themed } = useAppTheme()
  const router = useNavigation()

  return (
    <Screen
      ScrollViewProps={{ horizontal: false, scrollEnabled: true }}
      safeAreaEdges={["top"]}
      contentContainerStyle={[$styles.flex1, themed($container)]}
    >
      <View style={themed($screenContainer)}>
        <Image style={$styles.topConfetti} source={topConfetti} resizeMode="contain" />
        <Text text="Sign up" />
      </View>
    </Screen>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.background,
})

const $screenContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "60%",
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
})
