import { View } from "react-native"
import { AutoImage } from "../AutoImage"

const passryLogoText = require("../../../assets/images/passry-logo-text.png")

export default function ExploreStickyHeader() {
  return (
    <View>
      <AutoImage src={passryLogoText} />
    </View>
  )
}
