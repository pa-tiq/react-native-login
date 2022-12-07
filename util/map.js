import {
  createDownloadResumable,
  documentDirectory,
  getInfoAsync,
} from 'expo-file-system';

const URI_image =
  'file:///data/user/0/host.exp.exponent/files/ExperienceData/%2540anonymous%252FRNCourse-7837b07c-6635-43e2-9c07-e9a615bceacf/location.png';
const sample_OpenStreetMap_URL_image = `https://render.openstreetmap.org/cgi-bin/export?bbox=
-60.07906579971314,-3.0897065363048823,-60.06785663928902,-3.0826872324161205
&scale=8639&format=png`;

const sample_image_URL = 'http://techslides.com/demos/samples/sample.png';

const URL_image = 'https://render.openstreetmap.org/cgi-bin/export?bbox=';

export async function getMap(latitude, longitude, location) {
  if (location.length > 0) {
    console.log('stored file location: ', location);
    try {
      const file = await getInfoAsync(location);
      if (file.exists) return location;
    } catch (e) {
      console.error(e);
    }
  }

  let location_image_uri;
  const url =
    sample_image_URL +
    `${(longitude - 0.02).toFixed(14)},${(latitude - 0.01).toFixed(16)},` +
    `${(longitude + 0.02).toFixed(14)},${(latitude + 0.01).toFixed(16)}` +
    '&scale=8639&format=png';

  const downloadResumable = createDownloadResumable(
    url,
    documentDirectory + `location1.png`,
    {
      headers: {
        'user-agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
      },
    }
  );
  console.log('Download URL: ', url);

  try {
    const { uri } = await downloadResumable.downloadAsync();
    console.log('Finished downloading to ', uri);
    location_image_uri = uri;
  } catch (e) {
    console.error(e);
  }
  return location_image_uri;
}
