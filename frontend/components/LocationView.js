import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity,
    ImageBackground, Image, View, Linking } from 'react-native';
import { Text, Icon } from '@ui-kitten/components';
import MapView from "react-native-maps";



export class LocationView extends React.Component {

    coord = {
        latitude: this.props.lat,
        longitude: this.props.long,
    }
  
  render() {
    return (
    <TouchableOpacity activeOpacity={0.95} >
        <MapView style={styles.container}
            initialRegion={{
                latitude: this.props.lat,
                longitude: this.props.long,
                latitudeDelta: 0.03864195044303443,
                longitudeDelta: 0.030142817690068,
            }}>
                <MapView.Marker
                coordinate={this.coord}
                title={this.props.projectName}
                />
        </MapView>
    </TouchableOpacity>
    );
  }
}

LocationView.propTypes = {
    lat: PropTypes.number.isRequired,
    long: PropTypes.number.isRequired,
  };
  
  LocationView.defaultProps = {
    lat: 21.30669665310,
    long: -157.86562565,
  };



const styles = StyleSheet.create({
container: {
    height: 150,
    padding: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignContent: 'center',
    overflow: 'hidden',
    marginVertical: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },

  },
levelLabel: {
    color: 'white',
},
titleLabel: {
    color: 'white',
},


});
