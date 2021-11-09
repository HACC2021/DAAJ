import React from 'react';
import { Layout, Text, Button, Select, SelectItem } from '@ui-kitten/components';
import { View, ScrollView  } from 'react-native';

const q1 = [ 'Adult', 'Subadult', 'Juvenile', 'Weaner', 'Pup', 'Unknown']
const q2 = ['On the sand', 'In the water', 'Along the shore']
const q3 = ['Yes', 'No', 'Unknown']

const FormSeal2 = (props) => {

     // QUESTION 1 Size
     const [q1index, setQ1index] = React.useState('');
     const q1display = q1[q1index.row]

    // QUESTION 2 Beach Location
    const [q2index, setQ2index] = React.useState('');
    const q2display = q2[q2index.row]

    // QUESTION 3 Mom/Pup
    const [q3index, setQ3index] = React.useState('');
    const q3display = q3[q3index.row]

    
    const renderOption = (title, index) => ( <SelectItem key={index} title={title}/> )


    const navigateForm = () => {

      let formSeal2Data = {
        size: q1display,
        momPup: q3display,
        beachPosition: q2display,
      }

      props.navigation.navigate('FormSeal3',
        {item: props.route.params.item, 
          ximages: props.route.params.ximages, 
          locationData: props.route.params.locationData,
          contactInfoData: props.route.params.contactInfoData,
          formAllData: props.route.params.formAllData,
          formAll2Data: props.route.params.formAll2Data,
          sex: props.route.params.q1display,
          formSeal2Data: formSeal2Data,
        });
    };

  return (
    <View style={{ flex: 1, flexDirection:'column'  }}>
    <Layout style={{flex: 1, padding:10}}>
    <ScrollView bounces={false} bouncesZoom={false} alwaysBounceVertical={false} alwaysBounceHorizontal={false}>


{/* QUESTION 1 */}
<Text style={{marginTop: 10}} category='h6'>Size of the seal</Text>
    <Select status='primary' selectedIndex={q1index} value={q1display}
      onSelect={index => setQ1index(index)}>
        {q1.map(renderOption)}
    </Select>


{/* QUESTION 2 */}
<Text style={{marginTop: 10}} category='h6'>Where is the seal?</Text>
    <Select status='primary' selectedIndex={q2index} value={q2display}
      onSelect={index => setQ2index(index)}>
        {q2.map(renderOption)}
    </Select>



    {/* QUESTION 3 */}
<Text style={{marginTop: 10}} category='h6'>Mother and pup pair?</Text>
    <Select status='primary' selectedIndex={q3index} value={q3display}
      onSelect={index => setQ3index(index)}>
        {q3.map(renderOption)}
    </Select>

    <Button onPress={navigateForm}  style={{marginTop: 10}}  status='info'>Continue</Button>


    </ScrollView>
    </Layout>
    </View>

  );
}

export default FormSeal2;