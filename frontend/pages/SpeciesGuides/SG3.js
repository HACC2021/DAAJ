import React from 'react';
import * as eva from '@eva-design/eva';
import {  Layout, Text } from '@ui-kitten/components';
import { View, ScrollView  } from 'react-native';
import { SpeciesCard } from '../../components/SpeciesCard';


let speciesList = [
  { 'id': 'SG3',
    'name': "Hawaii's Sea Birds",
    'image':'https://h-mar.org/wp-content/uploads/2019/06/BoninPetrel.jpg'
  },
]

export class SG3 extends React.Component {
  
  render() {
    return (
      <View style={{ flex: 1, flexDirection:'column' }}>
      <Layout style={{flex: 1,}}>
      <ScrollView style={{flex:5}} bounces={false} bouncesZoom={false} 
          alwaysBounceVertical={false} alwaysBounceHorizontal={false}>
        <Text style={{marginTop: 10}} category='h5'>Learn more about...</Text>
        <View style={{ paddingHorizontal: 16, paddingVertical: 8}}>
         {speciesList.map( (item, index) => {
           return (<SpeciesCard key={index}
              speciesName={item.name}
              image={item.image}
              />
         )})}

         <Text style={{marginTop: 10}} category='s1'>
          Hawaii’s seabirds travel widely throughout the Pacific and are therefore very important sentinel species. 
          Like “canaries in a coal mine," seabirds can help us understand ecosystem changes that not only affect the birds themselves but pose serious risks to humans.
        </Text>
        </View>
        </ScrollView>
      </Layout>
      </View>
    );
  }
}