import { Button, PressableIcon, Screen, Text, TextField } from "@/components"
import { $styles, ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { router } from "expo-router"
import { Alert, Image, Pressable, TextStyle, View, ViewStyle } from "react-native"

const passryTextMarkLogo = require("../../../assets/images/passry-logo-text.png")

export default function SigninScreen() {
  const { themed } = useAppTheme()

  return (
    <Screen
      ScrollViewProps={{ horizontal: false, scrollEnabled: true }}
      safeAreaEdges={["top"]}
      contentContainerStyle={[$styles.flex1, themed($container)]}
    >
      <View style={themed($screenContainer)}>
        <Image
          style={[$styles.textLogoMark, { marginVertical: 10 }]}
          source={passryTextMarkLogo}
          resizeMode="contain"
        />

        <View style={$formView}>
          <Text preset="subheading" text="Sign In" />
          <Text preset="default" text="Welcome back!" />

          <TextField
            label="Email"
            placeholder="Enter email address"
            inputMode="email"
            containerStyle={themed($textInputStyle)}
          />
          <TextField
            label="Password"
            placeholder="Enter password"
            inputMode="text"
            secureTextEntry
            containerStyle={themed($textInputStyle)}
          />
          <Pressable
            style={$styles.alignFlexLeft}
            onPress={() => Alert.alert("Want to reset your password?")}
          >
            <Text text="Forgot password" style={themed($forgotPasswordStyle)} />
          </Pressable>

          <Button
            text="Login"
            style={themed($ctaStyle)}
            textStyle={{ color: "white", fontWeight: "light" }}
            onPress={() => {}}
          />
          <View style={[$styles.row, { alignItems: "center" }]}>
            <Text
              text="Don't have an account? - "
              preset="default"
              style={{ fontSize: 14, color: "white", fontWeight: "light" }}
            />
            <Pressable onPress={() => router.push("/(onboarding)/signup")}>
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
                labelProps={{ weight: "semiBold" }}
                size={20}
                containerStyle={[$styles.row, { alignItems: "center", gap: 10 }]}
                style={{
                  tintColor:
                    item.icon === "google" ? "red" : item.icon === "facebook" ? "blue" : "white",
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

const $ctaStyle: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  width: "100%",
  marginVertical: spacing.sm,
  backgroundColor: colors.palette.primary200,
})

const $forgotPasswordStyle: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.primary200,
  fontSize: 14,
  fontWeight: "light",
  textAlign: "left",
})
const $signUpStyle: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.primary200,
  fontSize: 14,
  fontWeight: "light",
  textDecorationLine: "underline",
})

const $textInputStyle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: "100%",
  marginVertical: spacing.xs,
})
const $formView: ViewStyle = { flexDirection: "column", alignItems: "center" }

const $socialButtonsContainerStyle: ViewStyle = {
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-end",
  marginBottom: -40,
  gap: 20,
}
