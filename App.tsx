import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Tabs from './src/components/Tabs';
import 'react-native-safe-area-context';
import {enableScreens} from 'react-native-screens';
import {UserProvider} from './src/contexts/UserContext';

enableScreens();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <UserProvider>
        <Tabs />
      </UserProvider>
    </NavigationContainer>
  );
};

export default App;
