import React from 'react';
import { Layout, Text, Button, Select, SelectItem, Input } from '@ui-kitten/components';
import { View, ScrollView  } from 'react-native';


const q1 = ['Alive', 'Dead', 'Unknown']
const q2 = ['On the sand', 'In the water', 'Along the shore']
//size
const q4 = ['Yes', 'No', 'Unknown']
const q5 = ['Top Left', 'Top Right', 'Bottom Left', 'Bottom Right']


const renderOption = (title, index) => ( <SelectItem key={index} title={title}/> )


const FormTurtle2 = (props) => {

     // QUESTION 1 Alive or dead
 const [q1index, setQ1index] = React.useState('');
 const q1display = q1[q1index.row]

    // QUESTION 2 Location Notes
  const [q2index, setQ2index] = React.useState('');
  const q2display = q2[q2index.row]


 // QUESTION 3 Size
 const [turtleSize, setturtleSize] = React.useState('');


  // QUESTION 4 Amputated Flipper
  const [q4index, setQ4index] = React.useState('');
  const q4display = q4[q4index.row]
  

  // QUESTION 5 Which flipper
  const [q5index, setQ5index] = React.useState('');
  const q5display = q5[q5index.row]


  const renderFlipperQs = () => {
    if (q4index == 1) {
      return (
          <>
        {/* QUESTION 5 */}
        <Text  style={{marginTop: 5}} category='s1'> Which flipper?</Text>
       <Select status='warning' selectedIndex={q5index} value={q5display}
        onSelect={index => setQ5index(index)}>
          {q5.map(renderOption)}
        </Select>
          </>
      )
    }
  }


 const navigateForm = () => {

  let formTurtle2Data = {
    status: q1display,
    locationNotes: q2display,
    size: turtleSize,
    xampFlipper: q4display,
    xwhichFlipper: q5display,
  }

  props.navigation.navigate('FormTurtle3',
    {item: props.route.params.item, 
      ximages: props.route.params.ximages, 
      locationData: props.route.params.locationData,
      contactInfoData: props.route.params.contactInfoData,
      formAllData: props.route.params.formAllData,
      formAll2Data: props.route.params.formAll2Data,
      turtleType: props.route.params.turtleType,
      formTurtle2Data: formTurtle2Data,
    });
};

  return (
    <View style={{ flex: 1, flexDirection:'column'  }}>
    <Layout style={{flex: 1, padding:15}}>
    <ScrollView bounces={false} bouncesZoom={false} alwaysBounceVertical={false} alwaysBounceHorizontal={false}>

{/* QUESTION 1 */}
<Text style={{marginTop: 10}} category='h6'>Is the turtle alive?</Text>
    <Select status='primary' selectedIndex={q1index} value={q1display}
      onSelect={index => setQ1index(index)}>
        {q1.map(renderOption)}
    </Select>



{/* QUESTION 2 */}
<Text style={{marginTop: 10}} category='h6'>Where is the turtle?</Text>
    <Select status='primary' selectedIndex={q2index} value={q2display}
      onSelect={index => setQ2index(index)}>
        {q2.map(renderOption)}
    </Select>


  {/* QUESTION 3 */}
  <Text style={{marginTop: 10}} category='h6'>How large is the turtle?</Text>
  <Input status='primary' placeholder='Describe how large or small the turtle is'
  value={turtleSize} onChangeText={nextValue => setturtleSize(nextValue)} />


  {/* QUESTION 4 */}
  <Text style={{marginTop: 10}} category='h6'> Are any of its flippers amputated?</Text>
      <Select status='primary' selectedIndex={q4index} value={q4display}
        onSelect={index => setQ4index(index)}>
          {q4.map(renderOption)}
      </Select>


    {renderFlipperQs()}


<Button onPress={navigateForm}  style={{marginTop: 10}}  status='info'>Continue</Button>


    </ScrollView>
    </Layout>
    </View>

  );
}

export default FormTurtle2;