import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../screens/Splash';
import Homescreen from '../screens/Homescreen';
import Loginscreen from '../screens/authentication/Loginscreen';


const Stack = createStackNavigator();

function Authnavigator() {
  return (
    <Stack.Navigator initialRouteName='Splash' screenOptions={{headerShown:false}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Homescreen" component={Homescreen} />
      <Stack.Screen name="Loginscreen" component={Loginscreen} />
      {/* <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} /> */}
    </Stack.Navigator>
  );
}
export default Authnavigator;