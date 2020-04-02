import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './src/screens/LoginScreen';
import OptionsScreen from './src/screens/OptionsScreen';
import UpdateScreen from './src/screens/UpdateScreen';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

const navigator = createStackNavigator({
  Login: {screen: LoginScreen,},
  Options: {screen: OptionsScreen,},
  Update: {screen: UpdateScreen},
},
{
  initialRouteName:'Login',
  // defaultNavigationOptions:{
  //   title:'App'
  // }
});

export default createAppContainer(navigator);