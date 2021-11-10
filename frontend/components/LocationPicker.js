import React from 'react';
import MapPicker from "react-native-map-picker";
import { StyleSheet, Text, View, Dimensions } from 'react-native';

  export class AddProjectLocationPicker extends React.Component {
    render() {
      return (
        <View style={{flex:1}}>
        <MapPicker
          initialCoordinate={{
            latitude: this.props.lat,
            longitude: this.props.long,
          }}
          onLocationSelect={({latitude, longitude})=>console.log(longitude, latitude)}
        />

      </View>
      );
    }
  }
  
  

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mapStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });