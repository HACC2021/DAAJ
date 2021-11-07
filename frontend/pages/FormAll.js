import React from 'react';
import { Layout, Text, Input, Button, Select, SelectItem } from '@ui-kitten/components';
import { View, ScrollView  } from 'react-native';


const q1 = [ 'Yes', 'No', 'Unknown']  // Tag
const q2 = [ 'Red', 'Other', 'N/A'] // Color
// let tagCode = '';
const q4 = [ 'Left', 'Right', 'Unknown','N/A'] // Tag Side
const q5 = [ 'Yes', 'No', 'Unknown'] // Band
const q6 = [ 'Red', 'Other', 'N/A'] // Color
const q7 = [ 'Yes', 'No', 'Unknown']  // Bleach markings
const q8 = ['Natural', 'Applied', 'Unknown', 'N/A']
// let bleachNumber = '';
const q10 = [ 'Yes', 'No', 'Unknown']  // Scars
// let scarsWhere = '';
const q12 =  [ 'Yes', 'No', 'Unknown']  // Other Markings
// let otherMarkingsWhere = '';
const q14 = ['Tag', 'Band', 'Bleach Marking', 'Scars', 'Other Marking', 'N/A']



const FormAll = (props) => {
  // console.log(props.route.params);

  // QUESTION 1 Does the animal have a tag?
  const [q1index, setQ1index] = React.useState(0);
  const q1display = q1[q1index.row]

   // QUESTION 2 If so, what color?
   const [q2index, setQ2index] = React.useState(0);
   const q2display = q2[q2index.row]
 
   // QUESTION 3 Tag Code?
   const [tagCode, settagCode] = React.useState('');

   // QUESTION 4 Tag side ?
   const [q4index, setQ4index] = React.useState(0);
   const q4display = q4[q4index.row]

  // QUESTION 5 Does the animal have a band?
  const [q5index, setQ5index] = React.useState(0);
  const q5display = q5[q5index.row]

  // QUESTION 6 If so, what color?
  const [q6index, setQ6index] = React.useState(0);
  const q6display = q6[q6index.row]
  
  // QUESTION 7 Bleach markings?
  const [q7index, setQ7index] = React.useState(0);
  const q7display = q7[q7index.row]
  
  // QUESTION 8 Natural or applied?
  const [q8index, setQ8index] = React.useState(0);
  const q8display = q8[q8index.row]

  // QUESTION 9 Bleach number
  const [bleachNumber, setbleachNumber] = React.useState('');

  // QUESTION 10 Scars?
  const [q10index, setQ10index] = React.useState(0);
  const q10display = q10[q10index.row]

  // QUESTION 11 Scars where?
  const [scarsWhere, setscarsWhere] = React.useState('');

  // QUESTION 12 Other Markings
  const [q12index, setQ12index] = React.useState(0);
  const q12display = q12[q12index.row]

  // QUESTION 13 Where
  const [otherMarkingsWhere, setotherMarkingsWhere] = React.useState('');

 // QUESTION 14 Most Prominent
 const [q14index, setQ14index] = React.useState(0);
 const q14display = q14[q14index.row]

  const renderOption = (title, index) => ( <SelectItem key={index} title={title}/> )

  const renderTagQs = () => {
    if (q1index == 1) {
    return (
      <>
       {/* QUESTION 2 */}
       <Text category='s1'>If so, what color?</Text>
      <Select status='warning' selectedIndex={q2index} value={q2display}
        onSelect={index => setQ2index(index)}>
          {q2.map(renderOption)}
      </Select>
      {/* QUESTION 3 */}
      <Text category='s1'>What's the tag code?</Text>
      <Input status='warning' placeholder='Enter tag code or leave empty'
      value={tagCode} onChangeText={nextValue => settagCode(nextValue)} />

      {/* QUESTION 4 */}
      <Text category='s1'>What side is the tag on?</Text>
      <Select status='warning' selectedIndex={q4index} value={q4display}
        onSelect={index => setQ4index(index)}>
          {q4.map(renderOption)}
      </Select>
      </>
    )}
  }

  const renderBandQs = () => {
    if (q5index == 1) {
    return (
      <>
      {/* QUESTION 6 */}
      <Text category='s1'>If so, what color?</Text>
      <Select status='warning' selectedIndex={q6index} value={q6display}
        onSelect={index => setQ6index(index)}>
          {q6.map(renderOption)}
      </Select>
      </>
    )}
  }

  const renderBleachQs = () => {
    if (q7index == 1) {
    return (
      <>
         {/* QUESTION 8 */}
      <Text category='s1'>If so, what kind of markings?</Text>
      <Select status='warning' selectedIndex={q8index} value={q8display}
        onSelect={index => setQ8index(index)}>
          {q8.map(renderOption)}
      </Select>

          {/* QUESTION 9 */}
          <Text category='s1'>If applied, what is the number?</Text>
      <Input status='warning' placeholder='Enter bleach code or leave empty'
      value={bleachNumber} onChangeText={nextValue => setbleachNumber(nextValue)} />

      </>
    )}
  }

  const renderScarsQs = () => {
    if (q10index == 1) {
    return (
      <>
          {/* QUESTION 11 */}
          <Text category='s1'>Where are the scars?</Text>
      <Input status='warning' placeholder='Where are the scars'
      value={scarsWhere} onChangeText={nextValue => setscarsWhere(nextValue)} />

      </>
    )}
  }


  const renderOtherMarkingsQs = () => {
    if (q12index == 1) {
    return (
      <>
          {/* QUESTION 13 */}
          <Text category='s1'>Please describe the markings</Text>
      <Input status='warning' placeholder='Enter description'
      value={otherMarkingsWhere} onChangeText={nextValue => setotherMarkingsWhere(nextValue)} />

      </>
    )}
  }


  // TODO: Add data to pass to next page.
  // TODO: Convert selected indexes to actual data values when passing to next page.


  const navigateForm = () => {

    let formAllData = {
      sealPresent: 'Yes',
      xTagYN: q1display,
      tagNumber: tagCode,
      tagSide: q4display,
      tagColor: q2display,
      xBandYN: q5display,
      xbandColor: q6display,
      xbleachMarkYN: q7display,
      bleachNumber: bleachNumber,
      xscarsYN: q10display,
      xscarsLocation: scarsWhere,
    }

    props.navigation.navigate('FormAll2',
      {item: props.route.params.item, 
        ximages: props.route.params.ximages, 
        locationData: props.route.params.locationData,
        contactInfoData: props.route.params.contactInfoData,
        formAllData: formAllData,
      });
  };


  return (
    <View style={{ flex: 1, flexDirection:'column'  }}>
    <Layout style={{flex: 1, padding:15, }}>
      <ScrollView bounces={false} bouncesZoom={false} alwaysBounceVertical={false} alwaysBounceHorizontal={false}>
      <Text  category='h6'>Does the animal have... </Text>

     
     {/* QUESTION 1 */}
      <Text  style={{marginTop: 5}} category='s1'> ... a tag?</Text>
      <Select status='primary' selectedIndex={q1index} value={q1display}
        onSelect={index => setQ1index(index)}>
          {q1.map(renderOption)}
      </Select>
      
      {renderTagQs()}

      {/* QUESTION 5 */}
      <Text style={{marginTop: 10}} category='s1'> ... a band?</Text>
      <Select status='primary' selectedIndex={q5index} value={q5display}
        onSelect={index => setQ5index(index)}>
          {q5.map(renderOption)}
      </Select>

      {renderBandQs()}


      {/* QUESTION 7 */}
      <Text style={{marginTop: 10}} category='s1'> ... bleach markings?</Text>
      <Select status='primary' selectedIndex={q7index} value={q7display}
        onSelect={index => setQ7index(index)}>
          {q7.map(renderOption)}
      </Select>

      {renderBleachQs()}

        {/* QUESTION 10 */}
        <Text style={{marginTop: 10}} category='s1'> ... scars?</Text>
      <Select status='primary' selectedIndex={q10index} value={q10display}
        onSelect={index => setQ10index(index)}>
          {q10.map(renderOption)}
      </Select>

      {renderScarsQs()}

       {/* QUESTION 12 */}
      <Text style={{marginTop: 10}} category='s1'> ... other markings?</Text>
      <Select status='primary' selectedIndex={q12index} value={q12display}
        onSelect={index => setQ12index(index)}>
          {q12.map(renderOption)}
      </Select>

    {renderOtherMarkingsQs()}



      <Button onPress={navigateForm} style={{marginTop: 10}}  status='info'>Continue</Button>

    </ScrollView>
    </Layout>
    </View>

  );
}

export default FormAll;