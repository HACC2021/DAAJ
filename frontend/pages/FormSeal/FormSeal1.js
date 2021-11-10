import React from 'react';
import { Layout, Text, Button, Select, SelectItem } from '@ui-kitten/components';
import { View, ScrollView, Image  } from 'react-native';




const q1 = ['Female', 'Male', 'Unknown']

const FormSeal1 = (props) => {

     // QUESTION 14 Gender
 const [q1index, setQ1index] = React.useState('');
 const q1display = q1[q1index.row]

 const renderOption = (title, index) => ( <SelectItem key={index} title={title}/> )

 const navigateForm = () => {

  props.navigation.navigate('FormSeal2',
    {item: props.route.params.item, 
      ximages: props.route.params.ximages, 
      locationData: props.route.params.locationData,
      contactInfoData: props.route.params.contactInfoData,
      formAllData: props.route.params.formAllData,
      formAll2Data: props.route.params.formAll2Data,
      sex: q1display,
    });
};

  return (
    <View style={{ flex: 1, flexDirection:'column'  }}>
    <Layout style={{flex: 1, padding:15, alignItems: 'center'}}>
    <ScrollView style={{flex:5}} bounces={false} bouncesZoom={false} 
          alwaysBounceVertical={false} alwaysBounceHorizontal={false}>
        {/* QUESTION 14 */}
  <Text style={{marginTop: 10}} category='h6'>What gender is the seal?</Text>
      <Select status='primary' selectedIndex={q1index} value={q1display}
        onSelect={index => setQ1index(index)}>
          {q1.map(renderOption)}
      </Select>
      <Image  style={{width:330, height:245, marginTop:20}} source={{uri: 'https://h-mar.org/wp-content/uploads/2016/05/Screenshot-2016-05-12-23.20.12.png'}}/>

      <Button onPress={navigateForm}  style={{marginTop: 10}}  status='info'>Continue</Button>


      </ScrollView>
    </Layout>
    </View>

  );
}

export default FormSeal1;