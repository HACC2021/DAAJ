import React from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import { View, ScrollView  } from 'react-native';
import { SpeciesCard } from '../../components/SpeciesCard';



let speciesList = [
  {
    'name': 'Black-footed albatross',
    'image': 'https://h-mar.org/wp-content/uploads/2019/06/BlackFootAlbatross.jpg',
    'code': ''
  },
  {
    'name': 'Laysan albatross',
    'image': 'https://h-mar.org/wp-content/uploads/2019/06/Laysan.jpg',
    'code': ''
  },
  {
    'name': 'Short-tailed albatross',
    'image': 'https://h-mar.org/wp-content/uploads/2019/06/ShortTail.jpg',
    'code': ''
  },
  {
    'name': 'Great frigatebird',
    'image': 'https://h-mar.org/wp-content/uploads/2019/06/greatfrigatebird.jpg',
    'code': ''
  },
  {
    'name': 'Christmas shearwater',
    'image': 'https://h-mar.org/wp-content/uploads/2019/06/Christmas.jpg',
    'code': ''
  },
  {
    'name': 'Newell’s shearwater ',
    'image': 'https://h-mar.org/wp-content/uploads/2019/06/Shearwood.jpg',
    'code': ''
  },
  {
    'name': 'Wedge-tailed shearwater',
    'image': 'https://h-mar.org/wp-content/uploads/2019/06/WedgeShearwater.jpg',
    'code': ''
  },
  {
    'name': 'Bulwer’s petrel',
    'image': 'https://h-mar.org/wp-content/uploads/2019/06/Bulwers.jpg',
    'code': ''
  },
  {
    'name': 'Bonin petrel',
    'image': 'https://h-mar.org/wp-content/uploads/2019/06/BoninPetrel.jpg',
    'code': ''
  },
  {
    'name': 'Hawaiian petrel',
    'image': 'https://h-mar.org/wp-content/uploads/2019/06/DarkRumped.jpg',
    'code': ''
  },
  {
    'name': 'Band-rumped storm petrel',
    'image': 'https://h-mar.org/wp-content/uploads/2019/06/BandRumpedStorm.jpg',
    'code': ''
  },
  {
    'name': 'Gray-backed tern',
    'image': 'https://h-mar.org/wp-content/uploads/2019/06/GreyBacked.jpg',
    'code': ''
  },
  {
    'name': 'Sooty tern',
    'image': 'https://h-mar.org/wp-content/uploads/2019/06/sooty.jpg',
    'code': ''
  },
  {
    'name': 'White tern',
    'image': 'https://h-mar.org/wp-content/uploads/2019/06/Whitetern.jpg',
    'code': ''
  },
  {
    'name': 'Brown booby',
    'image': 'https://h-mar.org/wp-content/uploads/2019/06/Brownbobby.jpg',
    'code': ''
  },
  {
    'name': 'Masked booby',
    'image': 'https://h-mar.org/wp-content/uploads/2019/06/Masked.jpg',
    'code': ''
  },
  {
    'name': 'Red-footed booby',
    'image': 'https://h-mar.org/wp-content/uploads/2019/06/RedFootedBobby.jpg',
    'code': ''
  },
  {
    'name': 'Black noddy',
    'image': 'https://h-mar.org/wp-content/uploads/2019/06/BlackNoddy.jpg',
    'code': ''
  },
  {
    'name': 'Brown noddy',
    'image': 'https://h-mar.org/wp-content/uploads/2019/06/BrownNoddy.jpg',
    'code': ''
  },
  {
    'name': 'Blue noddy',
    'image': 'https://h-mar.org/wp-content/uploads/2019/06/BlueNoddy.jpg',
    'code': ''
  },
  {
    'name': 'Red-tailed tropicbird',
    'image': 'https://h-mar.org/wp-content/uploads/2019/06/RedTailed.jpg',
    'code': ''
  },
  {
    'name': 'White-tailed tropicbird',
    'image': 'https://h-mar.org/wp-content/uploads/2019/06/WhiteTailed.jpg',
    'code': ''
  },
]


const FormBird1 = (props) => {

  const navigateForm = (species) => {

    props.navigation.navigate('FormBird2',
      {item: props.route.params.item, 
        ximages: props.route.params.ximages, 
        locationData: props.route.params.locationData,
        contactInfoData: props.route.params.contactInfoData,
        formAllData: props.route.params.formAllData,
        formAll2Data: props.route.params.formAll2Data,
        birdType: species,
      });
  };
  

  return (
    <View style={{ flex: 1, flexDirection:'column' }}>
    <Layout style={{flex: 1,}}>
    <ScrollView style={{flex:5}} bounces={false} bouncesZoom={false} 
        alwaysBounceVertical={false} alwaysBounceHorizontal={false}>
      <Text  style={{marginTop: 10, marginLeft:20 }} category='h5'>Select the bird species</Text>
      <View style={{ paddingHorizontal: 16, paddingVertical: 8}}>
       {speciesList.map( (item, index) => {
         return (<SpeciesCard key={index}
            speciesName={item.name}
            image={item.image}
            pageName={item.id}
            onClick={() => navigateForm(item.name)}
            />
       )})}
      </View>
      </ScrollView>
    </Layout>
    </View>

  );
}

export default FormBird1;