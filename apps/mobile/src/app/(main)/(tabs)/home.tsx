import { Button, Screen, Text, PressableIcon } from "@/components"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { ViewStyle } from "react-native"

export default function HomeScreen() {
  const { themed } = useAppTheme()
  return (
    <Screen safeAreaEdges={["top"]} contentContainerStyle={themed($container)}>
      <Text text="Home screen" />
    </Screen>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  backgroundColor: colors.background,
})
