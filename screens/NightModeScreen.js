import React from 'react';
import { StyleSheet, Text } from 'react-native';

import SafeArea from '../src/common/SafeArea';

/**
 * Nightmode transition animation.
 */
const NightModeScreen = ({ navigation }) => {
  return (
    <SafeArea>
      <Text>NightMode</Text>
    </SafeArea>
  );
};

const styles = StyleSheet.create({});

export default NightModeScreen;
