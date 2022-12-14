import { StyleSheet } from 'react-native';
import PlaceForm from '../components/Places/PlaceForm';
import { insertPlace } from '../util/database';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

const AddPlace = ({ navigation }) => {

  async function createPlaceHandler(place) {
    const insertedPlace = await insertPlace(place);
    console.log(insertedPlace);
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Oieeeeee',
        body: 'Cuuuuuuu',
        data: { placeId: insertedPlace.insertId },
      },
      trigger: {
        seconds: 5,
      },
    });
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
