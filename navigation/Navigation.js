import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import { navigationRef } from './RootNavigation';
import Dashboard from '../screens/Dashboard';
import SwipeToDelete from '../screens/SwipeToDelete';
import WalletAnimations from '../screens/WalletAnimations';

const Drawer = createDrawerNavigator();

const Navigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Drawer.Navigator initialRouteName="Dashboard">
        <Drawer.Screen name="Dashboard" component={Dashboard}/>
        <Drawer.Screen name="SwipeToDelete" component={SwipeToDelete}/>
        <Drawer.Screen name="WalletAnimations" component={WalletAnimations}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
