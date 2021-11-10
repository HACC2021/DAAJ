import React from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import { View, ScrollView, Image  } from 'react-native';
import { SpeciesCard } from '../../components/SpeciesCard';



let speciesList = [
  {
    'name': 'Green turtle (Chelonia mydas)',
    'image': 'https://www.pictorem.com/collection/900_1975184HighRes.jpg',
    'code': ''
  },
  {
    'name': 'Hawksbill turtle (Eretmochelys imbricata)',
    'image': 'https://www.edgeofexistence.org/wp-content/uploads/2017/11/Eretmochelys-imbricata_shutterstock_531298165-1000x667.jpg',
     'code': ''
  },
]

const FormTurtle1 = (props) => {


  const navigateForm = (species) => {

    props.navigation.navigate('FormTurtle2',
      {item: props.route.params.item, 
        ximages: props.route.params.ximages, 
        locationData: props.route.params.locationData,
        contactInfoData: props.route.params.contactInfoData,
        formAllData: props.route.params.formAllData,
        formAll2Data: props.route.params.formAll2Data,
        turtleType: species,
      });
  };

  return (
    <View style={{ flex: 1, flexDirection:'column'  }}>
    <Layout style={{flex: 1, }}>
    <ScrollView style={{flex:5}} bounces={false} bouncesZoom={false} 
        alwaysBounceVertical={false} alwaysBounceHorizontal={false}>
      <Text  style={{marginTop: 10, marginLeft:20 }} category='h5'>Select the turtle species</Text>
      <Text  style={{marginTop: 10, marginLeft:20, marginBottom:10 }} category='s1'>How to distinguish between species:</Text>
      <Image  style={{width:340, height:365}} source={{uri: 'https://www.researchgate.net/profile/Alasdair-Edwards/publication/257395050/figure/fig11/AS:669447366905873@1536620098689/Heads-and-dorsal-carapaces-shells-of-the-Green-and-Hawksbill-turtles-Note-the.png'}}/>
      <View style={{ paddingHorizontal: 16, paddingVertical: 8}}>
       {speciesList.map( (item, index) => {
         return (<SpeciesCard key={index}
            speciesName={item.name}
            image={item.image}
            onClick={() => navigateForm(item.name)}
            />
       )})}
      </View>
      </ScrollView>

    </Layout>
    </View>

  );
}

export default FormTurtle1;