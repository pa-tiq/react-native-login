import { View, StyleSheet, Text } from 'react-native';
import PlacesList from '../components/Places/PlacesList';

const AllPlaces = () => {
  return (
    <PlacesList/>
  );
};

export default AllPlaces;

const styles = StyleSheet.create({
  rootContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems:'center',
  }
});