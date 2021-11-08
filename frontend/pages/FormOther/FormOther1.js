import React from 'react';
import { Layout, Text, Input, Select, SelectItem, Button } from '@ui-kitten/components';
import { View, ScrollView  } from 'react-native';


const FormOther1 = (props) => {


  // QUESTION Animal Behavior
 const [animal, setanimal] = React.useState('');

  // QUESTION Any Notes
  const [otherNotes, setotherNotes] = React.useState('');



  const renderQ1 = () => {
    if (props.route.params.item.id != 'SG4' && props.route.params.item.id != 'SG5') {
      return (
    <>
     <Text style={{marginTop: 10}} category='h6'>Name of the animal</Text>
     <Input status='primary' placeholder='Enter a name or type "Unknown"'
     value={animal} onChangeText={nextValue => animal(nextValue)} />
    </>
      )

    }

  }

  const navigateForm = () => {

    let formOther1Data = {
      animal: animal,
      otherNotes: otherNotes,
    }
  
    props.navigation.navigate('FormOther2',
      {item: props.route.params.item, 
        ximages: props.route.params.ximages, 
        locationData: props.route.params.locationData,
        contactInfoData: props.route.params.contactInfoData,
        formAllData: props.route.params.formAllData,
        formAll2Data: props.route.params.formAll2Data,
        formOther1Data: formOther1Data
      });
  };
  

  return (
    <View style={{ flex: 1, flexDirection:'column'  }}>
    <Layout style={{flex: 1, padding:15}}>
    <ScrollView bounces={false} bouncesZoom={false} alwaysBounceVertical={false} alwaysBounceHorizontal={false}>

    {renderQ1()}

    <Text style={{marginTop: 10}}  category='h6'>Any notes?</Text>
     <Input multiline={true} textStyle={{ minHeight: 200 }} status='primary' placeholder='Enter anything notable to report'
     value={otherNotes} onChangeText={nextValue => setotherNotes(nextValue)} />


    <Button onPress={navigateForm}  style={{marginTop: 10}}  status='info'>Continue</Button>

    </ScrollView>
    </Layout>
    </View>

  );
}

export default FormOther1;