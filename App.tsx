import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Splash from './src/screens/Splash'
import { NavigationContainer } from '@react-navigation/native'
import Authnavigator from './src/navigators/Authnavigator';

const App = () => {
  return (
    <NavigationContainer>
      <Authnavigator/>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})