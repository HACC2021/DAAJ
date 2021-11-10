import React from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import { View, ScrollView, FlatList, Image  } from 'react-native';
import { LocationView } from '../../components/LocationView';
import Meteor from '@meteorrn/core';

Meteor.connect('ws://localhost:3000/websocket')


const FormSeal3 = (props) => {

  const dateObj = new Date();

  let data = {
    dateObjectObserved: dateObj,
    observerName: props.route.params.contactInfoData.observerName,
    observerPhone: props.route.params.contactInfoData.observerPhone,
    observerInitials: props.route.params.contactInfoData.observerInitials,
    observerType: props.route.params.contactInfoData.observerType,
    sector: props.route.params.locationData.xsector,
    size: props.route.params.formSeal2Data.size,
    sex:props.route.params.sex,
    beachPosition: props.route.params.formSeal2Data.beachPosition,
    mainIdentification: props.route.params.formAll2Data.mainIdentification,
    bleachNumber: props.route.params.formAllData.bleachNumber,
    tagNumber: props.route.params.formAllData.tagNumber,
    tagSide: props.route.params.formAllData.tagSide,
    tagColor: props.route.params.formAllData.tagColor,
    momPup: props.route.params.formSeal2Data.momPup,
    otherNotes: "",
    xlatitude: props.route.params.locationData.xlatitude,
    xlongitude: props.route.params.locationData.xlongitude,
    xnumHundredFt: props.route.params.formAll2Data.xnumHundredFt,
    xanimalBehavior: props.route.params.formAll2Data.xanimalBehavior,
    xTagYN: props.route.params.formAllData.xTagYN,
    xBandYN: props.route.params.formAllData.xBandYN,
    xbandColor: props.route.params.formAllData.xbandColor,
    xbleachMarkYN: props.route.params.formAllData.xbleachMarkYN,
    xscarsYN: props.route.params.formAllData.xscarsYN,
    xscarsLocation: props.route.params.formAllData.xscarsLocation,
    ximages: props.route.params.ximages,
    xisland: props.route.params.locationData.xisland,
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
      Meteor.call('addSeal', data, err => {
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
          <Image
            style={{
              width: 100, height: 100,
              marginRight: 10,
              borderRadius: 12, }}
             source={{uri: item.uri}}
          />
        )}>
        </FlatList>
        <Text style={{marginTop: 10}} category='s1'>Species Type</Text>
      <Text category='h5'>Monk Seal</Text>
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

export default FormSeal3;