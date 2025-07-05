import { Screen, Text } from "@/components"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { useHeader } from "@/utils/useHeader"
import { useNavigation } from "expo-router"
import { View, ViewStyle } from "react-native"

export default function AboutScreen() {
  const { themed } = useAppTheme()
  const router = useNavigation()
  useHeader(
    {
      title: "About screen",
      titleMode: "center",
    },
    [router],
  )

  return (
    <Screen
      ScrollViewProps={{ horizontal: false, scrollEnabled: true }}
      preset="scroll"
      safeAreaEdges={["top"]}
      contentContainerStyle={[themed($container)]}
    >
      <View style={themed($screenContainer)}>
        {Array.from({ length: 40 }).map((_, index) => (
          <Text key={index} text="About Us" preset="heading" />
        ))}
      </View>
    </Screen>
  )
}

AboutScreen.title = "About screen"

const $container: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  backgroundColor: colors.background,
})

const $screenContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "60%",
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
})
