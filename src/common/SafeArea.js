import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const SafeArea = ({children}) => {
  return (
    <SafeAreaView>
      {children}
    </SafeAreaView>
  )
};

export default SafeArea;
