import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Divider, IconRegistry, Layout, Text, Button } from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, ScrollView  } from 'react-native';
import { SpeciesCard } from './components/SpeciesCard';
import { SpeciesGuide } from './pages/SpeciesGuide'
import { ChooseImages } from './pages/ChooseImages'
import { SG1 } from './pages/SpeciesGuides/SG1'
import { SG2 } from './pages/SpeciesGuides/SG2'
import { SG3 } from './pages/SpeciesGuides/SG3'
import { SG4 } from './pages/SpeciesGuides/SG4'
import { SG5 } from './pages/SpeciesGuides/SG5'

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
    <View style={{ flex: 1 }}>
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text category='h1'>Welcome</Text>
      <Text style={{marginTop: 10}} category='h6'>If you need help identifing a species:</Text>
      <Button style={{marginTop: 10}} size='large' status='info' onPress={navigateSpeciesGuide} >Species Guide (HMAR)</Button>
      <Divider style={{paddingTop: 50}}/>
      <Text category='h6'>Help us out:</Text>
      <Button style={{marginTop: 10}}  size='large' status='danger' onPress={navigateChooseSpecies}>Report a Sighting</Button>
      <Text style={{marginTop: 10}} category='h6'>OR</Text>
      <Button style={{marginTop: 10}}  size='large' status='danger' onPress={navigateReportDistressed}>Report Distressed Animal</Button>
      <Divider style={{paddingTop: 90}}/>
      
    </Layout>
    </View>
  );
}

const Disclaimer = ({navigation}) => {

  const navigateChooseSpecies = () => {
    navigation.navigate('Choose Species');
  };

  return (
    <View style={{ flex: 1 }}>
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    
      {/* <Text category='h6'>Disclaimer:</Text> */}
      <Text category='h6'>Please try to keep your distance from the animal, if you don't know the answer to a question on the form, just press unknown.</Text>
      <Button style={{marginTop: 10}} size='large' status='success' onPress={navigateChooseSpecies}>I understand, Continue</Button>
 
    </Layout>
    </View>
  );
}


let speciesList = [
  { 'id': 'SG1', 'form': 'MonkForm1',
    'name': 'Hawaiian Monk Seals',
    'image': 'https://npr.brightspotcdn.com/dims4/default/940647a/2147483647/strip/true/crop/750x500+0+0/resize/880x587!/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F51%2F0d%2F56122b7c41769dc7ecc20570170e%2F750x500-rm90-mele-exploring-behind-naupaka-hmar.jpg'
  },
  { 'id': 'SG2', 'form': 'TurtleForm1',
    'name':"Hawaii's Sea Turtles",
    'image':'https://mauikayakadventures.com/wp-content/uploads/P8290054Sunomen--1030x773.jpg'
  },
  { 'id': 'SG3', 'form': 'BirdForm1',
    'name': "Hawaii's Sea Birds",
    'image':'https://h-mar.org/wp-content/uploads/2019/06/BoninPetrel.jpg'
  },
  { 'id': 'SG4', 'form': 'OtherForm1',
    'name': "Spinner Dolphins",
    'image':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpV4UFufqXdt4zABZWRIPucyiAIi32iau4cg&usqp=CAU'
  },
  { 'id': 'SG5', 'form': 'OtherForm1',
    'name': "Humpback Whales",
  'image':'https://www.scubadiving.com/sites/scubadiving.com/files/styles/opengraph_1_91x1/public/images/2021/03/humpback-whale-shutterstock-craig-lambert-photography.jpg?itok=UkKURyI3'
  }

]

function ChooseSpecies({navigation}) {

  
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
          <Stack.Screen name="Species Guide" component={SpeciesGuide} />
          <Stack.Screen name="Disclaimer" component={Disclaimer} />
          <Stack.Screen name="Choose Images" component={ChooseImages} />
          <Stack.Screen name="SG1" component={SG1} />
          <Stack.Screen name="SG2" component={SG2} />
          <Stack.Screen name="SG3" component={SG3} />
          <Stack.Screen name="SG4" component={SG4} />
          <Stack.Screen name="SG5" component={SG5} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  </>
);


//////////////////////////////////////////////////////

//  import React from 'react';
// import { FlatList, StyleSheet, Text, View, TextInput, Button } from 'react-native';
// import Meteor, { Mongo, withTracker } from '@meteorrn/core';
// import { AsyncStorage } from 'react-native';

// // Colelctions:
// const PhoneNumbers = new Mongo.Collection( 'phoneNumbers' );
// const Seals = new Mongo.Collection( 'seals' );
// const Turtles = new Mongo.Collection( 'turtles' );
// const Birds = new Mongo.Collection( 'birds' );
// const Others = new Mongo.Collection( 'others' );


// Meteor.connect("ws://localhost:3000/websocket", { AsyncStorage });
// Meteor.connect("wss://daaj.meteorapp.com/websocket", { AsyncStorage });

// class App extends React.Component {
//   constructor(){
//     super()
//     this.state = {
//       name: '',
//       number: '',
//       isUpdating: false,
//       id: '',
//     }
//   }

//   // componentDidMount(){
//   //   Meteor.connect('ws://localhost:3000/websocket')
//   // }

//   addPhoneNumber = () => {
//     let data = {
//       number: this.state.number,
//       name: this.state.name,
//     }

//     if (!this.state.isUpdating) {
//       Meteor.call('addPhoneNumber', data, err => {
//         if( err ){
//           console.log( err ) // possible to display like an error page?
//         } else {
//           this.setState({
//             number: '',
//             name: '',
//             id: '',
//             isUpdating: false,
//           })
//         }
//       })
//     } else { // isUpdating
//       let data = {
//         number: this.state.number,
//         name: this.state.name,
//         id: this.state.id,
//       }
//       console.log("line49");
//       console.log(data);

//       Meteor.call('updatePhoneNumber', data, err => {
//         if( err ){
//           console.log( err )
//         } else {
//           this.setState({
//             number: '',
//             name: '',
//             id: '',
//             isUpdating: false,
//           })
//         }
//       })
//     }


//   }


//   deletePhoneNumber = (id) => {
//     const data = id;

//     Meteor.call('deletePhoneNumber', data, err => {
//       if( err ){
//         console.log( err )
//       } else {
        
//       }
//     })
//   }
  
//   updatePhoneNumber = (item) => {

//     this.setState({
//       number: item.number,
//       name: item.name,
//       isUpdating: true,
//       id: item._id
//     })

//   }

//   render() {

//     // console.log(this.props.phoneNumbers[1])
//     return (
//       <View style={styles.container}>
//         <TextInput
//           style={styles.input}
//           placeholder='Enter a name'
//           onChangeText={name => this.setState( {name} )}
//           value={this.state.name}/>
//         <TextInput
//           style={styles.input}
//           keyboardType='numeric'
//           placeholder='Enter a phone number'
//           onChangeText={number => this.setState( {number} )}
//           value={this.state.number}/>

//         <Button
//           onPress={this.addPhoneNumber}
//           title='Save Phone Number'/>
  
//         <FlatList
//           data={this.props.phoneNumbers}
//           keyExtractor={(item, index) => item._id}
//           renderItem={({item}) => (
//             <View>
//               <Text>{item.name} || {item.number}</Text> 
//               <Button
//                 onPress = {() => this.deletePhoneNumber(item._id)}
//                 title="X"
//                 color="#a83e32"
//               />
//               <Button
//                 onPress = {() => this.updatePhoneNumber(item)}
//                 title="EDIT"
//                 color="#a83e32"
//               />
//             </View>
//           )} />
//       </View>
//     );
//   }

// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     marginTop: 20
//   },
//   input: {
//     borderWidth: 2,
//     borderColor: 'gray',
//     height: 50,
//     margin: 10
//   }
// });



// let AppContainer = withTracker(() => {
//   Meteor.subscribe("PhoneNumbersCollection");
//   let phoneNumbers = PhoneNumbers.find({}).fetch();

//   Meteor.subscribe("SealsCollection");
//   let seals = Seals.find({}).fetch();

//   Meteor.subscribe("TurtlesCollection");
//   let turtles = Turtles.find({}).fetch();

//   Meteor.subscribe("BirdsCollection");
//   let birds = Birds.find({}).fetch();

//   Meteor.subscribe("OthersCollection");
//   let others = Others.find({}).fetch();

//   return {
//     phoneNumbers,
//     seals,
//     turtles,
//     birds,
//     others
//   };
// })(App)

// export default AppContainer;
