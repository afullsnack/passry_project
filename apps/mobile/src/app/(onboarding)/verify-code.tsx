import { Button, Screen, Text, TextField } from "@/components"
import { $styles, ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { useState } from "react"
import { Alert, Image, Pressable, TextStyle, View, ViewStyle } from "react-native"
import { OtpInput } from "react-native-otp-entry"

const topConfetti = require("../../../assets/images/onboarding-slider-top.png")

export default function VerifyCodeScreen() {
  const { themed, theme } = useAppTheme()
  const [_, setCode] = useState<string>("")

  return (
    <Screen safeAreaEdges={["top"]} contentContainerStyle={[$styles.flex1, themed($container)]}>
      <View style={themed($screenContainer)}>
        <Image style={$styles.topConfetti} source={topConfetti} resizeMode="contain" />

        <View style={$formView}>
          <Text preset="heading" text="VERIFY IDENTITY" />
          <Text preset="default" text="Enter the 4-digit code sent to your email." />

          <OtpInput
            numberOfDigits={4}
            focusColor={theme.colors.palette.primary500}
            hideStick
            blurOnFilled
            type="numeric"
            secureTextEntry
            onFilled={(code) => {
              console.log("OTP is: %s", code)
              setCode(code)
            }}
            theme={{
              containerStyle: {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginVertical: "10%",
              },
              pinCodeContainerStyle: {
                marginHorizontal: 6,
                width: 60,
                height: 60,
              },
            }}
          />

          <View style={[$styles.row, { alignItems: "center" }]}>
            <Text text="Resend code in: " preset="default" style={{ fontSize: 14 }} />
            <Pressable onPress={() => Alert.alert("Sure you want to signup?")}>
              <Text text="00:15" preset="subheading" style={themed($signUpStyle)} />
            </Pressable>
          </View>

          <Button
            text="Verify Code"
            preset="reversed"
            style={themed($ctaStyle)}
            onPress={() => {}}
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

const $ctaStyle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: "100%",
  marginVertical: spacing.sm,
})

const $forgotPasswordStyle: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.primary500,
  fontSize: 14,
  fontWeight: "bold",
  textDecorationLine: "underline",
  textAlign: "left",
})
const $signUpStyle: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.primary500,
  fontSize: 14,
  fontWeight: "bold",
  textDecorationLine: "underline",
})

const $textInputStyle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: "100%",
  marginVertical: spacing.md,
})
const $formView: ViewStyle = { flexDirection: "column", alignItems: "center" }

const $socialButtonsContainerStyle: ViewStyle = {
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-end",
  marginBottom: -40,
  gap: 20,
}
