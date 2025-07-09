import { Button, Text } from "@/components"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { Modal, ViewStyle } from "react-native"
import { View } from "react-native-reanimated/lib/typescript/Animated"

interface WelcomeModalProps {
  visible: boolean
}

export default function WelcomeModal(props: WelcomeModalProps) {
  const { themed } = useAppTheme()
  return (
    <Modal visible={props.visible}>
      <View style={themed($containerStyle)}>
        <Text text="Welcome To Passry, Donn!" preset="heading" />
        <Text text="You're all set to get started." preset="subheading" />
        <Button text="Go to Dashboard" />
      </View>
    </Modal>
  )
}

const $containerStyle: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  paddingHorizontal: spacing.lg,
  backgroundColor: colors.background,
  flexDirection: "column",
  alignItems: "center",
  gap: 4,
})
