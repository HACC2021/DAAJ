import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Stuffs } from '../../api/stuff/Stuff';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
  quantity: Number,
  condition: {
    type: String,
    allowedValues: ['excellent', 'good', 'fair', 'poor'],
    defaultValue: 'good',
  },
});

const mapStyles = {
  marginTop: "-10px",
  height: "100vh",
  width: "100%"};

const defaultCenter = {
  lat: 20.3069, lng: -157.5583
}


const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class MapView extends React.Component {

  
  // On submit, insert the data.
  submit(data, formRef) {
    const { name, quantity, condition } = data;
    const owner = Meteor.user().username;
    Stuffs.collection.insert({ name, quantity, condition, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <LoadScript
      googleMapsApiKey='AIzaSyDy4lATc_hd8VHpkRBfDYUgfD3pGNQtdXA'>
       <GoogleMap
         mapContainerStyle={mapStyles}
         zoom={7}
         center={defaultCenter}
       />
    </LoadScript>
    );
  }
}

export default MapView;
