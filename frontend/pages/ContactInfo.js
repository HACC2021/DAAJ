import React from 'react';
import { Layout, Text, Input, Button, Select, SelectItem } from '@ui-kitten/components';
import { View, ScrollView  } from 'react-native';


const q4 = [ 'General Public', 'HMAR Volunteer', 'Agency']  // Volunteer


const ContactInfo = (props) => {

  // QUESTION 1 First Name
  const [firstName, setfirstName] = React.useState('');
   // QUESTION 2 Last Name
   const [lastName, setlastName] = React.useState('');
    // QUESTION 3 First Name
  const [phoneNumber, setphoneNumber] = React.useState('');

  // QUESTION 4 Are you a volunteer?
  const [q4index, setQ4index] = React.useState(0);
  const q4display = q4[q4index.row]

  const renderOption = (title, index) => ( <SelectItem key={index} title={title}/> )

  const navigateForm = () => {

    let contactInfoData = {
      observerName: firstName + ' ' + lastName,
      observerPhone: phoneNumber,
      observerInitials: firstName[0] + lastName[0],
      observerType: q4display,
    }

    props.navigation.navigate('FormAll',
      {item: props.route.params.item, 
        ximages: props.route.params.ximages, 
        locationData: props.route.locationData,
        contactInfoData: contactInfoData,
      });

  };




  return (
    <View style={{ flex: 1, flexDirection:'column'  }}>
    <Layout style={{flex: 1, padding:20 }}>
    <ScrollView bounces={false} bouncesZoom={false} alwaysBounceVertical={false} alwaysBounceHorizontal={false}>


  {/* QUESTION 1 */}
  <Text category='s1'>First Name</Text>
    <Input status='primary' placeholder='First Name'
    value={firstName} onChangeText={nextValue => setfirstName(nextValue)} />

  {/* QUESTION 2 */}
<Text style={{marginTop: 10}} category='s1'>Last Name</Text>
    <Input status='primary' placeholder='First Name'
    value={lastName} onChangeText={nextValue => setlastName(nextValue)} />


  {/* QUESTION 3 */}
  <Text style={{marginTop: 10}}  category='s1'>Phone Number</Text>
    <Input status='primary' placeholder='Phone Number'
    value={phoneNumber} onChangeText={nextValue => setphoneNumber(nextValue)} />


      {/* QUESTION 4 */}
      <Text style={{marginTop: 10}}  category='s1'>Describe your affiliation:</Text>
      <Select status='primary' selectedIndex={q4index} value={q4display}
        onSelect={index => setQ4index(index)}>
          {q4.map(renderOption)}
      </Select>

      <Button onPress={navigateForm} style={{marginTop: 10}}  status='info'>Continue</Button>

      </ScrollView>
    </Layout>
    </View>
  );
}

export default ContactInfo;