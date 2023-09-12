import { View, Text, Image } from "react-native"
import React, { useEffect } from "react"
import { StatusBar } from "react-native"
import Animated, { useSharedValue, withSpring } from "react-native-reanimated"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { useNavigation } from "@react-navigation/native"

export default function WelcomeScreen() {
  const ring1Padding = useSharedValue(0)
  const ring2Padding = useSharedValue(0)

  const navigation = useNavigation()

  useEffect(() => {
    ring1Padding.value = ring2Padding.value = 0
    setTimeout(() => ring1Padding.value = withSpring(ring1Padding.value + hp(5)), 100)
    setTimeout(() => ring2Padding.value = withSpring(ring2Padding.value + hp(5.5)), 300)
    setTimeout(() => navigation.navigate('Home'), 2500)
  },[])
  return (
    <View className="items-center justify-center flex-1 space-y-10 bg-amber-500">
      <StatusBar style="light" />

      {/* Logo image with rings  */}
      <Animated.View
        className="rounded-full bg-white/20"
        style={{ padding: ring1Padding }}>
        <Animated.View
          className="rounded-full bg-white/20"
          style={{ padding: ring2Padding }}>
          <Image
            source={require("../../assets/images/welcome.png")}
            style={{ width: hp(20), height: hp(20) }}
          />
        </Animated.View>
      </Animated.View>

      {/* Title and punchline */}
      <View className="flex items-center space-y-2">
        <Text
          className="font-bold tracking-widest text-white"
          style={{ fontSize: hp(7) }}>
          Foody
        </Text>
        <Text
          className="font-medium tracking-widest text-white"
          style={{ fontSize: hp(2) }}>
          Food is always right
        </Text>
      </View>
    </View>
  )
}
