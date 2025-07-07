import { Button, PressableIcon, Screen, Text, TextField } from "@/components"
import { $styles, ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { Alert, Image, Pressable, TextStyle, View, ViewStyle } from "react-native"

const topConfetti = require("../../../assets/images/onboarding-slider-top.png")

export default function SigninScreen() {
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
            label="Email"
            placeholder="Enter info"
            inputMode="email"
            containerStyle={themed($textInputStyle)}
          />
          <TextField
            label="Password"
            placeholder="Enter info"
            inputMode="text"
            secureTextEntry
            containerStyle={themed($textInputStyle)}
          />
          <Pressable
            style={$styles.alignFlexLeft}
            onPress={() => Alert.alert("Want to reset your password?")}
          >
            <Text text="Forgot password" preset="default" style={themed($forgotPasswordStyle)} />
          </Pressable>

          <Button text="Login" preset="reversed" style={themed($ctaStyle)} onPress={() => {}} />
          <View style={[$styles.row, { alignItems: "center" }]}>
            <Text text="Don't have an account? - " preset="default" style={{ fontSize: 14 }} />
            <Pressable onPress={() => Alert.alert("Sure you want to signup?")}>
              <Text text="Sign up" preset="subheading" style={themed($signUpStyle)} />
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
                labelRight={item.label}
                labelProps={{ weight: "bold" }}
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
