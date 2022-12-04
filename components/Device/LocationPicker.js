import { View, StyleSheet, Text, Alert} from 'react-native';
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';
import IconTextButton from '../ui/IconTextButton';
import { Colors } from '../../constants/styles';
import { useState } from 'react';

const LocationPicker = () => {
  const [location, setLocation] = useState(null);
  const [locationPermissionInformation, requestPermission] =
  useForegroundPermissions();

  // needed for Android & iOS
  async function verifyPermissions() {
    if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
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
    const location = await getCurrentPositionAsync();
    console.log(location);
  }

  function pickOnMapHandler() {}

  let locationPreview = <Text>No location chosen yet.</Text>;

  if (location) {
    locationPreview = <Text>Oieeeee</Text>;
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.locationButtonsContainer}>
        <IconTextButton icon='location' onPress={getLocationHandler}>
          Locate User
        </IconTextButton>
        <IconTextButton icon='map' onPress={pickOnMapHandler}>
          Pick On Map
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
  mapPreview:{
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary50,
    borderRadius: 4,
  },
  locationButtonsContainer: {
    flexDirection: 'row',
  },
});
