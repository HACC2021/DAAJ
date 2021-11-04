import React from 'react';
import * as eva from '@eva-design/eva';
import {  Layout, Text } from '@ui-kitten/components';
import { View, ScrollView  } from 'react-native';
import { SpeciesCard } from '../../components/SpeciesCard';


let speciesList = [
  { 'id': 'SG5',
    'name': "Humpback Whales",
  'image':'https://www.scubadiving.com/sites/scubadiving.com/files/styles/opengraph_1_91x1/public/images/2021/03/humpback-whale-shutterstock-craig-lambert-photography.jpg?itok=UkKURyI3'
  }
]

export class SG5 extends React.Component {
  
  render() {
    return (
      <View style={{ flex: 1, flexDirection:'column' }}>
      <Layout style={{flex: 1,}}>
      <ScrollView style={{flex:5}} bounces={false} bouncesZoom={false} 
          alwaysBounceVertical={false} alwaysBounceHorizontal={false}>
        <Text  style={{marginTop: 10}} category='h5'>Learn more about...</Text>
        <View style={{ paddingHorizontal: 16, paddingVertical: 8}}>
         {speciesList.map( (item, index) => {
           return (<SpeciesCard key={index}
              speciesName={item.name}
              image={item.image}
              />
         )})}

         {/* add description and guide here */}
        </View>
        </ScrollView>
      </Layout>
      </View>
    );
  }
}