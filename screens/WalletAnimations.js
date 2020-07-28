import React, { useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Animated, { add, Extrapolate, interpolate } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { diffClamp, usePanGestureHandler, withDecay } from 'react-native-redash';

import SafeArea from '../src/common/SafeArea';
import { swipeToDeleteData } from '../utils/mock';
import WalletCard from '../src/WalletAnimations/WalletCard';

const { height } = Dimensions.get('window');
const HEIGHT = 215;

/**
 * Wallet list animation
 */
const WalletAnimations = () => {
  const [containerHeight, setContainerHeight] = useState(-1);
  const visibleCards = Math.floor(height / HEIGHT);
  const { container } = styles;

  const { gestureHandler, translation, velocity, state } = usePanGestureHandler();
  const y = diffClamp(
    withDecay({
      value: translation.y,
      velocity: velocity.y,
      state
    }), (-HEIGHT * swipeToDeleteData.length) + (HEIGHT * visibleCards), 0
  );

  return (
    <SafeArea>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View
          style={container}
          onLayout={({
            nativeEvent: {
              layout: { height: h }
            }
          }) => setContainerHeight(h)}
        >
          {swipeToDeleteData.map((item, index) => {
            const positionY = add(y, index * HEIGHT);
            const isDisappearing = -HEIGHT;
            const isTop = 0;
            const isBottom = HEIGHT * (visibleCards - 1);
            const isAppearing = HEIGHT * visibleCards;
            const translateWithScale = interpolate(y, {
              inputRange: [isBottom, isAppearing],
              outputRange: [0, -HEIGHT / 2],
              extrapolate: Extrapolate.CLAMP
            });
            const translateY = add(interpolate(y, {
              inputRange: [-HEIGHT * index, 0],
              outputRange: [-HEIGHT * index, 0],
              extrapolate: Extrapolate.CLAMP
            }), translateWithScale);
            const scale = interpolate(positionY, {
              inputRange: [isDisappearing, isTop, isBottom, isAppearing],
              outputRange: [0.5, 1, 1, 0.5],
              extrapolate: Extrapolate.CLAMP
            });
            const opacity = interpolate(positionY, {
              inputRange: [isDisappearing, isTop, isBottom, isAppearing],
              outputRange: [0, 1, 1, 0],
              extrapolate: Extrapolate.CLAMP
            });

            return <Animated.View
              key={item.number}
              style={[
                { opacity, transform: [{ translateY }, { scale }] }
              ]}
            >
              <WalletCard item={item}/>
            </Animated.View>;
          })}
        </Animated.View>
      </PanGestureHandler>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15
  }
});

export default WalletAnimations;
