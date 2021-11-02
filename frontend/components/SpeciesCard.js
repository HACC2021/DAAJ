import React from 'react';
import PropTypes from 'prop-types';
import * as eva from '@eva-design/eva';
import { StyleSheet, TouchableOpacity, ImageBackground, View } from 'react-native';
import { Text } from '@ui-kitten/components';


export class SpeciesCard extends React.Component {
  
  render() {
    return (
    <TouchableOpacity activeOpacity={0.95} >
        <ImageBackground style={styles.container} source={{uri: `${this.props.image}`}}>
        <View style={styles.overlay}>
            <View  style={styles.chipContainer}>
                <Text style={styles.levelLabel} category='h5'> 
                    {this.props.speciesName}
                </Text>
            </View>

    
        </View>
        </ImageBackground>
    </TouchableOpacity>
    );
  }
}

SpeciesCard.propTypes = {
  speciesName: PropTypes.string.isRequired,
  image: PropTypes.string,
  formName: PropTypes.string
  };
  

function elevationShadowStyle(elevation) {
    return {
      elevation,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 0.5 * elevation },
      shadowOpacity: 0.3,
      shadowRadius: 0.8 * elevation
    };
  }

const styles = StyleSheet.create({
container: {
    height: 150,
    padding: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignContent: 'center',
    overflow: 'hidden',
    flexDirection: 'row',
    marginVertical: 8,
    ...elevationShadowStyle(5)
  },
levelLabel: {
    color: 'white',
},
titleLabel: {
    color: 'white',
},
chips: {
    width: 50,
    padding: 10,
    margin: 10,
},
chipsText: {
    color: 'white',
    margin: 10,
},
chipContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop:4,
    borderRadius: 100,
  },
overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.40)',
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems:'flex-start',

}

});
