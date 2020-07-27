import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, { add, cond, divide, interpolate, lessThan, multiply, sub } from 'react-native-reanimated';

const HEIGHT = 50;

const Action = ({ x, deleteOpacity }) => {
  const { removeText } = styles;
  const size = cond(lessThan(x, HEIGHT), x, add(x, sub(x, HEIGHT)));
  const translateX = cond(lessThan(x, HEIGHT), 0, divide(sub(x, HEIGHT), 2));
  const borderRadius = divide(size, 2);
  const textOpacity = interpolate(size, {
    inputRange: [HEIGHT - 10, HEIGHT + 10],
    outputRange: [0, 1]
  });

  return (
    <Animated.View
      style={{
        backgroundColor: '#D93F12',
        borderRadius,
        justifyContent: 'center',
        alignItems: 'center',
        height: size,
        width: size,
        transform: [{ translateX }]
      }}
    >
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          justifyContent: 'center',
          alignItems: 'center',
          opacity: multiply(textOpacity, deleteOpacity)
        }}
      >
        <Text style={removeText}>Remove</Text>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  deleteIconWrapper: {
    backgroundColor: 'red',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  removeText: {
    color: 'white',
    fontSize: 10
  }
});

export default Action;
