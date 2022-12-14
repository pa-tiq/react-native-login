import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, Alert } from 'react-native';
import IconButton from '../components/ui/IconButton';
import IconTextButton from '../components/ui/IconTextButton';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Colors } from '../constants/styles';
import { deletePlace, fetchPlaceDetails } from '../util/database';

const PlaceDetails = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [fetchedPlace, setFetchedPlace] = useState();
  const selectedPlaceId = route.params.placeId;

  const showOnMapHandler = () => {};
  const removePlaceHandler = async () => {
    await deletePlace(selectedPlaceId)
      .then(() => {
        navigation.navigate('AllPlaces');
      })
      .catch((err) => {
        Alert.alert('Remoção falhou!', 'não deu certo remover esse item.');
      });
  };

  useEffect(() => {
    async function loadPlaceData() {
      const place = await fetchPlaceDetails(selectedPlaceId);
      setFetchedPlace(place);
      navigation.setOptions({
        title: place.title,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon='trash'
            color={tintColor}
            size={24}
            onPress={removePlaceHandler}
          />
        ),
      });
      setIsLoading(false);
    }
    loadPlaceData();
  }, [selectedPlaceId]);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: fetchedPlace.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>
            {fetchedPlace.address ? fetchedPlace.address : 'Sem endereço'}
          </Text>
        </View>
        <IconTextButton icon='map' onPress={showOnMapHandler}>
          view on map
        </IconTextButton>
      </View>
    </ScrollView>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
