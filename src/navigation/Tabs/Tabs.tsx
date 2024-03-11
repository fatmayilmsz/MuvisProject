import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../../screens/Login/Login';
import Home from '../../screens/Home/Home';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native';

const Stack = createStackNavigator();

const LogoutButton = () => {
  const navigation = useNavigation<any>();

  useEffect(() => {
    // Render olduğunda geri tuşu kaldırılıyor.
    if (navigation) {
      navigation.setOptions({
        headerLeft: () => null,
      });
    }
  }, [navigation]);

  return (
    <Button
      color="green"
      title="Çıkış Yap"
      onPress={() => {
        navigation.navigate('Login');
      }}
    />
  );
};

const Tabs: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#169D6B'},
        headerTintColor: 'white',
      }}>
      <Stack.Screen
        options={{title: 'Giriş Yap'}}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={({route}) => ({
          title: 'Ana Sayfa',
          headerRight: () => route.name === 'Home' && <LogoutButton />,
        })}
        name="Home"
        component={Home}
      />
    </Stack.Navigator>
  );
};

export default Tabs;