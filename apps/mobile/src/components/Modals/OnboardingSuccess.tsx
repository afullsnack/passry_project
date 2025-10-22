import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../Text"
// import { ModalComponentProp } from "react-native-modalfy"
import { Button } from "../Button"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { router } from "expo-router"

export default function OnboardingSuccessModal({ modal: { closeModal, params } }: any) {
  const { themed, theme } = useAppTheme()

  console.log("Params", params)

  return (
    <View style={themed($modalViewStyle)}>
      <View>
        <Text text={`🎉  \nWelcome to Passry, \n${params?.name}`} style={$headerTextStyle} />
        <Text text="You're all set to get started" preset="default" />
      </View>
      <Button
        text="Go to Dashboard"
        style={{ marginVertical: 20, backgroundColor: theme.colors.palette.primary200 }}
        onPress={() => {
          closeModal()
          router.replace("/(main)/(tabs)/explore")
        }}
      />
    </View>
  )
}

const $headerTextStyle: TextStyle = { color: "#FFFFFF", fontSize: 22 }

const $modalViewStyle: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  minHeight: "48%",
  minWidth: "85%",
  backgroundColor: colors.background,
  paddingHorizontal: spacing.xl,
  paddingVertical: spacing.lg,
  borderRadius: spacing.md,
  flexDirection: "column",
  justifyContent: "space-between",
})
