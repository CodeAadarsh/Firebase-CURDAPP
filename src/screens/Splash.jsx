import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS, SIZES } from '../components/Components'

const Splash = ({navigation}) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Loginscreen')
        }, 2000)

    }, [])
  return (
      <View style={styles.BackgroundSplash}>
            <View style={styles.loginBox}>
            <View style={{alignItems:'center',justifyContent:'center',top:200}}>    
                <Text style={{fontSize:50, color:COLORS.SECONDORY,fontWeight:'bold'}}>Firebase</Text>
                <Text style={{fontSize:50, color:COLORS.SECONDORY,fontWeight:'bold'}}>App</Text>
            </View>
            {/* <TouchableOpacity style={{borderWidth:0,elevation:5,padding:0,flexDirection:'row',justifyContent:'center',alignItems:'center',borderRadius:200,width:300,backgroundColor:COLORS.SECONDORY}}>
                <Image style={{width:50,height:50}} source={require('../assets/images/gpic.png')}/>
                <Text style={{fontSize:20, color:COLORS.PRIMARY,fontWeight:'700'}}>Sign in With Google</Text>
            </TouchableOpacity> */}
            </View>
        <StatusBar barStyle={'light-content'} backgroundColor={COLORS.PRIMARY}/>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
    BackgroundSplash :{
        backgroundColor:COLORS.PRIMARY,
        height:SIZES.height,
        width:SIZES.width,
        alignItems:'center',
        justifyContent:'center'
        
    },
    loginBox:{
        // position:'absolute',
        justifyContent:'space-between',
        borderWidth:0,
        height:SIZES.height*0.8,
        width:SIZES.width,
        alignItems:'center',

    },
})