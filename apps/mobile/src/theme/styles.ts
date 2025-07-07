import { ImageStyle, ViewStyle } from "react-native"

/* Use this file to define styles that are used in multiple places in your app. */
export const $styles = {
  row: { flexDirection: "row" } as ViewStyle,
  flex1: { flex: 1 } as ViewStyle,
  flexWrap: { flexWrap: "wrap" } as ViewStyle,

  toggleInner: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  } as ViewStyle,

  topConfetti: {
    height: 110,
    width: 210,
    position: "absolute",
    top: -2,
    left: -2,
  } as ImageStyle,

  alignFlexLeft: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
  } as ViewStyle,

  alignFlexRight: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
  } as ViewStyle,
}
