import React from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import { View, ScrollView, FlatList, Image  } from 'react-native';
import { LocationView } from '../../components/LocationView';
import Meteor from '@meteorrn/core';

Meteor.connect('ws://localhost:3000/websocket')
// Meteor.connect('wss://daaj.meteorapp.com/websocket')


const FormOther2 = (props) => {

  const dateObj = new Date();



  let data = {
    dateObjectObserved: dateObj,
    observerName: props.route.params.contactInfoData.observerName,
    observerPhone: props.route.params.contactInfoData.observerPhone,
    observerInitials: props.route.params.contactInfoData.observerInitials,
    observerType: props.route.params.contactInfoData.observerType,
    sector: props.route.params.locationData.xsector,
    animal: props.route.params.formOther1Data.animal,
    identification: props.route.params.formAll2Data.mainIdentification,
    BleachMarkNum: props.route.params.formAllData.fbleachNumber,
    xtagNumber: props.route.params.formAllData.tagNumber,
    xtagSide: props.route.params.formAllData.tagSide,
    xtagColor: props.route.params.formAllData.tagColor,
    otherNotes: props.route.params.formOther1Data.otherNotes,
    xlatitude: props.route.params.locationData.xlatitude,
    xlongitude: props.route.params.locationData.xlongitude,
    numHundredFt: props.route.params.formAll2Data.xnumHundredFt,
    animalBehavior: props.route.params.formAll2Data.xanimalBehavior,
    TagYN: props.route.params.formAllData.xTagYN,
    BandYN: props.route.params.formAllData.xBandYN,
    bandColor: props.route.params.formAllData.xbandColor,
    bleachMarkYN: props.route.params.formAllData.xbleachMarkYN,
    xscarsYN: props.route.params.formAllData.xscarsYN,
    xscarsLocation: props.route.params.formAllData.xscarsLocation,
    ximages: props.route.params.ximages,
    xIsland: props.route.params.locationData.xisland,
  };

  for (const property in data) {
    if (data[property] == undefined) {
      data[property] = '';
    }
    if (data[property] == NaN) {
      data[property] = '';
    }
    if (data[property] == null) {
      data[property] = '';
    }
  }
    

  const submitForm = () => {
      Meteor.call('addOther', data, err => {
        if (err) {
          console.log(err)
        } else {
          console.log("Submitted report from App.")
        }
      }) 
      props.navigation.navigate('ThankYou');
  };

  const renderLocView = () => {
      if (props.route.params.locationData.xlatitude!=null) {
        return (
          <LocationView 
        lat={props.route.params.locationData.xlatitude} 
        long={props.route.params.locationData.xlongitude}/>)
      } else {
        return (
          <Text category='h5'>No GPS data</Text>
        )
      }
  }


  return (
    <View style={{ flex: 1, flexDirection:'column'  }}>
    <Layout style={{flex: 1, padding:20,}}>
    <ScrollView style={{flex:5}} bounces={false} bouncesZoom={false} 
          alwaysBounceVertical={false} alwaysBounceHorizontal={false}>
      <Text category='h5'>Confirm Report</Text>
      <Text category='s1'>{dateObj.toLocaleDateString()} at {dateObj.toLocaleTimeString()}</Text>
      <Text style={{marginTop: 10}}category='h5'>Images</Text>
      <FlatList
        horizontal={true}
        data={props.route.params.ximages}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 5
        }}
        keyExtractor={item => item.uri}
        renderItem={ ({item, index}) => (
          <Image key={index}
            style={{
              width: 100, height: 100,
              marginRight: 10,
              borderRadius: 12, }}
             source={{uri: item.uri}}
          />
        )}>
        </FlatList>
        <Text style={{marginTop: 10}} category='s1'>Species</Text>
      <Text category='h5'>{props.route.params.formOther1Data.animal}</Text>
      <Text style={{marginTop: 10}} category='s1'>Main Identification</Text>
      <Text category='h5'>{props.route.params.formAll2Data.mainIdentification}</Text>
      <Text style={{marginTop: 10}} category='s1'>Animal Behavior</Text>
      <Text category='h5'>{props.route.params.formAll2Data.xanimalBehavior}</Text>
      <Text style={{marginTop: 10}} category='s1'>Location</Text>
      <Text category='h5'>{props.route.params.locationData.sector} {props.route.params.locationData.xisland}</Text>
      
      {renderLocView()}

      <Button onPress={submitForm} style={{marginTop: 10}} status='info'>Submit</Button>



      </ScrollView>
      </Layout>
    </View>

  );
}

export default FormOther2;