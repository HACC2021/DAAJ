import React from 'react';
import { FlatList, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Meteor, { Mongo, withTracker } from '@meteorrn/core';

// Colelctions:
const PhoneNumbers = new Mongo.Collection( 'phoneNumbers' );
const Seals = new Mongo.Collection( 'seals' );
const Turtles = new Mongo.Collection( 'turtles' );
const Birds = new Mongo.Collection( 'birds' );
const Others = new Mongo.Collection( 'others' );



Meteor.connect('ws://localhost:3000/websocket')

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      name: '',
      number: '',
      isUpdating: false,
      id: '',
    }
  }

  // componentDidMount(){
  //   Meteor.connect('ws://localhost:3000/websocket')
  // }

  addPhoneNumber = () => {
    let data = {
      number: this.state.number,
      name: this.state.name,
    }

    if (!this.state.isUpdating) {
      Meteor.call('addPhoneNumber', data, err => {
        if( err ){
          console.log( err ) // possible to display like an error page?
        } else {
          this.setState({
            number: '',
            name: '',
            id: '',
            isUpdating: false,
          })
        }
      })
    } else { // isUpdating
      let data = {
        number: this.state.number,
        name: this.state.name,
        id: this.state.id,
      }
      console.log("line49");
      console.log(data);

      Meteor.call('updatePhoneNumber', data, err => {
        if( err ){
          console.log( err )
        } else {
          this.setState({
            number: '',
            name: '',
            id: '',
            isUpdating: false,
          })
        }
      })
    }


  }


  deletePhoneNumber = (id) => {
    const data = id;

    Meteor.call('deletePhoneNumber', data, err => {
      if( err ){
        console.log( err )
      } else {
        
      }
    })
  }
  
  updatePhoneNumber = (item) => {

    this.setState({
      number: item.number,
      name: item.name,
      isUpdating: true,
      id: item._id
    })

  }

  render() {

    // console.log(this.props.phoneNumbers[1])
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Enter a name'
          onChangeText={name => this.setState( {name} )}
          value={this.state.name}/>
        <TextInput
          style={styles.input}
          keyboardType='numeric'
          placeholder='Enter a phone number'
          onChangeText={number => this.setState( {number} )}
          value={this.state.number}/>

        <Button
          onPress={this.addPhoneNumber}
          title='Save Phone Number'/>
  
        <FlatList
          data={this.props.phoneNumbers}
          keyExtractor={(item, index) => item._id}
          renderItem={({item}) => (
            <View>
              <Text>{item.name} || {item.number}</Text> 
              <Button
                onPress = {() => this.deletePhoneNumber(item._id)}
                title="X"
                color="#a83e32"
              />
              <Button
                onPress = {() => this.updatePhoneNumber(item)}
                title="EDIT"
                color="#a83e32"
              />
            </View>
          )} />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 20
  },
  input: {
    borderWidth: 2,
    borderColor: 'gray',
    height: 50,
    margin: 10
  }
});



let AppContainer = withTracker(() => {
  Meteor.subscribe("PhoneNumbersCollection");
  let phoneNumbers = PhoneNumbers.find({}).fetch();

  Meteor.subscribe("SealsCollection");
  let seals = Seals.find({}).fetch();

  Meteor.subscribe("TurtlesCollection");
  let turtles = Turtles.find({}).fetch();

  Meteor.subscribe("BirdsCollection");
  let birds = Birds.find({}).fetch();

  Meteor.subscribe("OthersCollection");
  let others = Others.find({}).fetch();

  return {
    phoneNumbers,
    seals,
    turtles,
    birds,
    others
  };
})(App)

export default AppContainer;