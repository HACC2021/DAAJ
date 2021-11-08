import React from 'react';
import { Layout, Text, Input,  Button, Select, SelectItem } from '@ui-kitten/components';
import { View, ScrollView  } from 'react-native';



const q14 = ['Tag', 'Band', 'Bleach Marking', 'Scars', 'Other Marking', 'N/A']


const FormAll2 = (props) => {


   // QUESTION 14 Most Prominent
 const [q14index, setQ14index] = React.useState(0);
 const q14display = q14[q14index.row]

 // QUESTION 15 Animal Behavior
 const [animalBehavior, setanimalBehavior] = React.useState('');

 // QUESTION 16 Beachgoers 100 feet
 const [beachgoers, setbeachgoers] = React.useState('');




 const renderOption = (title, index) => ( <SelectItem key={index} title={title}/> )


 const navigateForm = () => {

  let formAll2Data = {
    mainIdentification: q14display,
    xanimalBehavior: animalBehavior,
    xnumHundredFt: beachgoers,
  }

  props.navigation.navigate(props.route.params.item.form,
    {item: props.route.params.item, 
      ximages: props.route.params.ximages, 
      locationData: props.route.params.locationData,
      contactInfoData: props.route.params.contactInfoData,
      formAllData: props.route.params.formAllData,
      formAll2Data: formAll2Data,
    });
};

  return (
    <View style={{ flex: 1, flexDirection:'column'  }}>
    <Layout style={{flex: 1, padding:15, }}>
      <ScrollView bounces={false} bouncesZoom={false} alwaysBounceVertical={false} alwaysBounceHorizontal={false}>

  {/* QUESTION 14 */}
  <Text style={{marginTop: 10}} category='h6'>The animal is mainly identified by ...</Text>
      <Select status='primary' selectedIndex={q14index} value={q14display}
        onSelect={index => setQ14index(index)}>
          {q14.map(renderOption)}
      </Select>


     {/* QUESTION 15 */}
     <Text style={{marginTop: 20}} category='h6'>Briefly describe the animal behavior.</Text>
      <Input status='primary' placeholder='Enter a few words about the behavior'
      value={animalBehavior} onChangeText={nextValue => setanimalBehavior(nextValue)} />


     {/* QUESTION 16 */}
     <Text style={{marginTop: 20}} category='h6'>About how many people are within 100 ft. of the animal?</Text>
      <Input status='primary' placeholder='Enter an estimate'
      value={beachgoers} onChangeText={nextValue => setbeachgoers(nextValue)} />


      <Button onPress={navigateForm}  style={{marginTop: 10}}  status='info'>Continue</Button>

      </ScrollView>
    </Layout>
    </View>
  );
}

export default FormAll2;