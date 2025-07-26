import { Screen, Text } from "@/components"
import ExploreStickyHeader from "@/components/StickyHeader/Explore"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { View, ViewStyle } from "react-native"

const passryLogoText = require("../../../../assets/images/passry-logo-text.png")

export default function HomeScreen() {
  const { themed } = useAppTheme()
  return (
    <Screen
      safeAreaEdges={["top"]}
      contentContainerStyle={themed($container)}
      preset="auto"
      ScrollViewProps={{
        scrollEnabled: true,
        stickyHeaderIndices: [0],
        StickyHeaderComponent: () => <ExploreStickyHeader logo={passryLogoText} />,
        invertStickyHeaders: true,
      }}
    >
      <View>
        {Array(25).map((_, index) => (
          <Text key={index} text="Home screen" />
        ))}
      </View>
    </Screen>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  // flex: 1,
  backgroundColor: colors.background,
})
