import { View, StyleSheet, Alert, Text, Image } from 'react-native';
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from 'expo-image-picker';

import Button from '../ui/Button';
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

  let imagePreview = <Text>No image taken yet.</Text>;

  if (imageURI) {
    imagePreview = <Image style={styles.image} source={{ uri: imageURI }} />;
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <Button onPress={takeImageHandler}>Take Image</Button>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});
