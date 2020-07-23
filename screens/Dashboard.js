import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { navigationRoutes } from '../utils/mock';
import NavigationCard from '../src/common/NavigationCard';
import SafeArea from '../src/common/SafeArea';

/**
 * Dashboard screen
 */
const Dashboard = () => {
  const { container, headerContainer, headerText } = styles;

  const renderItem = ({ item }) => {
    return <NavigationCard {...item}/>;
  };

  return (
    <SafeArea>
      <View style={container}>
        <View style={headerContainer}>
          <Text style={headerText}>Animations</Text>
        </View>

        <FlatList
          data={navigationRoutes}
          keyExtractor={item => item.name}
          renderItem={renderItem}
        />
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  headerContainer: {
    marginVertical: 10
  },
  container: {
    height: '100%',
    width: '100%'
  }
});

export default Dashboard;
