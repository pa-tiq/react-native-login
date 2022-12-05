import { createDownloadResumable, documentDirectory, getContentUriAsync} from 'expo-file-system';

const URL_image = 'https://render.openstreetmap.org/cgi-bin/export?bbox=';
const URI_image = 'file:///data/user/0/host.exp.exponent/files/ExperienceData/%2540anonymous%252FRNCourse-7837b07c-6635-43e2-9c07-e9a615bceacf/location.png'

export async function getMap(latitude, longitude) {
  
  try{
    const fileExists = await getContentUriAsync(URI_image);
    if(fileExists) return URI_image;
  } catch (e) {
    console.error(e);
  }   

  let location_image_uri;
  const url =
    URL_image +
    `${longitude - 0.02},${latitude - 0.01},${longitude + 0.02},
    ${latitude + 0.01}&scale=8639&format=png`;
  
  const downloadResumable = createDownloadResumable(
    url,
    documentDirectory + 'location.png',
    {}
  );

  try {
    const { uri } = await downloadResumable.downloadAsync();
    console.log('Finished downloading to ', uri);
    location_image_uri = uri;
  } catch (e) {
    console.error(e);
  }   
  return location_image_uri;
}