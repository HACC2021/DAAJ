import React from 'react';
import {  Layout, Text, Button } from '@ui-kitten/components';
import { View, ScrollView, Image, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export class ChooseImages extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      item: this.props.route.params.item,
      ximages: [],
    }
  }

  componentDidMount() {
    async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    }
  
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    this.state.ximages.push(result);
    if (!result.cancelled) {
      this.setState( { image: result.uri} );
    }
    console.log('state images');
    console.log(this.state.ximages);
  };


  navigateForm = () => {
    this.props.navigation.navigate('LocationForm', {item: this.state.item, ximages: this.state.ximages});
  };

  // TODO: Add code to have multiple select images instead of one by one
  //https://docs.expo.dev/versions/v43.0.0/sdk/imagepicker/

  render() {
    return (
      <View style={{ flex: 1, flexDirection:'column' }}>
      <Layout style={{flex: 1, padding: 10}}>
      <ScrollView style={{flex:5}} bounces={false} bouncesZoom={false} 
          alwaysBounceVertical={false} alwaysBounceHorizontal={false}>
        <Text  style={{marginTop: 10}} category='h6'>Please upload photos of the animal and its surroundings so we may be better prepared for any needed field response. </Text>

        <Text style={{marginTop: 10}} category='s1'> If you see tags, bands, bleach markings, scars, or other markings, please capture it. Thank you!</Text>
        <View style={{ paddingHorizontal: 16, paddingVertical: 8}}>
        <Button style={{marginTop: 10}} onPress={this.pickImage} appearance='outline'>Choose Images</Button>

        <FlatList
        horizontal={true}
        data={this.state.ximages}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 5
        }}
        keyExtractor={item => item.uri}
        renderItem={ ({item, index}) => (
          <Image
            style={{
              width: 100, height: 100,
              marginTop: 20,
              marginRight: 10,
              borderRadius: 12, }}
             source={{uri: item.uri}}
          />
        )}>
        </FlatList>

        <Button style={{marginTop: 10}} onPress={this.navigateForm} status='info'>Continue</Button>
        </View>
        </ScrollView>
      </Layout>
      </View>
    );
  }
}

