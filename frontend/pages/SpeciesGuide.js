import React from 'react';
import * as eva from '@eva-design/eva';
import {  Layout, Text } from '@ui-kitten/components';
import { View, ScrollView  } from 'react-native';
import { SpeciesCard } from '../components/SpeciesCard';


let speciesList = [
  { 'id': 'SG1',
    'name': 'Hawaiian Monk Seals',
    'image': 'https://npr.brightspotcdn.com/dims4/default/940647a/2147483647/strip/true/crop/750x500+0+0/resize/880x587!/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F51%2F0d%2F56122b7c41769dc7ecc20570170e%2F750x500-rm90-mele-exploring-behind-naupaka-hmar.jpg'
  },
  { 'id': 'SG2',
    'name':"Hawaii's Sea Turtles",
    'image':'https://mauikayakadventures.com/wp-content/uploads/P8290054Sunomen--1030x773.jpg'
  },
  { 'id': 'SG3',
    'name': "Hawaii's Sea Birds",
    'image':'https://h-mar.org/wp-content/uploads/2019/06/BoninPetrel.jpg'
  },
  { 'id': 'SG4',
    'name': "Spinner Dolphins",
    'image':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpV4UFufqXdt4zABZWRIPucyiAIi32iau4cg&usqp=CAU'
  },
  { 'id': 'SG5',
    'name': "Humpback Whales",
  'image':'https://www.scubadiving.com/sites/scubadiving.com/files/styles/opengraph_1_91x1/public/images/2021/03/humpback-whale-shutterstock-craig-lambert-photography.jpg?itok=UkKURyI3'
  }

]



export class SpeciesGuide extends React.Component {
  
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
         {speciesList.map( (item, index) => {
           return (<SpeciesCard key={index}
              speciesName={item.name}
              image={item.image}
              pageName={item.id}
              onClick={() => this.props.navigation.navigate(item.id)}
              />
         )})}
        </View>
        </ScrollView>
      </Layout>
      </View>
    );
  }
}

