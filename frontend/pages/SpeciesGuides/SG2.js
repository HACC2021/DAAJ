import React from 'react';
import * as eva from '@eva-design/eva';
import {  Layout, Text, Button } from '@ui-kitten/components';
import { View, ScrollView, Linking  } from 'react-native';
import { SpeciesCard } from '../../components/SpeciesCard';


let speciesList = [
  { 'id': 'SG2',
    'name':"Hawaii's Sea Turtles",
    'image':'https://mauikayakadventures.com/wp-content/uploads/P8290054Sunomen--1030x773.jpg',
    'link': 'https://h-mar.org/about-the-animals/hawaii-sea-turtles/'
  },
]

export class SG2 extends React.Component {
  
  visitSite = () => {
    Linking.openURL(speciesList[0].link);
  }


  render() {
    return (
      <View style={{ flex: 1, flexDirection:'column' }}>
      <Layout style={{flex: 1,}}>
      <ScrollView style={{flex:5}} bounces={false} bouncesZoom={false} 
          alwaysBounceVertical={false} alwaysBounceHorizontal={false}>
        <View style={{ paddingHorizontal: 16, paddingVertical: 8}}>
         {speciesList.map( (item, index) => {
           return (<SpeciesCard key={index}
              speciesName={item.name}
              image={item.image}
              />
         )})}

         <Text style={{marginTop: 10}} category='s1'>
          The green sea turtle (honu) is categorized as threatened under the Endangered Species Act while the hawksbill turtle (honu ‘ea or ʻea) 
          is categorized as endangered under the Endangered Species Act.
        </Text>

        <Text style={{marginTop: 10}} category='h6'>Learn more at h-mar.org</Text>
            <Button onPress={this.visitSite}>Visit H-mar.org</Button>
        </View>
        </ScrollView>
      </Layout>
      </View>
    );
  }
}