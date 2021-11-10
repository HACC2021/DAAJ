import React from 'react';
import { Layout, Text, Button,  } from '@ui-kitten/components';
import { View, Image,ScrollView  } from 'react-native';
import { StackActions } from '@react-navigation/native';




const ThankYou = (props) => {



 const navigateForm = () => {

  props.navigation.dispatch(StackActions.popToTop());

};

  return (
    <View style={{ flex: 1, flexDirection:'column'  }}>
    <Layout style={{flex: 1, padding:15 }}>
      <ScrollView bounces={false} bouncesZoom={false} alwaysBounceVertical={false} alwaysBounceHorizontal={false}>
      <Image  style={{width:250, height:150}} source={require('../assets/daaj-logo.png')}/>
      <Text style={{marginTop: 5}} category='h5'>Mahalo for submitting a report! </Text>

      <Button onPress={navigateForm}  style={{marginTop: 10}}  status='info'>Back to Main Menu</Button>

      </ScrollView>
    </Layout>
    </View>
  );
}

export default ThankYou;