import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { abs, add, call, clockRunning, cond, eq, not, set, useCode } from 'react-native-reanimated';
import { clamp, minus, snapPoint, timing, useClock, usePanGestureHandler, useValue } from 'react-native-redash';

import Action from './Action';

const { width } = Dimensions.get('window');
const snapPoints = [-width, -100, 0];
const HEIGHT = 50;

/**
 * Swipe element
 * @param {object} props - component props.
 * @param {object} props.item - Element data.
 * @param {function} props.onSwipe - On swipe animation callback.
 */
const SwipeElement = ({ item, onSwipe }) => {
  const { listElementContainer, numberWrapper, titleText, priceText, itemBackground } = styles;

  const { gestureHandler, translation, velocity, state } = usePanGestureHandler();
  const translateX = useValue(0);
  const offsetX = useValue(0);
  const height = useValue(HEIGHT);
  const deleteOpacity = useValue(1);
  const clock = useClock();
  const to = snapPoint(translateX, velocity.x, snapPoints);
  const shouldRemove = useValue(0);

  useCode(
    () => [
      cond(
        eq(state, State.ACTIVE),
        set(translateX, add(offsetX, clamp(translation.x, -9999, minus(offsetX))))
      ),
      cond(eq(state, State.END), [
        set(translateX, timing({ clock, from: translateX, to })),
        set(offsetX, translateX),
        cond(eq(to, -width), set(shouldRemove, 1))
      ]),
      cond(shouldRemove, [
        set(height, timing({ from: HEIGHT, to: 0 })),
        set(deleteOpacity, 0),
        cond(not(clockRunning(clock)), call([], () => onSwipe(item)))
      ])
    ], [onSwipe]
  );

  return (
    <Animated.View>
      <TouchableWithoutFeedback onPress={() => shouldRemove.setValue(1)}>
        <View style={itemBackground}>
          <Action x={abs(translateX)} {...{ deleteOpacity }}/>
        </View>
      </TouchableWithoutFeedback>

      <PanGestureHandler {...gestureHandler}>
        <Animated.View style={{ height, transform: [{ translateX }] }}>
          <View style={listElementContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={numberWrapper}>
                <Text>{item.number}</Text>
              </View>
              <Text style={titleText}>{item.title}</Text>
            </View>
            <Text style={priceText}>{item.price}</Text>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  priceText: {
    fontWeight: 'bold',
    marginRight: 10
  },
  titleText: {
    marginLeft: 15
  },
  numberWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C3C3C3',
    width: 40,
    height: 40
  },
  listElementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: HEIGHT,
    backgroundColor: 'white'
  },
  itemBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#CACACA',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'hidden'
  }
});

export default SwipeElement;
