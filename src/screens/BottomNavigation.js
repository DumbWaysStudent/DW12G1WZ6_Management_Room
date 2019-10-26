import {createAppContainer} from 'react-navigation'
import Home from './src/screens/Home';
import {createBottomTabNavigator} from 'react-navigation-tabs';
const MainApp = createBottomTabNavigator(
    {
      Home: {screen:Home} ,
  //   Settings: SettingsTab ,
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;
          //  if (routeName === 'Home') {
          //  return (
          //     <Image
          //       source={ require('../assets/icon/home.png') }
          //       style={{ width: 20, height: 20, }} />
          //   );
          // } 
        // else {
        //     return (
        //       <Image
        //         source={ require('./assets/settings.png') }
        //         style={{ width: 20, height: 20 }} />
        //     );
        //   }
        },
      }),
      tabBarOptions: {
        activeTintColor: '#FF6F00',
        inactiveTintColor: '#263238',
      },
    }
  );
  export default createAppContainer(MainApp)