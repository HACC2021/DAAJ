import React from 'react';
import {  Layout, Text, Button, Select, SelectItem } from '@ui-kitten/components';
import { View, ScrollView,  } from 'react-native';
import * as Location from 'expo-location';
import { LocationView } from '../components/LocationView';
import MapView from "react-native-maps";



export class LocationForm extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      item: this.props.route.params.item,
      location: null,
      loading: true,
      q1index: 0,
      q1display: '',
      q2index: 0,
      q2display: '',
    }
  }

  q1 = ['Oahu', 'Molokai', 'Maui', 'Hawaii', 'Kauai'];
  q2 = ['North', 'South', 'East', 'West']


  renderOption = (title, index) => ( <SelectItem key={index} title={title}/> )

  updateState(location) {
    this.setState({
      ...this.state,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      loading: false
    });
  }

  async componentDidMount() {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      this.updateState(location);
      console.log(this.state);
    } catch (error) {
      console.log(error);
    }
  }

  navigateForm = () => {
    this.props.navigation.navigate('FormAll', {item: this.props.route.params.item, 
      images: this.props.route.params.images, 
      location: this.state.location
    });
  };

  // TODO: Add code to have multiple select images instead of one by one
  //https://docs.expo.dev/versions/v43.0.0/sdk/imagepicker/

  render() {
    return (
      <View style={{ flex: 1, flexDirection:'column' }}>
      <Layout style={{flex: 1, padding: 10}}>
      <ScrollView style={{flex:5}} bounces={false} bouncesZoom={false} 
          alwaysBounceVertical={false} alwaysBounceHorizontal={false}>
        <Text  style={{marginTop: 10}} category='h6'>Where did you see the animal?</Text>
        
        <Text style={{marginTop: 10}}  category='s1'>Please select the island</Text>
      <Select  style={{marginBottom: 10}} status='primary' selectedIndex={this.state.q1index} value={this.state.q1display}
        onSelect={index => this.setState({q1index: index, q1display: this.q1[index.row]})}>
          {this.q1.map(this.renderOption)}
      </Select>
      
      <Text  category='s1'>Please select the sector of the island</Text>
      <Select  style={{marginBottom: 10}} status='primary' selectedIndex={this.state.q2index} value={this.state.q2display}
        onSelect={index => this.setState({q2index: index, q2display: this.q2[index.row]})}>
          {this.q2.map(this.renderOption)}
      </Select>


        {!this.state.loading && 
        <LocationView 
        lat={this.state.latitude} 
        long={this.state.longitude} />}
     
        <Button style={{marginTop: 10}}  appearance='outline'>Edit Location</Button>




        <Button style={{marginTop: 10}} onPress={this.navigateForm} status='info'>Continue</Button>
        </ScrollView>
      </Layout>
      </View>
    );
  }
}

