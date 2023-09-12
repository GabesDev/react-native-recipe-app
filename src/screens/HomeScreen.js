import { View, Text, ScrollView, Image, TextInput } from "react-native"
import React, { useEffect, useState } from "react"
import { StatusBar } from "expo-status-bar"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { useNavigation } from "@react-navigation/native"
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline"
import Categories from "../components/categories"
import Recipes from "../components/recipes"
import axios from "axios"

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("Beef")
  const [categories, setCategories] = useState([])
  const [meals, setMeals] = useState([])

  useEffect(() => {
    getCategories()
    getMeals()
  }, [])

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://themealdb.com/api/json/v1/1/categories.php"
      )
      if (response && response.data) {
        setCategories(response.data.categories)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getMeals = async (category = "Beef") => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
      )
      if (response?.data) {
        setMeals(response.data.meals)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangeCategory = category => {
    if (category == activeCategory) return
    setMeals([])
    getMeals(category)
    setActiveCategory(category)
  }

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        className="space-y-6 pt-14"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}>
        {/* Avatar and Bell icon */}
        <View className="flex-row items-center justify-between mx-4 mb-2">
          <Image
            source={require("../../assets/images/avatar.png")}
            style={{ height: hp(5), width: hp(5.5) }}
          />
          <BellIcon size={hp(4)} color="gray" />
        </View>

        {/* Greetings and punchline */}
        <View className="mx-4 mb-2 space-y-2">
          <Text style={{ fontSize: hp(1.7) }} className="text-neutral-600">
            Hello, Gabes!
          </Text>
          <View>
            <Text
              style={{ fontSize: hp(3.8) }}
              className="font-semibold text-neutral-600">
              Make your own food,
            </Text>
          </View>
          <Text
            style={{ fontSize: hp(3.8) }}
            className="font-semibold text-neutral-600">
            stay at <Text className="text-amber-400">home</Text>
          </Text>
        </View>

        {/* Search bar */}
        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder="Search any recipe"
            placeholderTextColor={"gray"}
            style={{ fontSize: hp(1.7) }}
            className="flex-1 pl-3 mb-1 text-base tracking-wider"
          />
          <View className="p-3 bg-white rounded-full">
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
          </View>
        </View>

        {/* Categories */}
        <View>
          {categories.length > 0 && (
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              handleChangeCategory={handleChangeCategory}
            />
          )}
        </View>

        {/* Recipes */}
        <View><Recipes categories={categories} meals={meals} /></View>
      </ScrollView>
    </View>
  )
}
