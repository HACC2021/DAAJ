import React from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import { View, ScrollView  } from 'react-native';


const FormOther1 = (props) => {


  return (
    <View style={{ flex: 1, flexDirection:'column'  }}>
    <Layout style={{flex: 1, padding:20, alignItems: 'center'}}>
      <Text category='h5'>Form Other 1</Text>
    </Layout>
    </View>

  );
}

export default FormOther1;