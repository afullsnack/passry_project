import { Image, ImageStyle, TextStyle, View, ViewStyle, useWindowDimensions } from "react-native"
import { Button, Screen, Text, PressableIcon } from "@/components"
import { TxKeyPath } from "@/i18n"
import { $styles, ThemedStyle } from "@/theme"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"
import { useAppTheme } from "@/utils/useAppTheme"
import Carousel, { ICarouselInstance, Pagination } from "react-native-reanimated-carousel"
import { useMemo, useRef } from "react"
import { useSharedValue } from "react-native-reanimated"
import { router } from "expo-router"
import { DotStyle } from "react-native-reanimated-carousel/lib/typescript/components/Pagination/Custom/PaginationItem"

const welcomeSlider1 = require("../../assets/images/slider-1-hero.png")
const welcomeSlider2 = require("../../assets/images/slider-2-hero.png")
const welcomeSlider3 = require("../../assets/images/slider-3-hero.png")
const sliderTop = require("../../assets/images/onboarding-slider-top.png")

export default function WelcomeScreen() {
  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])
  const { themed } = useAppTheme()
  const layout = useWindowDimensions()
  const carouselRef = useRef<ICarouselInstance>(null)
  const progress = useSharedValue<number>(0)

  const data = useMemo(
    () => [
      {
        image: welcomeSlider1,
        title: "welcomeScreen:slide1Title",
        subText: "welcomeScreen:slide1SubText",
        buttonText: "Next",
      },
      {
        image: welcomeSlider2,
        title: "welcomeScreen:slide2Title",
        subText: "welcomeScreen:slide2SubText",
        buttonText: "Next",
      },
      {
        image: welcomeSlider3,
        title: "welcomeScreen:slide3Title",
        subText: "welcomeScreen:slide3SubText",
        buttonText: "Get started",
      },
    ],
    [],
  )

  const onPressPagination = (index: number) => {
    progress.set(index)
  }

  return (
    <Screen safeAreaEdges={["top"]} contentContainerStyle={themed($container)}>
      <Carousel
        ref={carouselRef}
        loop={false}
        enabled={false}
        snapEnabled
        pagingEnabled
        // autoPlay
        width={layout.width}
        height={layout.height}
        data={data}
        onSnapToItem={onPressPagination}
        renderItem={({ index, item }) => (
          <View style={$styles.flex1}>
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
                  router.push("/onboard")
                }}
              />

              <Image style={themed($welcomeSlider)} source={item.image} resizeMode="contain" />
            </View>

            <View style={[themed($bottomContainer), $bottomContainerInsets]}>
              <Text tx={item.title as TxKeyPath} preset="bold" size="xl" />
              <Text tx={item.subText as TxKeyPath} size="md" style={$subTextStyle} />
              <Pagination.Basic
                progress={progress}
                data={data}
                dotStyle={$dotStyle}
                activeDotStyle={$activeDotStyle}
                containerStyle={$paginationContainerStyle}
                onPress={onPressPagination}
              />
              <Button
                text={item.buttonText}
                style={$buttonWidth}
                onPress={() => {
                  if (index < 2) {
                    carouselRef.current?.next()
                  } else {
                    // TODO: go to sign up page
                    router.push("/onboard")
                  }
                }}
              />
            </View>
          </View>
        )}
      />
    </Screen>
  )
}

const $paginationContainerStyle: ViewStyle = { gap: 5, marginTop: 10 }
const $activeDotStyle: DotStyle = { backgroundColor: "rgba(255, 255, 255, 1)" }
const $dotStyle: DotStyle = { backgroundColor: "rgba(255,255,255,0.4)", borderRadius: 50 }

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

const $welcomeSlider: ThemedStyle<ImageStyle> = ({}) => ({
  height: 200,
  width: "100%",
  marginBottom: -125,
})

const $sliderTop: ImageStyle = {
  height: 110,
  width: 210,
  position: "absolute",
  top: -2,
  left: -2,
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

const $subTextStyle: TextStyle = { textAlign: "center" }
const $buttonWidth: ViewStyle = { width: "100%" }
