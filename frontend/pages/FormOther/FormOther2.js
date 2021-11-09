import React from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import { View, ScrollView, FlatList, Image  } from 'react-native';
import { LocationView } from '../../components/LocationView';


const FormOther2 = (props) => {

  const dateObj = new Date();

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
        <Text style={{marginTop: 10}} category='s1'>Species</Text>
      <Text category='h5'>{props.route.params.formOther1Data.animal}</Text>
      <Text style={{marginTop: 10}} category='s1'>Main Identification</Text>
      <Text category='h5'>{props.route.params.formAll2Data.mainIdentification}</Text>
      <Text style={{marginTop: 10}} category='s1'>Animal Behavior</Text>
      <Text category='h5'>{props.route.params.formAll2Data.xanimalBehavior}</Text>
      <Text style={{marginTop: 10}} category='s1'>Location</Text>
      <Text category='h5'>{props.route.params.locationData.sector} {props.route.params.locationData.xisland}</Text>
      
      {renderLocView()}

      <Button style={{marginTop: 10}} status='info'>Submit</Button>



      </ScrollView>
      </Layout>
    </View>

  );
}

export default FormOther2;