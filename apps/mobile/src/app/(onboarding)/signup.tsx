import { Button, PressableIcon, Screen, Text, TextField } from "@/components"
import { $styles, ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { router } from "expo-router"
import { useMemo, useState } from "react"
import { Alert, Image, Pressable, TextStyle, View, ViewStyle } from "react-native"
import { Dropdown } from "react-native-element-dropdown"

const topConfetti = require("../../../assets/images/onboarding-slider-top.png")

export default function SignupScreen() {
  const { themed } = useAppTheme()
  const [userType, setUserType] = useState<"attendee" | "organizer">()
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const userTypes = useMemo(
    () => [
      {
        label: "Attendee",
        value: "attendee",
      },
      {
        label: "Organizer",
        value: "organizer",
      },
    ],
    [],
  )

  return (
    <Screen
      ScrollViewProps={{ horizontal: false, scrollEnabled: true }}
      safeAreaEdges={["top"]}
      contentContainerStyle={[themed($container)]}
      preset="auto"
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
          <Dropdown
            style={[themed($textInputStyle), isFocused && $dropdownFocusStyle]}
            data={userTypes}
            labelField="label"
            valueField="value"
            value={userType}
            search={false}
            placeholder={!isFocused ? "Select user type" : "..."}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(item) => {
              setUserType(item.value)
              setIsFocused(false)
            }}
          />
          <Button
            text="Create account"
            preset="reversed"
            style={themed($ctaStyle)}
            onPress={() => {
              router.push("/(onboarding)/verify-code")
            }}
          />
          <View style={[$styles.row, { alignItems: "center", marginBottom: 40 }]}>
            <Text text="Already have an account? - " preset="default" style={{ fontSize: 14 }} />
            <Pressable onPress={() => Alert.alert("Sure you want to signin?")}>
              <Text text="Sign in" preset="subheading" style={themed($signUpStyle)} />
            </Pressable>
          </View>
          {/* Social login */}
          <View style={[$styles.row, $styles.horizontalRule.container]}>
            <View style={$styles.horizontalRule.lines} />
            <Text text="OR" style={$styles.horizontalRule.text} />
            <View style={$styles.horizontalRule.lines} />
          </View>

          <View style={$socialButtonsContainerStyle}>
            {[
              { icon: "apple", label: "Continue with Apple" },
              { icon: "google", label: "Continue with Google" },
              { icon: "facebook", label: "Continue with Facebook" },
            ].map((item) => (
              <PressableIcon
                key={item.icon}
                icon={item.icon as any}
                // labelRight={item.label}
                // labelProps={{ weight: "bold" }}
                size={30}
                containerStyle={[$styles.row, { alignItems: "center", gap: 10 }]}
                style={{
                  tintColor:
                    item.icon === "google" ? "red" : item.icon === "facebook" ? "blue" : "black",
                }}
              />
            ))}
          </View>
        </View>
      </View>
    </Screen>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.background,
  paddingBottom: spacing.xxl,
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
const $ctaStyle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: "100%",
  marginVertical: spacing.sm,
})
const $formView: ViewStyle = { flexDirection: "column", alignItems: "center", marginTop: "40%" }
const $dropdownFocusStyle: ViewStyle = { borderColor: "blue" }
const $signUpStyle: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.primary500,
  fontSize: 14,
  fontWeight: "bold",
  textDecorationLine: "underline",
})
const $socialButtonsContainerStyle: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 20,
}
