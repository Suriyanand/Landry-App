import { StyleSheet, Text, View ,Alert } from 'react-native'
import React, { useEffect, useState } from 'react';
import * as Location from "expo-location"

const Home = () => {
    const [displayCurrentAddress, setdisplayCurrentAddress ] = useState("we are Loading your location");
    const [locationServiceEnabled, setlocationServiceEnabled] =useState(false);
    useEffect(()=>{
        checkIfLocationEnabled();
        getCurrentLocation();
    },[]);
    const checkIfLocationEnabled = async () => {
        let enabled =await Location.hasServicesEnabledAsync();
        if(!enabled){
            Alert.alert('Location service not enabled', 'Please enable the location services', [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              {cancelable: false}
              );
        }else{
            setlocationServiceEnabled(enabled)
        }
    }
    const getCurrentLocation = async () =>{
        let {status} = await Location.requestForegroundPermissionsAsync();

        if(status !== "granted"){
            Alert.alert('permission is denied', 'allow the access your location', [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              {cancelable: false}
              );
        };
        const {coords} =await Location.getCurrentPositionAsync();
        console.log(coords)
        if(coords){
         
            const {latitude,longitude} = coords;

            let response = await Location.reverseGeocodeAsync( {
                    latitude,
                    longitude
                }
            );
            console.log(response)
            for(let item of response){
                let address = `${item.name} ${item.city} ${item.postalCode}`
                setdisplayCurrentAddress(address)
            }
        }
    }
  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})