import { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TextInput } from 'react-native';
import { Colors } from '../../constants/styles';
import ImagePicker from '../Device/ImagePicker';
import LocationPicker from '../Device/LocationPicker';
import Button from '../ui/Button';

const PlaceForm = () => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [pickedLocation, setPickedLocation] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const changeTitleHandler = (enteredText) => {
    setEnteredTitle(enteredText);
  };

  function imageTakenHandler(imageUri) {
    setSelectedImage(imageUri);
  }
  function locationPickedHandler(location) {
    setPickedLocation(location);
  }
  function savePlaceHandler() {
    console.log(enteredTitle);
    console.log(selectedImage);
    console.log(pickedLocation);
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePicker onImageTaken={imageTakenHandler} />
      <LocationPicker onLocationPicked={locationPickedHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
};

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.primary800,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary800,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary50,
  },
});
