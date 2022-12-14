import { NavigationContainer, useNavigation } from '@react-navigation/native';
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
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import { init } from './util/database';
import PlaceDetails from './screens/PlaceDetails';
import * as Notifications from 'expo-notifications';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary700 },
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
  const navigation = useNavigation();

  useEffect(() => {
    const notificationGenerationListener = Notifications.addNotificationReceivedListener((notification) => {
      const placeId = notification.request.content.data.placeId;
      //console.log('notification generated - placeId=',placeId);
    });
    const notificationUserInteractionListener = Notifications.addNotificationResponseReceivedListener((response)=>{
      const placeId = response.notification.request.content.data.placeId;
      //console.log('notification touched by user - placeId=',placeId);
      navigation.navigate('PlaceDetails',{
        placeId: placeId
      });
    })
    return () => {
      notificationGenerationListener.remove();
      notificationUserInteractionListener.remove();
    }
  }, []);

  const welcomeStackScreen = (
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
  );

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary700 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name='AllPlaces'
        component={AllPlaces}
        options={({ navigation }) => ({
          title: 'Lista Caralhuda',
          headerTitleAlign: 'center',
          headerLeft: ({ tintColor }) => (
            <IconButton
              icon='exit'
              color={tintColor}
              size={24}
              onPress={authContext.logout}
            />
          ),
          headerRight: ({ tintColor }) => (
            <IconButton
              icon='add'
              color={tintColor}
              size={24}
              onPress={() => navigation.navigate('AddPlace')}
            />
          ),
        })}
      />
      <Stack.Screen
        name='AddPlace'
        component={AddPlace}
        options={{ title: 'Add a new Place', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name='PlaceDetails'
        component={PlaceDetails}
        options={{ title: 'Loading Place...', headerTitleAlign: 'center' }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const [isLoading, setIsLoading] = useState(true);
  const authContext = useContext(AuthContext);
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        authContext.authenticate(storedToken);
      }
      setIsLoading(false);
    }
    fetchToken();
  }, []);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <NavigationContainer>
      {!authContext.isAuthenticated && <AuthStack />}
      {authContext.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    init()
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <>
      <StatusBar style='light' />
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </>
  );
}
