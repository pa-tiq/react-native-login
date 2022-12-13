import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import PlaceItem from './PlaceItem';

const PlacesList = ({ places }) => {
  const navigation = useNavigation();
  function selectPlaceHandler(id) {
    navigation.navigate('PlaceDetails',{
      placeId: id
    })
  }
  if (!places || places.length === 0) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.fallbackText}>No places found</Text>
      </View>
    );
  }
  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PlaceItem place={item} onSelect={selectPlaceHandler} />
      )}
    />
  );
};

export default PlacesList;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  list: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
