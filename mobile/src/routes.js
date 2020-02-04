import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Main from './pages/Main';
import Profile from './pages/Profile';

const Routes = createAppContainer(
    createStackNavigator({
        //definindo algumas configurações das paginas main e profile (titulos, etc)
        Main: {
            screen: Main,
            navigationOptions:{
                title: 'DevRadar'
            }
        },
        Profile:{
            screen: Profile,
            navigationOptions:{
                title: 'Perfil no github'
            }
        }, 
    },{//configurações aplicadas em TODAS as telas
        defaultNavigationOptions:{
            headerTintColor: '#fff',
            headerBackTitleVisible: false,
            headerStyle:{
                backgroundColor: '#7d40e7'
            }
        }
    } )
);

export default Routes;