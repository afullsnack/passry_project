import { Button, Screen, Text, PressableIcon } from "@/components"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { ViewStyle } from "react-native"

export default function FavoriteScreen() {
  const { themed } = useAppTheme()
  return (
    <Screen safeAreaEdges={["top"]} contentContainerStyle={themed($container)}>
      <Text text="Favorite screen" />
    </Screen>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  backgroundColor: colors.background,
})
