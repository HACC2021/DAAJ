import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Divider, IconRegistry, Layout, Text, Button } from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, ScrollView  } from 'react-native';
import { SpeciesCard } from './components/SpeciesCard';




const HomeScreen = ({navigation}) => {
  const navigateChooseSpecies = () => {
    navigation.navigate('Choose Species');
  };

  const navigateReportDistressed = () => {
    navigation.navigate('Report Distressed');
  };

  return (
    <View style={{ flex: 1 }}>
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text category='h1'>Welcome</Text>
      <Text style={{marginTop: 10}} category='h6'>If you need help identifing a species:</Text>
      <Button style={{marginTop: 10}} size='large' status='info'>Species Guide (HMAR)</Button>
      <Divider style={{paddingTop: 50}}/>
      <Text category='h6'>Help us out:</Text>
      <Button style={{marginTop: 10}}  size='large' status='danger' onPress={navigateChooseSpecies}>Report a Sighting</Button>
      <Text style={{marginTop: 10}} category='h6'>OR</Text>
      <Button style={{marginTop: 10}}  size='large' status='danger' onPress={navigateReportDistressed}>Report Distressed Animal</Button>
      <Divider style={{paddingTop: 90}}/>
      <Text category='h6'>If you are staff or volunteer:</Text>
      <Button style={{marginTop: 10}}  size='small' status='primary'>Sign In or Sign Up</Button>

    </Layout>
    </View>
  );
}

let speciesList = [
  { 'name': 'Hawaiian Monk Seals',
    'image': 'https://hawaiioceanproject.com/wp-content/uploads/2018/03/MonkSeal_1000.jpg'
  },
  { 'name':"Hawaii's Sea Turtles",
    'image':'https://mauikayakadventures.com/wp-content/uploads/P8290054Sunomen--1030x773.jpg'
  },
  { 'name': "Hawaii's Sea Birds",
    'image':'https://h-mar.org/wp-content/uploads/2019/06/BoninPetrel.jpg'
  }
]

function ChooseSpecies() {
  return (
    <View style={{ flex: 1, flexDirection:'column' }}>
    <Layout style={{flex: 1,}}>
    <ScrollView style={{flex:5}} bounces={false} bouncesZoom={false} 
        alwaysBounceVertical={false} alwaysBounceHorizontal={false}>
      <Text  style={{marginTop: 10}} category='h5'>I'm reporting....</Text>
      <View style={{ paddingHorizontal: 16, paddingVertical: 8}}>
       {speciesList.map( (item, index) => (
        <SpeciesCard key={index}
        speciesName={item.name}
        image={item.image}
        
        />
       ))}
      </View>
        </ScrollView>
    </Layout>
    </View>
  );
}


function ReportDistressed () {
  return (
  <View style={{ flex: 1 }}>
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text category='h6'>Does the animal appear injured or in distress? i.e. is there any evidence of a hook or fishing line, an open wound, or any unusual behavior?</Text>
    <Text style={{marginTop: 20}} category='h3'>Please Call</Text>
    <Button size='large' style={{marginTop: 10}} >555-5555</Button>
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
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  </>
);