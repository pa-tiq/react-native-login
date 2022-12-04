import { View, StyleSheet, Text } from 'react-native';
import PlaceForm from '../components/Places/PlaceForm';

const AddPlace = () => {
  return (
    <PlaceForm/>
  );
};

export default AddPlace;

const styles = StyleSheet.create({
  rootContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems:'center',
  }
});