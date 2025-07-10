import { Button, Screen, Text, PressableIcon } from "@/components"
import ExploreStickyHeader from "@/components/StickyHeader/Explore"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { ViewStyle } from "react-native"

export default function HomeScreen() {
  const { themed } = useAppTheme()
  return (
    <Screen
      safeAreaEdges={["top"]}
      contentContainerStyle={themed($container)}
      preset="auto"
      ScrollViewProps={{ scrollEnabled: true }}
    >
      <ExploreStickyHeader />
      <Text text="Home screen" />
    </Screen>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  backgroundColor: colors.background,
})
