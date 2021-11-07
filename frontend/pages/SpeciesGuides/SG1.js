import React from 'react';
import * as eva from '@eva-design/eva';
import {  Layout, Text, Button } from '@ui-kitten/components';
import { View, ScrollView, Linking  } from 'react-native';
import { SpeciesCard } from '../../components/SpeciesCard';


let speciesList = [
  { 'id': 'SG1',
    'name': 'Hawaiian Monk Seals',
    'image': 'https://npr.brightspotcdn.com/dims4/default/940647a/2147483647/strip/true/crop/750x500+0+0/resize/880x587!/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F51%2F0d%2F56122b7c41769dc7ecc20570170e%2F750x500-rm90-mele-exploring-behind-naupaka-hmar.jpg',
    'link': 'https://h-mar.org/about-the-animals/monk-seal/'
  },
]

export class SG1 extends React.Component {
  
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
          Of all marine mammals, the Hawaiian monk seal (ʻilio holo ika ua ua) is the most endangered in the pinniped family (seals, sea lions and walrus) 
          in the western hemisphere and is listed as endangered under the Endangered Species Act.
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