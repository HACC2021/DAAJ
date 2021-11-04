import React from 'react';
import * as eva from '@eva-design/eva';
import {  Layout, Text } from '@ui-kitten/components';
import { View, ScrollView  } from 'react-native';

export class ChooseImages extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection:'column' }}>
      <Layout style={{flex: 1,}}>
      <ScrollView style={{flex:5}} bounces={false} bouncesZoom={false} 
          alwaysBounceVertical={false} alwaysBounceHorizontal={false}>
        <Text  style={{marginTop: 10}} category='h5'>Learn more about...</Text>
        <View style={{ paddingHorizontal: 16, paddingVertical: 8}}>
         
        </View>
        </ScrollView>
      </Layout>
      </View>
    );
  }
}

