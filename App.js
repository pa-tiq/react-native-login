import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import IconButton from './components/ui/IconButton';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Colors } from './constants/styles';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingOverlay from './components/ui/LoadingOverlay';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Signup' component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authContext = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name='Welcome'
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon='exit'
              color={tintColor}
              size={24}
              onPress={authContext.logout}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const [isLoading, setIsLoading] = useState(true);
  const authContext = useContext(AuthContext);
  useEffect(()=>{
    async function fetchToken(){
      const storedToken = await AsyncStorage.getItem('token');
      if(storedToken){
        authContext.authenticate(storedToken);
      }
      setIsLoading(false);
    }
    fetchToken();
  },[]);

  if(isLoading){
    return <LoadingOverlay/>;
  }

  return (
    <NavigationContainer>
      {!authContext.isAuthenticated && <AuthStack />}
      {authContext.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {



  return (
    <>
      <StatusBar style='light' />
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </>
  );
}
