import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

import SafeArea from '../src/common/SafeArea';
import { swipeToDeleteData } from '../utils/mock';
import SwipeElement from '../src/SwipeToDelete/SwipeElement';

/**
 * Uber swipe to delete animation
 */
const SwipeToDelete = ({ navigation }) => {
  const [swipeData, setData] = useState(swipeToDeleteData);
  const { container, headerItemContainer, headerItemText, elementsContainer } = styles;

  const renderItem = ({ item }) => {
    return <SwipeElement
      item={item} onSwipe={() => {
      const newItems = [...swipeData];
      newItems.splice(newItems.indexOf(item), 1);
      setData(newItems);
    }}
    />;
  };

  return (
    <SafeArea>
      <View style={container}>
        <View style={headerItemContainer}>
          <MaterialCommunityIcons name="truck-fast" size={24} color="black"/>
          <Text style={headerItemText}>Delivery</Text>
        </View>
        <View style={headerItemContainer}>
          <Entypo name="time-slot" size={24} color="black"/>
          <Text style={headerItemText}>Delivery time: 24 hours</Text>
        </View>
        <View style={elementsContainer}>
          <FlatList
            data={swipeData}
            renderItem={renderItem}
            keyExtractor={item => String(item.number)}
          />
        </View>
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  elementsContainer: {
    marginTop: 5
  },
  headerItemText: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: 'bold'
  },
  container: {
    padding: 15,
    backgroundColor: 'white',
    height: '100%'
  },
  headerItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 0.5,
    paddingBottom: 10
  }
});

export default SwipeToDelete;
