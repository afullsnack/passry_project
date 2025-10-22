import { Card, Screen, Text, TextField } from "@/components"
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
      // contentContainerStyle={}
      preset="auto"
      ScrollViewProps={{
        scrollEnabled: true,
        stickyHeaderIndices: [0],
        StickyHeaderComponent: () => [
          <ExploreStickyHeader key={1} logo={passryLogoText} />,
          <View key={2} style={themed($screenContainer)}>
            {Array.from({ length: 25 }).map((_, index) => (
              <Card key={index} style={{ marginVertical: 8, shadowOpacity: 0.4 }}>
                <View></View>
              </Card>
            ))}
          </View>,
        ],
        stickyHeaderHiddenOnScroll: true,
        invertStickyHeaders: false,
        contentContainerStyle: themed($container),
      }}
    ></Screen>
  )
}

const $screenContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "60%",
  justifyContent: "center",
  padding: spacing.md,
})

const $container: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  // flex: 1,
  backgroundColor: colors.background,
})
