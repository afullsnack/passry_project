import {
  Image,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
  ViewStyle,
} from "react-native"
import { useAppTheme } from "@/utils/useAppTheme"
import { Text, TextProps } from "./Text"

export type IconTypes = keyof typeof iconRegistry

type BaseIconProps = {
  /**
   * The name of the icon
   */
  icon: IconTypes

  /**
   * An optional tint color for the icon
   */
  color?: string

  /**
   * An optional size for the icon. If not provided, the icon will be sized to the icon's resolution.
   */
  size?: number

  /**
   * An optional label for the icon. If not provided, the icon will be rendered.
   */
  label?: string

  /**
   * An optional label for the icon. If not provided, the icon will be rendered.
   */
  labelRight?: string

  /**
   * Style overrides for the label
   */
  labelProps?: TextProps

  /**
   * Style overrides for the icon image
   */
  style?: StyleProp<ImageStyle>

  /**
   * Style overrides for the icon container
   */
  containerStyle?: StyleProp<ViewStyle>
}

type PressableIconProps = Omit<TouchableOpacityProps, "style"> & BaseIconProps
type IconProps = Omit<ViewProps, "style"> & BaseIconProps

/**
 * A component to render a registered icon.
 * It is wrapped in a <TouchableOpacity />
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/Icon/}
 * @param {PressableIconProps} props - The props for the `PressableIcon` component.
 * @returns {JSX.Element} The rendered `PressableIcon` component.
 */
export function PressableIcon(props: PressableIconProps) {
  const {
    icon,
    color,
    size,
    label,
    labelRight,
    labelProps: $labelProps,
    style: $imageStyleOverride,
    containerStyle: $containerStyleOverride,
    ...pressableProps
  } = props

  const { theme } = useAppTheme()

  const $imageStyle: StyleProp<ImageStyle> = [
    $imageStyleBase,
    { tintColor: color ?? theme.colors.text },
    size !== undefined && { width: size, height: size },
    $imageStyleOverride,
  ]

  return (
    <TouchableOpacity {...pressableProps} style={$containerStyleOverride}>
      {label && <Text text={label} {...$labelProps} />}
      <Image style={$imageStyle} source={iconRegistry[icon]} />
      {labelRight && <Text text={labelRight} {...$labelProps} />}
    </TouchableOpacity>
  )
}

/**
 * A component to render a registered icon.
 * It is wrapped in a <View />, use `PressableIcon` if you want to react to input
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/Icon/}
 * @param {IconProps} props - The props for the `Icon` component.
 * @returns {JSX.Element} The rendered `Icon` component.
 */
export function Icon(props: IconProps) {
  const {
    icon,
    color,
    size,
    style: $imageStyleOverride,
    containerStyle: $containerStyleOverride,
    ...viewProps
  } = props

  const { theme } = useAppTheme()

  const $imageStyle: StyleProp<ImageStyle> = [
    $imageStyleBase,
    { tintColor: color ?? theme.colors.text },
    size !== undefined && { width: size, height: size },
    $imageStyleOverride,
  ]

  return (
    <View {...viewProps} style={$containerStyleOverride}>
      <Image style={$imageStyle} source={iconRegistry[icon]} />
    </View>
  )
}

export const iconRegistry = {
  "back": require("../../assets/icons/back.png"),
  "bell": require("../../assets/icons/bell.png"),
  "caretLeft": require("../../assets/icons/caretLeft.png"),
  "caretRight": require("../../assets/icons/caretRight.png"),
  "check": require("../../assets/icons/check.png"),
  "hidden": require("../../assets/icons/hidden.png"),
  "ladybug": require("../../assets/icons/ladybug.png"),
  "lock": require("../../assets/icons/lock.png"),
  "menu": require("../../assets/icons/menu.png"),
  "more": require("../../assets/icons/more.png"),
  "settings": require("../../assets/icons/settings.png"),
  "view": require("../../assets/icons/view.png"),
  "x": require("../../assets/icons/x.png"),
  "apple": require("../../assets/icons/apple.png"),
  "google": require("../../assets/icons/google.png"),
  "facebook": require("../../assets/icons/facebook.png"),
  "home": require("../../assets/icons/home.png"),
  "home-selected": require("../../assets/icons/home-selected.png"),
  "explore": require("../../assets/icons/explore.png"),
  "explore-selected": require("../../assets/icons/explore-selected.png"),
  "favorite": require("../../assets/icons/favorite.png"),
  "favorite-selected": require("../../assets/icons/favorite-selected.png"),
  "ticket": require("../../assets/icons/ticket.png"),
  "ticket-selected": require("../../assets/icons/ticket-selected.png"),
  "profile": require("../../assets/icons/profile.png"),
  "profile-selected": require("../../assets/icons/profile-selected.png"),
  "notification": require("../../assets/icons/notification.png"),
  "theme-toggle": require("../../assets/icons/theme-toggle.png"),
}

const $imageStyleBase: ImageStyle = {
  resizeMode: "contain",
}
