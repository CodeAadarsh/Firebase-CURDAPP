import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../../components/Components';
//google signin
import { GoogleSignin,statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
var resX;
var profileIMGX;
var userX;
//google signin
GoogleSignin.configure({
  webClientId: '610026128441-2orghc1i5qfm1s7i1v4j7vjoo5clsj3j.apps.googleusercontent.com',
});


const Loginscreen = ({navigation}) => {
  const googlesignIN = async () => {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = await auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  const res = await auth().signInWithCredential(googleCredential);
  resX = res.user.uid;
  profileIMGX = res.user.photoURL
  userX = res.user.displayName
  console.log(res)
  navigation.replace('Homescreen')
  };
  return (
    <View style={styles.BackgroundSplash}>
    <View style={styles.loginBox}>
      <View
        style={{alignItems: 'center', justifyContent: 'center', top: 150}}>
        <Text
          style={{fontSize: 50, color: COLORS.SECONDORY, fontWeight: 'bold'}}>
          The
        </Text>
        <Text
          style={{fontSize: 50, color: COLORS.SECONDORY, fontWeight: 'bold'}}>
          Firebase
        </Text>
        <Text
          style={{fontSize: 50, color: COLORS.SECONDORY, fontWeight: 'bold'}}>
          App
        </Text>
      </View>
      <TouchableOpacity
        onPress={googlesignIN}
        style={{
          borderWidth: 0,
          elevation: 5,
          padding: 0,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 200,
          width: 300,
          backgroundColor: COLORS.SECONDORY,
        }}>
        <Image
          style={{width: 50, height: 50}}
          source={require('../../assets/images/gpic.png')}
        />
        <Text
          style={{fontSize: 20, color: COLORS.PRIMARY, fontWeight: '700'}}>
          Sign in With Google
        </Text>
      </TouchableOpacity>
    </View>
    <StatusBar barStyle={'light-content'} backgroundColor={COLORS.PRIMARY} />
  </View>
  )
}

export default Loginscreen
export {resX, profileIMGX,userX}

const styles = StyleSheet.create({
  BackgroundSplash: {
    backgroundColor: COLORS.PRIMARY,
    height: SIZES.height,
    width: SIZES.width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBox: {
    // position:'absolute',
    justifyContent: 'space-between',
    borderWidth: 0,
    height: SIZES.height * 0.8,
    width: SIZES.width,
    alignItems: 'center',
  },
});