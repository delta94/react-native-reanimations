import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * Wallet screen card component.
 * @param {object} props - component props.
 * @param {object} props.item - Card item.
 */
const WalletCard = ({ item }) => {
  const { container } = styles;

  return (
    <View style={container}>
      <Text>{item.number}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    height: 200,
    backgroundColor: 'orangered',
    borderWidth: 1,
    borderColor: 'white',
    padding: 15,
    marginBottom: 15
  }
});

export default WalletCard;
