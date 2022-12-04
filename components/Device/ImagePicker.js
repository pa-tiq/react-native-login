import { View, StyleSheet, Alert, Text, Image } from 'react-native';
import {
  launchImageLibraryAsync,
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
  MediaTypeOptions,
} from 'expo-image-picker';

import IconTextButton from '../ui/IconTextButton';
import { useState } from 'react';
import { Colors } from '../../constants/styles';

const ImagePicker = () => {
  const [imageURI, setImageURI] = useState(null);
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  // needed only for iOS
  async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Sem permissão!',
        'vc precisa permitir o app a usar a sua câmera'
      );
      return false;
    }
    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) return;
    const result = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    if (!result.canceled) {
      setImageURI(result.assets[0].uri);
    }
  }  
  
  async function getFileHandler() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) return;
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    if (!result.canceled) {
      setImageURI(result.assets[0].uri);
    }
  }

  let imagePreview = <Text>No image taken yet.</Text>;

  if (imageURI) {
    imagePreview = <Image style={styles.image} source={{ uri: imageURI }} />;
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <View style={styles.imageButtonsContainer}>
        <IconTextButton icon='camera' onPress={takeImageHandler}>
          Take Image
        </IconTextButton>
        <IconTextButton icon='document' onPress={getFileHandler}>
          Upload File
        </IconTextButton>
      </View>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary50,
    borderRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
    marginVertical: 8,
  },
  imageButtonsContainer:{
    flexDirection:'row',
  }
});
