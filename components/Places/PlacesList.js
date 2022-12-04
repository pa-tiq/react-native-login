import { View, StyleSheet, Text, FlatList } from 'react-native';
import { Colors } from '../../constants/styles';
import PlaceItem from './PlaceItem';

const PlacesList = ({ places }) => {
  if (!places || places.length === 0) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.fallbackText}>No places found</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PlaceItem place={item} />}
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
    fontWeight:'bold',
    color: 'white'
  },
});
