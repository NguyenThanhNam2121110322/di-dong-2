
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../component/Login';
import HomeScreen from '../component/HomeScreen';

const Stack = createNativeStackNavigator();



function Navigation () {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}

export default Navigation;