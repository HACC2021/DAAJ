import React from 'react';
import * as eva from '@eva-design/eva';
import {  Layout, Text, Button } from '@ui-kitten/components';
import { View, ScrollView, Linking  } from 'react-native';
import { SpeciesCard } from '../../components/SpeciesCard';


let speciesList = [
  { 'id': 'SG4',
    'name': "Spinner Dolphins",
    'image':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpV4UFufqXdt4zABZWRIPucyiAIi32iau4cg&usqp=CAU',
    'link': 'https://h-mar.org/about-the-animals/spinner-dolphins/'
  },
]

export class SG4 extends React.Component {
  
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
          The spinner dolphin (nai’a or ka nai’a) is not currently listed under the Endangered Species Act 
          but is protected under the Marine Mammal Protection Act.
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