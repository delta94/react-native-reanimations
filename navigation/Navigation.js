import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './RootNavigation';

import Dashboard from '../screens/Dashboard';
import NightModeScreen from '../screens/NightModeScreen';

const Drawer = createDrawerNavigator();

const Navigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Drawer.Navigator initialRouteName="Dashboard">
        <Drawer.Screen name="Dashboard" component={Dashboard}/>
        <Drawer.Screen name="NightMode" component={NightModeScreen}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
