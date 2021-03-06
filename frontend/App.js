import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text, Button } from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, ScrollView, Linking, Image  } from 'react-native';
import { SpeciesCard } from './components/SpeciesCard';
import { SpeciesGuide } from './pages/SpeciesGuide'
import { ChooseImages } from './pages/ChooseImages'
import { SG1 } from './pages/SpeciesGuides/SG1'
import { SG2 } from './pages/SpeciesGuides/SG2'
import { SG3 } from './pages/SpeciesGuides/SG3'
import { SG4 } from './pages/SpeciesGuides/SG4'
import { SG5 } from './pages/SpeciesGuides/SG5'
import FormSeal1 from './pages/FormSeal/FormSeal1'
import FormSeal2 from './pages/FormSeal/FormSeal2'
import FormSeal3 from './pages/FormSeal/FormSeal3'
import FormBird1 from './pages/FormBird/FormBird1'
import FormBird2 from './pages/FormBird/FormBird2'
import FormOther1 from './pages/FormOther/FormOther1'
import FormOther2 from './pages/FormOther/FormOther2'
import FormTurtle1 from './pages/FormTurtle/FormTurtle1'
import FormTurtle2 from './pages/FormTurtle/FormTurtle2'
import FormTurtle3 from './pages/FormTurtle/FormTurtle3'
import FormAll from './pages/FormAll';
import FormAll2 from './pages/FormAll2';
import ThankYou from './pages/ThankYou';
import { LocationForm } from './pages/LocationForm';
import ContactInfo from './pages/ContactInfo';


const HomeScreen = ({navigation}) => {

  const navigateReportDistressed = () => {
    navigation.navigate('Report Distressed');
  };

  const navigateSpeciesGuide = () => {
    navigation.navigate('Species Guide');
  };

  const navigateChooseSpecies = () => {
    navigation.navigate('Disclaimer');
  };

  return (
    <View style={{ flex: 1, flexDirection:'column' }}>
    <Layout style={{flex: 1, padding: 15}}>
      <Image  style={{width:250, height:150}} source={require('./assets/daaj-logo.png')}/>
      <Text style={{marginTop: 10}} category='h1'>E komo mai!</Text>
      <Text style={{marginTop: 10}} category='s1'>Please read the species guides to better understand the animals:</Text>
      <Button style={{marginTop: 10}} size='large' appearance='outline' status='info' onPress={navigateSpeciesGuide} >Species Guide (HMAR)</Button>
      
      <Text style={{marginTop: 20}}category='h6'>You can help us out:</Text>
      <Button  style={{marginTop: 10}}  size='large' status='primary' onPress={navigateChooseSpecies}>Report a Sighting</Button>
      {/* <Text style={{marginTop: 10}} category='h6'>OR</Text> */}
      <Button style={{marginTop: 10}}  size='large' status='info' onPress={navigateReportDistressed}>Report Distressed Animal</Button>
      
      
    </Layout>
    </View>
  );
}

const Disclaimer = ({navigation}) => {

  const navigateChooseSpecies = () => {
    navigation.navigate('Choose Species');
  };

  return (
    <View style={{ flex: 1, flexDirection:'column'  }}>
    <Layout style={{flex: 1, padding:20, alignItems: 'center'}}>
      <Text category='h6'>Please try to keep your distance from the animal, if you don't know the answer to a question on the form, just press unknown.</Text>
      <Button style={{marginTop: 20}} size='large' status='info' onPress={navigateChooseSpecies}>I understand, Continue</Button>
    </Layout>
    </View>

  );
}


let speciesList = [
  { 'id': 'SG1', 'form': 'FormSeal1',
    'name': 'Hawaiian Monk Seals',
    'image': 'https://npr.brightspotcdn.com/dims4/default/940647a/2147483647/strip/true/crop/750x500+0+0/resize/880x587!/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F51%2F0d%2F56122b7c41769dc7ecc20570170e%2F750x500-rm90-mele-exploring-behind-naupaka-hmar.jpg'
  },
  { 'id': 'SG2', 'form': 'FormTurtle1',
    'name':"Hawaii's Sea Turtles",
    'image':'https://mauikayakadventures.com/wp-content/uploads/P8290054Sunomen--1030x773.jpg'
  },
  { 'id': 'SG3', 'form': 'FormBird1',
    'name': "Hawaii's Sea Birds",
    'image':'https://h-mar.org/wp-content/uploads/2019/06/BoninPetrel.jpg'
  },
  { 'id': 'SG4', 'form': 'FormOther1',
    'name': "Spinner Dolphins",
    'image':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpV4UFufqXdt4zABZWRIPucyiAIi32iau4cg&usqp=CAU'
  },
  { 'id': 'SG5', 'form': 'FormOther1',
    'name': "Humpback Whales",
  'image':'https://www.scubadiving.com/sites/scubadiving.com/files/styles/opengraph_1_91x1/public/images/2021/03/humpback-whale-shutterstock-craig-lambert-photography.jpg?itok=UkKURyI3'
  },
  { 'id': 'SG6', 'form': 'FormOther1',
  'name': "Other Species",
'image':'https://mocah.org/thumbs/5298601-water-texture-ripple-background-ocean-blue-light-wafe-sea-wallpaper-wallpaper-water-wallpaper-blue-wallpaper-sea-beauty-free-images.jpg'
  },


]

function ChooseSpecies({navigation}) {

  
  return (
    <View style={{ flex: 1, flexDirection:'column' }}>
    <Layout style={{flex: 1,}}>
    <ScrollView style={{flex:5}} bounces={false} bouncesZoom={false} 
        alwaysBounceVertical={false} alwaysBounceHorizontal={false}>
      <Text  style={{marginTop: 10, marginLeft:20}} category='h5'>I'm reporting....</Text>
      <View style={{ paddingHorizontal: 16, paddingVertical: 8}}>
       {speciesList.map( (item, index) => (
        <SpeciesCard key={index}
        speciesName={item.name}
        image={item.image}
        onClick={() => navigation.navigate('Choose Images', {item})}
        />
       ))}
      </View>
        </ScrollView>
    </Layout>
    </View>
  );
}


function ReportDistressed ({navigation}) {

  return (
  <View style={{ flex: 1 }}>
    <Layout style={{flex: 1, padding:15, alignItems: 'center'}}>
    <Text style={{marginTop: 20}} category='h6'>Please Call the statewide hotline:</Text>
    <Button size='large' style={{marginTop: 10}} onPress={() => Linking.openURL('tel:888-256-9840')}>888-256-9840</Button>
    <Text category='s1'style={{marginTop: 20}} >Does the animal appear injured or in distress? i.e. is there any evidence of a hook or fishing line, an open wound, or any unusual behavior?</Text>
    </Layout>
    </View>
    );
}



const Stack = createNativeStackNavigator();

export default App = () => (
  <>
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Choose Species" component={ChooseSpecies} />
          <Stack.Screen name="Report Distressed" component={ReportDistressed} />
          <Stack.Screen name="Species Guide" component={SpeciesGuide} />
          <Stack.Screen name="Disclaimer" component={Disclaimer} />
          <Stack.Screen name="SG1" component={SG1}  options={{ title: 'Species Guide' }}/>
          <Stack.Screen name="SG2" component={SG2}  options={{ title: 'Species Guide' }}/>
          <Stack.Screen name="SG3" component={SG3}  options={{ title: 'Species Guide' }}/>
          <Stack.Screen name="SG4" component={SG4}  options={{ title: 'Species Guide' }}/>
          <Stack.Screen name="SG5" component={SG5}  options={{ title: 'Species Guide' }}/>
          {/* Begin Form: Choose Species */}
          <Stack.Screen name="Choose Images" component={ChooseImages} />
          <Stack.Screen name="LocationForm" options={{ title: 'Location' }}  component={LocationForm} />
          <Stack.Screen name="ContactInfo" options={{ title: 'Contact Information' }}  component={ContactInfo} />
          <Stack.Screen name="FormAll" options={{ title: 'Identifying Characteristics' }} component={FormAll} />
          <Stack.Screen name="FormAll2" options={{ title: 'Identifying Characteristics' }} component={FormAll2} />
          <Stack.Screen name="FormSeal1" options={{ title: 'Seal Sighting' }} component={FormSeal1} />
          <Stack.Screen name="FormSeal2" options={{ title: 'Seal Sighting' }} component={FormSeal2} />
          <Stack.Screen name="FormSeal3" options={{ title: 'Seal Sighting' }} component={FormSeal3} />
          <Stack.Screen name="FormBird1" options={{ title: 'Bird Sighting' }} component={FormBird1} />
          <Stack.Screen name="FormBird2" options={{ title: 'Bird Sighting' }} component={FormBird2} />
          <Stack.Screen name="FormTurtle1" options={{ title: 'Turtle Sighting' }} component={FormTurtle1} />
          <Stack.Screen name="FormTurtle2" options={{ title: 'Turtle Sighting' }} component={FormTurtle2} />
          <Stack.Screen name="FormTurtle3" options={{ title: 'Turtle Sighting' }} component={FormTurtle3} />
          <Stack.Screen name="FormOther1" options={{ title: 'Other Sighting' }} component={FormOther1} />
          <Stack.Screen name="FormOther2" options={{ title: 'Other Sighting' }} component={FormOther2} />
          <Stack.Screen name="ThankYou" options={{ title: 'Thank You!' }} component={ThankYou} />


        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  </>
);

