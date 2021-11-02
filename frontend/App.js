import React from 'react';
import { FlatList, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Meteor, { Mongo, withTracker } from '@meteorrn/core';


const PhoneNumbers = new Mongo.Collection( 'phoneNumbers' )
Meteor.connect('ws://localhost:3000/websocket')

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      name: '',
      number: ''
    }
  }

  // componentDidMount(){
  //   Meteor.connect('ws://localhost:3000/websocket')
  // }

  addPhoneNumber = () => {
    const data = {
      number: this.state.number,
      name: this.state.name
    }

    Meteor.call('addPhoneNumber', data, err => {
      if( err ){
        console.log( err )
      } else {
        this.setState({
          number: '',
          name: ''
        })
      }
    })
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
                // onPress = {}
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
  return {
    phoneNumbers
  };
})(App)

export default AppContainer;