import * as Location from 'expo-location';

const App= async ()=>{
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    return false
  }

  let location = await Location.getCurrentPositionAsync({});
  return location
}

export default App