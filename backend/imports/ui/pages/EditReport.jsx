import React from 'react';
import { Grid, Loader, Header, Segment, Image } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, HiddenField, NumField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Stuffs } from '../../api/stuff/Stuff';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
import { Turtles } from '../../api/turtle/Turtle';
import { Birds } from '../../api/bird/Bird';
import { Seals } from '../../api/seal/Seal';
import { Others } from '../../api/other/Other';

const sealFormSchema = new SimpleSchema({
  TicketNumber: String,
  HotlineOpInitials:String,
  TicketType: String,
  ObserverName: String,
  ObserverPhone: String,
  ObserverInitials: String,
  ObserverType: {
    type: String,
    allowedValues: ['P', 'V', 'A'],
  },
  Sector: {
    type: String,
    allowedValues: ['North', 'East', 'West', 'South'],
  },
  Size: String,
  Sex: {
    type: String,
    allowedValues: ['M', 'F', 'U'],
  },
  BeachPosition: {
    type: String,
    allowedValues: ['On the sand', 'In the water', 'Along the shore'],
  },
  MainIdentification: {
    type: String,
    allowedValues: ['T', 'B', 'N', 'A', ''],
  },
  BleachNumber: String,
  TagNumber: String,
  TagSide: {
    type: String,
    allowedValues: ['L', 'R', 'U'],
  },
  TagColor: {
    type: String,
    allowedValues: ['R', 'N', 'N/A'],
  },
  xNumHundredFt: Number,
  xAnimalBehavior: String,
  xTagYN: {
    type: String,
    allowedValues: ['Y', 'N', ''],
  },
  xBandYN: {
    type: String,
    allowedValues: ['Y', 'N'],
  },
  xBandColor: {
    type: String,
    allowedValues: ['R', 'N', 'N/A'],
  },
  xBleachMarkYN: {
    type: String,
    allowedValues: ['Y', 'N'],
  },
  xScarsYN: {
    type: String,
    allowedValues: ['Y', 'N'],
  },
  xScarsLocation: String,

  xIsland: {
    type: String,
    allowedValues: ['Oahu', 'Maui', 'Hawaii', 'Kauai', 'Molokai'],
  },
}, { tracker: Tracker });

const turtleFormSchema = new SimpleSchema({
  Sector: String,
  Size: Number,
  MainIdentification: String,
  ObserverPhone: String,
  ObserverType: String,
  Sex: String,
}, { tracker: Tracker });

const birdFormSchema = new SimpleSchema({
  Sector: String,
  Size: Number,
  MainIdentification: String,
  ObserverPhone: String,
  ObserverType: String,
  Sex: String,
}, { tracker: Tracker });

const otherFormSchema = new SimpleSchema({
  Sector: String,
  Size: Number,
  MainIdentification: String,
  ObserverPhone: String,
  ObserverType: String,
  Sex: String,
}, { tracker: Tracker });

/** Renders the Page for editing a single document. */
class EditReport extends React.Component {

  // On successful submit, insert the data.
  submit(data) {
    const { name, quantity, condition, _id } = data;

    // Figure out which collection to update
    Stuffs.collection.update(_id, { $set: { name, quantity, condition } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.sealReady && this.props.turtleReady && this.props.birdReady && this.props.otherReady) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Edit Report for this {this.props.animal}</Header>
          {this.handleImage(this.props.doc.xImages)}
          <AutoForm schema={this.props.bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
            {this.segment(this.props.animal)}
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }

  segment(animalType) {
    console.log("segment" + animalType);
    if (animalType === "Turtle") {
      return (
      <Segment>
 
        <SubmitField value='Submit'/>
        <ErrorsField/>
      </Segment>
      );
    } else if (animalType === "Seal") {
      return (
        <Segment>
          <TextField name='TicketNumber'/>
          <TextField name='HotlineOpInitials'/>
          <TextField name='TicketType'/>
          <TextField name='ObserverName'/>
          <TextField name='ObserverInitials'/>
          <TextField name='ObserverPhone'/>
          <SelectField name='ObserverType'/>
          <SelectField name='Sector'/>
          <TextField name='Size'/>
          <SelectField name='Sex'/>
          <SelectField name='BeachPosition'/>
          <SelectField name='MainIdentification'/>
          <TextField name='BleachNumber'/>
          <TextField name='TagNumber'/>
          <SelectField name='TagSide'/>
          <SelectField name='TagColor'/>
          <NumField name='xNumHundredFt' decimal={false}/>
          <TextField name='xAnimalBehavior'/>
          <SelectField name='xTagYN'/>
          <SelectField name='xBandYN'/>
          <SelectField name='xBandColor'/>
          <SelectField name='xBleachMarkYN'/>
          <SelectField name='xScarsYN'/>
          <TextField name='xScarsLocation'/>
          <SelectField name='xIsland'/>

          <SubmitField value='Submit'/>
          <ErrorsField/>
        </Segment>
        );
    } else if (animalType === "Bird") {
      return (
        <Segment>

          <SubmitField value='Submit'/>
          <ErrorsField/>
        </Segment>
        );
    } else {
      return (
        <Segment>

          <SubmitField value='Submit'/>
          <ErrorsField/>
        </Segment>
        );
    }
  }

  handleImage(image) {
    if (typeof image === 'string') {
      return  <Image src={image}/>
    } else if ( image instanceof Array) {
      for (let i = 0; i < image.length; i++) {
        return <Image src={image[i]}/>
      }
    } else {
      return "Images are not available.";
    }
  }
}

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
EditReport.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  sealReady: PropTypes.bool.isRequired,
  turtleReady: PropTypes.bool.isRequired,
  birdReady: PropTypes.bool.isRequired,
  otherReady: PropTypes.bool.isRequired,
  
  animal: PropTypes.string.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  console.log("match.params: " + JSON.stringify(match.params));
  const documentId = match.params._id;
  const collection = match.params.Animal;
  const animal = collection;

  const turtleSubscription = Meteor.subscribe('TurtlesCollection');
  const turtleReady = turtleSubscription.ready();
  const birdSubscription = Meteor.subscribe('BirdsCollection');
  const birdReady = birdSubscription.ready();
  const sealSubscription = Meteor.subscribe('SealsCollection');
  const sealReady = sealSubscription.ready();
  const otherSubscription = Meteor.subscribe('OthersCollection');
  const otherReady = otherSubscription.ready();

  let doc;
  let bridge;
  // Get the document
  if (collection === "Turtle") {
    doc = Turtles.findOne(documentId);
    bridge = new SimpleSchema2Bridge(turtleFormSchema);
  } else if (collection === "Seal") {
    doc = Seals.findOne(documentId);
    bridge = new SimpleSchema2Bridge(sealFormSchema);
  } else if (collection === "Bird") {
    doc = Birds.findOne(documentId);
    bridge = new SimpleSchema2Bridge(birdFormSchema);
  } else {
    doc = Others.findOne(documentId);
    bridge = new SimpleSchema2Bridge(otherFormSchema);
  }

  console.log("doc: " + JSON.stringify(doc.xImages));
  return {
    doc,
    turtleReady,
    birdReady,
    sealReady,
    otherReady,
    animal,
    bridge,
  };
})(EditReport);