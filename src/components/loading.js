import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

export default function Loading(props) {
  return (
    <View className="items-center justify-center flexx-center">
      <ActivityIndicator {...props} />
    </View>
  )
}