import React, {useState} from 'react';
import MapView,{Marker} from 'react-native-maps';
import color from 'colors'
import { Entypo } from '@expo/vector-icons'; 
import {installWebGeolocationPolyfill} from 'expo-location'
import { StyleSheet, View, Dimensions, Pressable, ScrollView, TextInput } from 'react-native';
import { GooglePlacesAutocomplete, geocodeByAddress, getLatLng } from 'react-native-google-places-autocomplete';
import getLocation from 'hooks/useLocation'
import {Text, RowView} from 'styles'

const WIDTH = Dimensions.get('screen').width
const HEIGHT = Dimensions.get('screen').height

const GooglePlaceAutoComplete = ({onGet, isFocused})=>{
    return <GooglePlacesAutocomplete
                    placeholder='Change Address'
                    minLength={2}
                    textInputProps={{ placeholderTextColor: color.white}}
                    ref = {e=>e && isFocused(e.isFocused())}
                    styles={{
                        textInput:{
                          backgroundColor:color.dark,
                          color:color.white,
                          opacity: 0.9,
                          fontFamily:'Montserrat-Regular',
                        },
                        row:{
                          backgroundColor:color.dark,
                          borderRadius:5,
                            marginTop:1,
                            opacity: 0.8
                        },
                        description:{
                          color:color.white,
                          fontFamily:'Montserrat-Regular'
                        },
                        loader:{
                          color:color.white
                        }
                    }}
                    onPress={(data, details = null) => {
                        onGet(data, details)
                    }}
                    nearbyPlacesAPI='GooglePlacesSearch'
                    enablePoweredByContainer={false}
                    query={{
                      language: 'en',
                      key: 'AIzaSyDRb1NijfXbi97U5iHiZhg8RUA0DeXZ26A',
                      components: 'country:ind',
                      
                    }}
      />
}

export default function App() {
  const [latitude, setLatitude] = useState(20.5937)
  const [longitude, setLongitude] = useState(78.9629)
  const [Address, setAddress] = useState(null)
  const [isFocused, setIsFocused] = useState(null)
  const [coords, setCoords] = useState({    
    latitude,
    longitude,
    latitudeDelta: 0.0,
    longitudeDelta: 0.0,
  })
  const MapPoints = async (current=false)=>{
    if (current){
        const {coords:{latitude, longitude}} = await getLocation()
        setLatitude(latitude)
        setLongitude(longitude)
        setCoords({...coords, latitude, longitude})
    }
  }
  const onGet = (data, details)=>{
    setAddress(data.description)
  }
  return (
    <View style={{flex:1}}>
          <MapView 
            showsCompass
            style={[StyleSheet.absoluteFillObject,styles.map]} 
            initialRegion={coords}
            coordinate={coords}
            onRegionChange={e=>{setCoords(e)}}
            rotateEnabled={false}
            // onPanDrag={(e)=>console.log(e)}
            showsCompass={false}
        >
          <Marker 
            coordinate={coords}
            pinColor={'red'}
          />
        </MapView>
      <View style={[styles.TextInput]}>
          <GooglePlaceAutoComplete styles={styles.TextInput} onGet={onGet} isFocused={setIsFocused}/>
          {isFocused && <Pressable onPress={()=>MapPoints(true)}>
            <RowView style={{backgroundColor:color.dark, opacity: 0.8, borderRadius:5, padding:10, marginTop:2}}>
                <Entypo name="location-pin" size={25} color={color.active} />
                <Text>Current Address</Text>
            </RowView>
          </Pressable>}
      </View>
      <View style={styles.container}>
        <ScrollView>
            <View>
                <Text>Current Location</Text>
                <Text regular>{Address}</Text>
            </View>
        </ScrollView>
        <Pressable style={{backgroundColor:color.active, alignSelf:'flex-end', padding:10, borderRadius:100, paddingHorizontal:20,position:'absolute', bottom:20, right:20}}>
          <Text>Save</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      position:'absolute',
      width:WIDTH,
      height: '25%',
      bottom:0,
      backgroundColor: color.dark,
      borderTopRightRadius:20,
      borderTopLeftRadius:20,
      padding:20
  },
  button:{
    padding:10,
    alignSelf:'flex-end',
    borderRadius:100,
    backgroundColor:color.active
  },
  TextInput:{
      padding:5,
      paddingHorizontal:20,
      position:'absolute',
      width:WIDTH,
      alignSelf:'center',
      top:40,
  }
});