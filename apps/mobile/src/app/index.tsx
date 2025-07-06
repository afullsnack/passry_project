import { Alert, Image, ImageStyle, View, ViewStyle } from "react-native"
import { Button, Screen, Text, PressableIcon } from "@/components"
import { isRTL } from "@/i18n"
import { ThemedStyle } from "@/theme"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"
import { useAppTheme } from "@/utils/useAppTheme"
import PagerView from "react-native-pager-view"

const welcomeSlider1 = require("../../assets/images/slider-1-hero.png")
const welcomeSlider2 = require("../../assets/images/slider-2-hero.png")
const welcomeSlider3 = require("../../assets/images/slider-3-hero.png")
const sliderTop = require("../../assets/images/onboarding-slider-top.png")

export default function WelcomeScreen() {
  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])
  const { themed } = useAppTheme()

  return (
    <Screen safeAreaEdges={["top"]} contentContainerStyle={themed($container)}>
      <PagerView style={{}} initialPage={0}>
        <View key="1">
          <View style={themed($topContainer)}>
            <Image
              style={$sliderTop}
              source={sliderTop}
              resizeMode="contain"
              // tintColor={theme.colors.palette.neutral900}
            />

            <PressableIcon
              icon="back"
              style={$skipIcon}
              label="Skip"
              labelProps={{ size: "lg", weight: "bold" }}
              containerStyle={$skipIconContainer}
              onPress={() => {
                Alert.alert("Skip welcome screen?", "This will sskip welcome screen")
              }}
            />
            {/* <Image
          style={$skipIcon}
          source={skipIcon}
          resizeMode="contain"
          // tintColor={theme.colors.palette.neutral900}
        /> */}
            <Image style={themed($welcomeSlider1)} source={welcomeSlider1} resizeMode="contain" />
            {/* <Text
          testID="welcome-heading"
          style={themed($welcomeHeading)}
          tx="welcomeScreen:readyForLaunch"
          preset="heading"
        />
        <Text tx="welcomeScreen:exciting" preset="subheading" /> */}
          </View>

          <View style={[themed($bottomContainer), $bottomContainerInsets]}>
            <Text tx="welcomeScreen:slide1Title" preset="bold" size="xl" />
            <Text tx="welcomeScreen:slide1SubText" size="md" style={{ textAlign: "center" }} />
            <Button
              text="Next"
              style={{ width: "100%" }}
              onPress={() => {
                // TODO: animate to next slide
              }}
            />
          </View>
        </View>
        <View key="2">
          <View style={themed($topContainer)}>
            <Image
              style={$sliderTop}
              source={sliderTop}
              resizeMode="contain"
              // tintColor={theme.colors.palette.neutral900}
            />

            <PressableIcon
              icon="back"
              style={$skipIcon}
              label="Skip"
              labelProps={{ size: "lg", weight: "bold" }}
              containerStyle={$skipIconContainer}
              onPress={() => {
                Alert.alert("Skip welcome screen?", "This will sskip welcome screen")
              }}
            />
            {/* <Image
          style={$skipIcon}
          source={skipIcon}
          resizeMode="contain"
          // tintColor={theme.colors.palette.neutral900}
        /> */}
            <Image style={themed($welcomeSlider1)} source={welcomeSlider2} resizeMode="contain" />
            {/* <Text
          testID="welcome-heading"
          style={themed($welcomeHeading)}
          tx="welcomeScreen:readyForLaunch"
          preset="heading"
        />
        <Text tx="welcomeScreen:exciting" preset="subheading" /> */}
          </View>

          <View style={[themed($bottomContainer), $bottomContainerInsets]}>
            <Text tx="welcomeScreen:slide1Title" preset="bold" size="xl" />
            <Text tx="welcomeScreen:slide1SubText" size="md" style={{ textAlign: "center" }} />
            <Button
              text="Next"
              style={{ width: "100%" }}
              onPress={() => {
                // TODO: animate to next slide
              }}
            />
          </View>
        </View>
        <View key="2">
          <View style={themed($topContainer)}>
            <Image
              style={$sliderTop}
              source={sliderTop}
              resizeMode="contain"
              // tintColor={theme.colors.palette.neutral900}
            />

            <PressableIcon
              icon="back"
              style={$skipIcon}
              label="Skip"
              labelProps={{ size: "lg", weight: "bold" }}
              containerStyle={$skipIconContainer}
              onPress={() => {
                Alert.alert("Skip welcome screen?", "This will sskip welcome screen")
              }}
            />
            {/* <Image
          style={$skipIcon}
          source={skipIcon}
          resizeMode="contain"
          // tintColor={theme.colors.palette.neutral900}
        /> */}
            <Image style={themed($welcomeSlider1)} source={welcomeSlider3} resizeMode="contain" />
            {/* <Text
          testID="welcome-heading"
          style={themed($welcomeHeading)}
          tx="welcomeScreen:readyForLaunch"
          preset="heading"
        />
        <Text tx="welcomeScreen:exciting" preset="subheading" /> */}
          </View>

          <View style={[themed($bottomContainer), $bottomContainerInsets]}>
            <Text tx="welcomeScreen:slide1Title" preset="bold" size="xl" />
            <Text tx="welcomeScreen:slide1SubText" size="md" style={{ textAlign: "center" }} />
            <Button
              text="Get started"
              style={{ width: "100%" }}
              onPress={() => {
                // TODO: animate to next slide
              }}
            />
          </View>
        </View>
      </PagerView>
    </Screen>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  backgroundColor: colors.background,
})

const $topContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "60%",
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
})

const $bottomContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "43%",
  backgroundColor: colors.palette.primary600,
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  paddingHorizontal: spacing.lg,
  alignItems: "center",
  justifyContent: "space-evenly",
})

const $welcomeSlider1: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  height: 288,
  width: "100%",
  marginBottom: -spacing.xxxl,
})

const $sliderTop: ImageStyle = {
  height: 129,
  width: 229,
  position: "absolute",
  top: -32,
  left: 15,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}

const $skipIcon: ImageStyle = {
  height: 20,
  width: 20,
  transform: [{ rotate: "180deg" }],
}

const $skipIconContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: 2,
  position: "absolute",
  right: 20,
  top: 20,
}

// const $welcomeHeading: ThemedStyle<TextStyle> = ({ spacing }) => ({
//   marginBottom: spacing.md,
// })
