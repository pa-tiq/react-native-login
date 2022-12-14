import { StyleSheet } from 'react-native';
import PlaceForm from '../components/Places/PlaceForm';
import { insertPlace } from '../util/database';
import * as Notifications from 'expo-notifications';
const keys = require('../keys.json');

const AddPlace = ({ navigation }) => {

  function scheduleLocalNotification(insertedPlace){
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Local notification',
        body: insertedPlace.title,
        data: { placeId: insertedPlace.insertId },
      },
      trigger: {
        seconds: 5,
      },
    });
  }

  function sendPushNotification(insertedPlace){
    fetch('https://exp.host/--/api/v2/push/send',{
      method:'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        to:keys.expo_push_token,
        title:'Push notification',
        body:insertedPlace.title,
        data: { placeId: insertedPlace.insertId }
      })
    })
  }

  async function createPlaceHandler(place) {
    const insertedPlace = await insertPlace(place);
    sendPushNotification(insertedPlace);   
    navigation.navigate('AllPlaces');
  }
  
  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlace;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
