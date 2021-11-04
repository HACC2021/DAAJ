import React from 'react';
import * as eva from '@eva-design/eva';
import {  Layout, Text, Button } from '@ui-kitten/components';
import { View, ScrollView  } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export class ChooseImages extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      item: this.props.route.params.item,
      images: [],
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
    this.state.images.push(result);
    if (!result.cancelled) {
      this.setState( {image: result.uri} );
    }

    

    console.log('state images');
    console.log(this.state.images);
  };


  //https://docs.expo.dev/versions/v43.0.0/sdk/imagepicker/

  render() {
    return (
      <View style={{ flex: 1, flexDirection:'column' }}>
      <Layout style={{flex: 1, padding: 10}}>
      <ScrollView style={{flex:5}} bounces={false} bouncesZoom={false} 
          alwaysBounceVertical={false} alwaysBounceHorizontal={false}>
        <Text  style={{marginTop: 10}} category='h6'>Please select up to 10 images</Text>
        <View style={{ paddingHorizontal: 16, paddingVertical: 8}}>
        <Button style={{marginTop: 10}} onPress={this.pickImage} appearance='outline'>Choose Images</Button>
        
        
        
        
        <Button style={{marginTop: 10}}  status='info'>Next</Button>
        </View>
        </ScrollView>
      </Layout>
      </View>
    );
  }
}

