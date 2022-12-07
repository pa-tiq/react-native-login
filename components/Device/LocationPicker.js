import { View, StyleSheet, Text, Alert, Image } from 'react-native';
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from 'expo-location';
import IconTextButton from '../ui/IconTextButton';
import { Colors } from '../../constants/styles';
import { useState } from 'react';
import { getMap } from '../../util/map';
import LoadingOverlay from '../ui/LoadingOverlay';

const LocationPicker = (props) => {
  const [imageZoom, setImageZoom] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [locationURI, setLocationURI] = useState('');
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  // needed for Android & iOS
  async function verifyPermissions() {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Sem permissão!',
        'vc precisa permitir o app a usar a sua localização'
      );
      return false;
    }
    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) return;
    setIsLoading(true);
    const location = await getCurrentPositionAsync();
    const uri = await getMap(
      location.coords.latitude,
      location.coords.longitude,
      locationURI
    );
    setIsLoading(false);
    //console.log('location uri:' + uri);
    setLocationURI(uri);
    props.onLocationPicked(uri);
  }

  const imageZoomHandler = () => {
    setImageZoom((previousValue) => !previousValue);
  };

  let locationPreview = <Text>No location chosen yet.</Text>;

  if (isLoading) {
    locationPreview = <LoadingOverlay />;
  }

  if (locationURI.length > 0 && !isLoading) {
    locationPreview = (
      <Image
        style={imageZoom ? styles.imageZoom : styles.image}
        source={{ uri: locationURI }}
      />
    );
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.locationButtonsContainer}>
        <IconTextButton icon='location' onPress={getLocationHandler}>
          Locate User
        </IconTextButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary50,
    borderRadius: 4,
    overflow:'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
    marginVertical: 8,
  },
  imageZoom: {
    width: '200%',
    height: '200%',
    marginVertical: 8,
  },
  locationButtonsContainer: {
    flexDirection: 'row',
    marginBottom:8
  },
});
