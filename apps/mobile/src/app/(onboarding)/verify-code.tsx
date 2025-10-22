import { Button, Screen, Text } from "@/components"
import { $styles, ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
// import { router } from "expo-router"
import { useState } from "react"
import { Alert, Image, Pressable, TextStyle, View, ViewStyle } from "react-native"
import { OtpInput } from "react-native-otp-entry"
import { useModal } from "react-native-modalfy"

const passryTextMarkLogo = require("../../../assets/images/passry-logo-text.png")

export default function VerifyCodeScreen() {
  const { themed, theme } = useAppTheme()
  const [_, setCode] = useState<string>("")
  const { openModal } = useModal()

  const verificationSuccessful = () => openModal("OnboardingSuccessModal", { name: "John Doe" })

  return (
    <Screen safeAreaEdges={["top"]} contentContainerStyle={[$styles.flex1, themed($container)]}>
      <View style={themed($screenContainer)}>
        <Image
          style={[$styles.textLogoMark, { marginVertical: 30 }]}
          source={passryTextMarkLogo}
          resizeMode="contain"
        />

        <View style={$formView}>
          <Text preset="subheading" text="Verify Email" />
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

          <View style={[$styles.row, $styles.alignCenter]}>
            <Text text="Resend code in: " preset="default" style={$resentTextStyle} />
            <Pressable onPress={() => {}}>
              <Text text="00:15" style={themed($timerStyle)} />
            </Pressable>
          </View>

          <Button
            text="Verify Code"
            style={themed($ctaStyle)}
            textStyle={{ fontWeight: "light", fontSize: 16, color: "#FFFFFF" }}
            onPress={verificationSuccessful}
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

const $ctaStyle: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  width: "100%",
  marginVertical: spacing.sm,
  backgroundColor: colors.palette.primary200,
})

const $resentTextStyle: TextStyle = { fontSize: 14, color: "#FFFFFF" }
const $timerStyle: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.primary200,
  fontSize: 14,
  fontWeight: "light",
  textDecorationLine: "underline",
})

const $formView: ViewStyle = { flexDirection: "column", alignItems: "center" }
