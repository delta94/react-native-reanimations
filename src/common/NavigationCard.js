import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import * as RootNavigation from '../../navigation/RootNavigation';

/**
 * Navigation card element.
 * @param {object} props - Component props.
 * @param {string} props.name - Route name.
 */
const NavigationCard = ({ name }) => {
  const { container, screenName } = styles;

  const navigateTo = () => RootNavigation.navigate(name);

  return (
    <TouchableOpacity onPress={navigateTo}>
      <LinearGradient style={[container]} colors={['#EC407A', '#F06292']} locations={[0, 1]}>
        <Text style={screenName}>{name}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  screenName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  container: {
    marginVertical: 10,
    marginHorizontal: 15,
    height: 100,
    borderRadius: 15,
    padding: 15,
    borderWidth: 0.5,
    borderColor: '#696969'
  }
});

export default NavigationCard;
