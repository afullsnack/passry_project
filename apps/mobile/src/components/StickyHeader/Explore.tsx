import { ImageStyle, View, ViewStyle } from "react-native"
import { AutoImage } from "../AutoImage"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"

const passryLogoText = require("../../../assets/images/passry-logo-text.png")

export default function ExploreStickyHeader() {
  const { themed } = useAppTheme()

  return (
    <View style={themed($stickyContainerStyle)}>
      <AutoImage src={passryLogoText} style={$passryLogoTextStyle} />
    </View>
  )
}

const $passryLogoTextStyle: ImageStyle = {
  position: "absolute",
  top: 2,
  left: 10,
}

const $stickyContainerStyle: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.background,
})
