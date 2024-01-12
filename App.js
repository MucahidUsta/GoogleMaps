import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from "react-native-maps"
import {load} from "cheerio";

let id=1
export default function App() {
 
  
  const [region,setRegion] =useState(map_config.init)
  const [markers,setMarkers] = useState([])
  useEffect(()=>{
    fetch("http://www.koeri.boun.edu.tr/scripts/lst3.asp")
    .then(res =>res.text())
    .then(txt => {
      const $ = load(txt);
      const preContent =$("pre").text();
      console.log(preContent.split("\n").slice(6,506))
    })
  })
  const onRegionChange = (region) =>{ 
    setRegion(region)
  }
 
  const onMapPress = (e) =>{
    console.log(e.nativeEvent.coordinate)
    setMarkers([...markers,{coordinate:e.nativeEvent.coordinate,
      key:`m${id++}`}])
  }
  return (
   
    <View style={styles.container}>
      <MapView
      initialRegion={map_config.init}
     onPress={onMapPress}
      style={styles.map}
      onRegionChange={onRegionChange} >
      {markers.map(m=>(
      <Marker coordinate={m.coordinate} key={m.key} title={`Marker${m.key}`} 
     description='Test' />))}
    </MapView>
     </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map:{width:"100%", height:"100%"}
});

const map_config = {
  init: {
    latitude: 41.008240,
    longitude: 28.978359,
    latitudeDelta:.1,
    longitudeDelta:.1
  }
} 
