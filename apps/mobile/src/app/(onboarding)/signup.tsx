import { Button, ButtonProps, Screen, Text, TextField } from "@/components"
import { $styles, ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { Image, ImageStyle, TextStyle, View, ViewStyle, useWindowDimensions } from "react-native"

const topConfetti = require("../../../assets/images/onboarding-slider-top.png")

export default function SignupScreen() {
  const { themed } = useAppTheme()

  return (
    <Screen
      ScrollViewProps={{ horizontal: false, scrollEnabled: true }}
      safeAreaEdges={["top"]}
      contentContainerStyle={[$styles.flex1, themed($container)]}
    >
      <View style={themed($screenContainer)}>
        <Image style={$styles.topConfetti} source={topConfetti} resizeMode="contain" />
        <View style={$formView}>
          <Text preset="heading" text="SIGN IN" />
          <Text preset="subheading" text="Welcome back!" />

          <TextField
            label="Name"
            placeholder="Enter info"
            inputMode="email"
            containerStyle={[themed($textInputStyle)]}
          />
          <TextField
            label="Email"
            placeholder="Enter info"
            inputMode="email"
            containerStyle={[themed($textInputStyle)]}
          />
          <TextField
            label="Password"
            placeholder="Enter info"
            inputMode="text"
            secureTextEntry
            containerStyle={[themed($textInputStyle)]}
          />
          <TextField
            label="Confirm password"
            placeholder="Enter info"
            inputMode="text"
            secureTextEntry
            containerStyle={[themed($textInputStyle)]}
          />
        </View>
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

const $textInputStyle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: "100%",
  marginVertical: spacing.md,
})

const $formView: ViewStyle = { flexDirection: "column", alignItems: "center" }
