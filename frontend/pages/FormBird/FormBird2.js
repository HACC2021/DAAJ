import React from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import { View, ScrollView  } from 'react-native';


const FormBird2 = (props) => {


  return (
    <View style={{ flex: 1, flexDirection:'column'  }}>
    <Layout style={{flex: 1, padding:10, alignItems: 'center'}}>
      <Text category='h5'>Confirm Information</Text>
      <Text category='h5'>{props.route.params.birdType}</Text>
    </Layout>
    </View>

  );
}

export default FormBird2;