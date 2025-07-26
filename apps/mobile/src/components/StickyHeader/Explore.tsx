import { ImageBackground, ImageStyle, ImageURISource, View, ViewStyle } from "react-native"
import { AutoImage } from "../AutoImage"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { PressableIcon } from "../Icon"
import { Text } from "../Text"
import { TextField } from "../TextField"

const backgroundImage = require("../../../assets/images/home-hero.png")

export default function ExploreStickyHeader({ logo }: { logo: ImageURISource }) {
  const { themed, theme } = useAppTheme()

  return (
    <View style={themed($stickyContainerStyle)}>
      <ImageBackground source={backgroundImage} style={$backgroundImageStyle}>
        <View style={themed($stickyBarStyle)}>
          <AutoImage source={logo} style={$passryLogoTextStyle} resizeMode="cover" />
          <View style={{ flexDirection: "row", gap: 10 }}>
            <PressableIcon
              icon="notification"
              size={theme.spacing.xl}
              style={{ tintColor: "white" }}
            />
            <PressableIcon
              icon="theme-toggle"
              size={theme.spacing.xl}
              style={{ tintColor: "white" }}
            />
          </View>
        </View>
        <View style={{ paddingBottom: theme.spacing.lg }}>
          <Text text="Welcome, Donn!" preset="heading" style={{ color: "white", margin: 0 }} />
          <TextField
            placeholder="Enter info"
            inputMode="text"
            secureTextEntry
            containerStyle={[themed($textInputStyle)]}
          />
        </View>
      </ImageBackground>
    </View>
  )
}

const $passryLogoTextStyle: ImageStyle = {
  // position: "absolute",
  // top: 2,
  // left: 10,
  width: 140,
  height: 42,
}

const $backgroundImageStyle: ViewStyle = {
  height: "100%",
  paddingHorizontal: 16,
  flexDirection: "column",
  justifyContent: "space-between",
}

const $stickyBarStyle: ThemedStyle<ViewStyle> = () => ({
  width: "100%",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingVertical: 10,
})
const $stickyContainerStyle: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.background,
  minHeight: "33%",
})
const $textInputStyle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: "100%",
  marginTop: spacing.xs,
})
