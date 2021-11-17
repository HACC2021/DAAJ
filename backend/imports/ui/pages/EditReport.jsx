import React from 'react';
import { Grid, Loader, Header, Segment, Image, Button } from 'semantic-ui-react';
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
import SimpleImageSlider from "react-simple-image-slider";

const sealFormSchema = new SimpleSchema({
  TicketNumber: {type: String, optional: true},
  HotlineOpInitials: {type: String, optional: true},
  TicketType: {type: String, optional: true},
  ObserverName: {type: String, optional: true},
  ObserverPhone: {type: String, optional: true},
  ObserverInitials: {type: String, optional: true},
  ObserverType: {
    type: String,
    allowedValues: ['P', 'V', 'A'],
  },
  Sector: {
    type: String,
    allowedValues: ['North', 'East', 'West', 'South'],
  },
  Size: {type: String, optional: true},
  Sex: {
    type: String,
    optional: true,
    allowedValues: ['M', 'F', 'U'],
  },
  BeachPosition: {
    type: String,
    optional: true,
    allowedValues: ['On the sand', 'In the water', 'Along the shore'],
  },
  MainIdentification: {
    type: String,
    allowedValues: ['T', 'B', 'N', 'A', ''],
  },
  BleachNumber: {type: String, optional: true},
  TagNumber: {type: String, optional: true},
  TagSide: {
    type: String,
    allowedValues: ['L', 'R', 'U'],
  },
  TagColor: {
    type: String,
    allowedValues: ['R', 'N', 'N/A'],
  },
  xNumHundredFt: {type: Number, optional: true},
  xAnimalBehavior: {type: String, optional: true},
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
  xScarsLocation: {type: String, optional: true},

  xIsland: {
    type: String,
    allowedValues: ['Oahu', 'Maui', 'Hawaii', 'Kauai', 'Molokai'],
  },
}, { tracker: Tracker });

const turtleFormSchema = new SimpleSchema({
  TicketNumber: {type: String, optional: true},
  HotlineOpInitials: {type: String, optional: true},
  TicketType: {type: String, optional: true},
  ObserverName: {type: String, optional: true},
  ObserverPhone: {type: String, optional: true},
  ObserverInitials: {type: String, optional: true},
  ObserverType: {
    type: String,
    allowedValues: ['P', 'V', 'A'],
  },
  Sector: {
    type: String,
    allowedValues: ['North', 'East', 'West', 'South'],
  },
  Island: {
    type: String,
    allowedValues: ['Oahu', 'Maui', 'Hawaii', 'Kauai', 'Molokai'],
  },
  TurtleType: {
    type: String,
    allowedValues: ['Cm', 'Ei', 'Unknown'],
  },
  Size: {type: String, optional: true},

  Status: {
    type: String,
    allowedValues: ['Deceased', 'Alive', 'Unknown'],
  },
  xNumHundredFt: {type: Number, optional: true},
  xAnimalBehavior: {type: String, optional: true},
  xTagYN: {
    type: String,
    allowedValues: ['Y', 'N', ''],
  },
  TagNumber: {type: String, optional: true},
  TagSide: {
    type: String,
    allowedValues: ['L', 'R', 'U'],
  },
  TagColor: {
    type: String,
    optional: true,
    allowedValues: ['R', 'N', 'N/A'],
  },
  xNumHundredFt: {type: Number, optional: true},
  xAnimalBehavior: {type: String, optional: true},
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
  xBleachMarkNum: {type: String, optional: true},
  xScarsYN: {
    type: String,
    allowedValues: ['Y', 'N'],
  },
  xScarsLocation: {type: String, optional: true},
  xAmpFlipper: {
    type: String,
    allowedValues: ['Yes', 'No', 'Unknown'],
  },
  xWhichFlipper: {
    type: String,
    optional: true,
    allowedValues: ['Top left', 'Top right', 'Bottom left', 'Bottom right'],
  },
  MainIdentification: {
    type: String,
    allowedValues: ['T', 'B', 'N', 'A', ''],
  },
}, { tracker: Tracker });

const birdFormSchema = new SimpleSchema({
  TicketNumber: {type: String, optional: true},
  HotlineOpInitials: {type: String, optional: true},
  TicketType: {type: String, optional: true},
  ObserverName: {type: String, optional: true},
  ObserverPhone: {type: String, optional: true},
  ObserverInitials: {type: String, optional: true},
  ObserverType: {
    type: String,
    allowedValues: ['P', 'V', 'A'],
  },
  Sector: {
    type: String,
    allowedValues: ['North', 'East', 'West', 'South'],
  },
  BirdType: String, // change to choices after
  xNumHundredFt: {type: Number, optional: true},
  xAnimalBehavior: {type: String, optional: true},
  xTagYN: {
    type: String,
    allowedValues: ['Y', 'N', ''],
  },
  TagNumber: {type: String, optional: true},
  TagSide: {
    type: String,
    allowedValues: ['L', 'R', 'U'],
  },
  TagColor: {
    type: String,
    allowedValues: ['R', 'N', 'N/A'],
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
  xBleachMarkNum: {type: String, optional: true},
  xScarsYN: {
    type: String,
    allowedValues: ['Y', 'N'],
  },
  xScarsLocation: {type: String, optional: true},
  MainIdentification: {
    type: String,
    allowedValues: ['T', 'B', 'N', 'A', ''],
  },
  xIsland: {
    type: String,
    allowedValues: ['Oahu', 'Maui', 'Hawaii', 'Kauai', 'Molokai'],
  },
}, { tracker: Tracker });

const otherFormSchema = new SimpleSchema({
  TicketNumber: {type: String, optional: true},
  HotlineOpInitials: {type: String, optional: true},
  TicketType: {type: String, optional: true},
  ObserverName: {type: String, optional: true},
  ObserverPhone: {type: String, optional: true},
  ObserverInitials: {type: String, optional: true},
  ObserverType: {
    type: String,
    allowedValues: ['P', 'V', 'A'],
  },
  Sector: {
    type: String,
    allowedValues: ['North', 'East', 'West', 'South'],
  },
  xNumHundredFt: {type: Number, optional: true},
  xAnimalBehavior: {type: String, optional: true},
  xTagYN: {
    type: String,
    allowedValues: ['Y', 'N', ''],
  },
  TagNumber: {type: String, optional: true},
  TagSide: {
    type: String,
    allowedValues: ['L', 'R', 'U'],
  },
  TagColor: {
    type: String,
    allowedValues: ['R', 'N', 'N/A'],
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
  xBleachMarkNum: {type: String, optional: true},
  xScarsYN: {
    type: String,
    allowedValues: ['Y', 'N'],
  },
  xScarsLocation: {type: String, optional: true},
  MainIdentification: {
    type: String,
    allowedValues: ['T', 'B', 'N', 'A', ''],
  },
  xIsland: {
    type: String,
    allowedValues: ['Oahu', 'Maui', 'Hawaii', 'Kauai', 'Molokai'],
  },
}, { tracker: Tracker });

/** Renders the Page for editing a single document. */
class EditReport extends React.Component {

  // On successful submit, insert the data.
  submit(data) {
    if (this.props.animal === "Turtle") {
      const { TicketNumber, HotlineOpInitials, TicketType, ObserverName, ObserverPhone, ObserverInitials, ObserverType, Sector, Island, TurtleType, Size, Status, xAnimalBehavior, xTagYN, TagNumber, TagSide, TagColor, xNumHundredFt, xBandYN, xBandColor, xBleachMarkYN, xBleachMarkNum, xScarsYN, xScarsLocation, xAmpFlipper, xWhichFlipper, MainIdentification, _id } = data;
      
      // Figure out which document to update
      Turtles.update(_id, { $set: { TicketNumber, HotlineOpInitials, TicketType, ObserverName, ObserverPhone, ObserverInitials, ObserverType, Sector, Island, TurtleType, Size, Status, xAnimalBehavior, xTagYN, TagNumber, TagSide, TagColor, xNumHundredFt, xBandYN, xBandColor, xBleachMarkYN, xBleachMarkNum, xScarsYN, xScarsLocation, xAmpFlipper, xWhichFlipper, MainIdentification } }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Item updated successfully', 'success')));
    } else if (this.props.animal === "Seal") {
      const { TicketNumber, HotlineOpInitials, TicketType, ObserverName, ObserverPhone, ObserverInitials, ObserverType, Sector, Size, Sex, BeachPosition, MainIdentification, BleachNumber, TagNumber, TagSide, TagColor, xNumHundredFt, xAnimalBehavior, xTagYN, xBandYN, xBandColor, xBleachMarkYN, xScarsYN, xScarsLocation, xIsland, _id } = data;
      // Figure out which document to update
      Seals.update(_id, { $set: { TicketNumber, HotlineOpInitials, TicketType, ObserverName, ObserverPhone, ObserverInitials, ObserverType, Sector, Size, Sex, BeachPosition, MainIdentification, BleachNumber, TagNumber, TagSide, TagColor, xNumHundredFt, xAnimalBehavior, xTagYN, xBandYN, xBandColor, xBleachMarkYN, xScarsYN, xScarsLocation, xIsland } }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Item updated successfully', 'success')));

    } else if (this.props.animal === "Bird") {
      const { TicketNumber, HotlineOpInitials, TicketType, ObserverName, ObserverPhone, ObserverInitials, ObserverType, Sector, BirdType, xNumHundredFt, xAnimalBehavior, xTagYN, TagNumber, TagSide, TagColor, xBandYN, xBandColor, xBleachMarkYN, xBleachMarkNum, xScarsYN, xScarsLocation, MainIdentification, xIsland, _id } = data;
      // Figure out which document to update
      Birds.update(_id, { $set: { TicketNumber, HotlineOpInitials, TicketType, ObserverName, ObserverPhone, ObserverInitials, ObserverType, Sector, BirdType, xNumHundredFt, xAnimalBehavior, xTagYN, TagNumber, TagSide, TagColor, xBandYN, xBandColor, xBleachMarkYN, xBleachMarkNum, xScarsYN, xScarsLocation, MainIdentification, xIsland } }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Item updated successfully', 'success')));

    } else {
      const { TicketNumber, HotlineOpInitials, TicketType, ObserverName, ObserverPhone, ObserverInitials, ObserverType, Sector, xNumHundredFt, xAnimalBehavior, xTagYN, TagNumber, TagSide, TagColor, xBandYN, xBandColor, xBleachMarkYN, xBleachMarkNum, xScarsYN, xScarsLocation, MainIdentification, xIsland, _id } = data;
      // Figure out which document to update
      Others.update(_id, { $set: { TicketNumber, HotlineOpInitials, TicketType, ObserverName, ObserverPhone, ObserverInitials, ObserverType, Sector, xNumHundredFt, xAnimalBehavior, xTagYN, TagNumber, TagSide, TagColor, xBandYN, xBandColor, xBleachMarkYN, xBleachMarkNum, xScarsYN, xScarsLocation, MainIdentification, xIsland } }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Item updated successfully', 'success')));
    }
   

    
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
          <Header as="h1" textAlign="center">Edit the report for:</Header>
          <Header as="h2" textAlign="center">{this.props.animal}</Header>
          <Button negative centered onClick={e => {this.findDelete(this.props.doc._id, this.props.animal); document.location.href=''}}>Delete this {this.props.animal}</Button>
          {this.handleImage(this.props.doc.xImages)}
          <AutoForm schema={this.props.bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
            {this.segment(this.props.animal)}
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }

  findDelete(animalId, animal) {
    if (animal === "Seal") {
      Meteor.call('deleteSeal', animalId)
    } else if (animal === "Bird") {
      Meteor.call('deleteBird', animalId)
    } else if (animal === "Turtle") {
      Meteor.call('deleteTurtle', animalId)
    } else {
      Meteor.call('deleteOther', animalId)
    }
  }

  segment(animalType) {
    console.log("segment" + animalType);
    if (animalType === "Turtle") {
      return (
        <Segment>
          <TextField name='TicketNumber' />
          <TextField name='HotlineOpInitials' />
          <TextField name='TicketType' />
          <TextField name='ObserverName' />
          <TextField name='ObserverInitials' />
          <TextField name='ObserverPhone' />
          <SelectField name='ObserverType' />
          <SelectField name='Sector' />
          <SelectField name='Island' />
          <SelectField name='TurtleType' />
          <TextField name='Size' />
          <SelectField name='Status' />
          <NumField name='xNumHundredFt' decimal={false} />
          <TextField name='xAnimalBehavior' />
          <SelectField name='xTagYN' />
          <TextField name='TagNumber' />
          <SelectField name='TagSide' />
          <SelectField name='TagColor' />
          <SelectField name='xBandYN' />
          <SelectField name='xBandColor' />
          <SelectField name='xBleachMarkYN' />
          <TextField name='xBleachMarkNum' />
          <SelectField name='xScarsYN' />
          <TextField name='xScarsLocation' />
          <SelectField name='xAmpFlipper' />
          <SelectField name='xWhichFlipper' />
          <SelectField name='MainIdentification' />
          <SubmitField value='Submit' />
          <ErrorsField />
        </Segment>
      );
    } else if (animalType === "Seal") {
      return (
        <Segment>
          <TextField name='TicketNumber' />
          <TextField name='HotlineOpInitials' />
          <TextField name='TicketType' />
          <TextField name='ObserverName' />
          <TextField name='ObserverInitials' />
          <TextField name='ObserverPhone' />
          <SelectField name='ObserverType' />
          <SelectField name='Sector' />
          <TextField name='Size' />
          <SelectField name='Sex' />
          <SelectField name='BeachPosition' />
          <SelectField name='MainIdentification' />
          <TextField name='BleachNumber' />
          <TextField name='TagNumber' />
          <SelectField name='TagSide' />
          <SelectField name='TagColor' />
          <NumField name='xNumHundredFt' decimal={false} />
          <TextField name='xAnimalBehavior' />
          <SelectField name='xTagYN' />
          <SelectField name='xBandYN' />
          <SelectField name='xBandColor' />
          <SelectField name='xBleachMarkYN' />
          <SelectField name='xScarsYN' />
          <TextField name='xScarsLocation' />
          <SelectField name='xIsland' />

          <SubmitField value='Submit' />
          <ErrorsField />
        </Segment>
      );
    } else if (animalType === "Bird") {
      return (
        <Segment>
          <TextField name='TicketNumber' />
          <TextField name='HotlineOpInitials' />
          <TextField name='TicketType' />
          <TextField name='ObserverName' />
          <TextField name='ObserverInitials' />
          <TextField name='ObserverPhone' />
          <SelectField name='ObserverType' />
          <SelectField name='Sector' />
          <TextField name='BirdType' /> {/* change to choices after*/}
          <NumField name='xNumHundredFt' decimal={false} />
          <TextField name='xAnimalBehavior' />
          <SelectField name='xTagYN' />
          <TextField name='TagNumber' />
          <SelectField name='TagSide' />
          <SelectField name='TagColor' />
          <SelectField name='xBandYN' />
          <SelectField name='xBandColor' />
          <SelectField name='xBleachMarkYN' />
          <TextField name='xBleachMarkNum' />
          <SelectField name='xScarsYN' />
          <TextField name='xScarsLocation' />
          <SelectField name='MainIdentification' />
          <SelectField name='xIsland' />
          <SubmitField value='Submit' />
          <ErrorsField />
        </Segment>
      );
    } else {
      return (
        <Segment>
          <TextField name='TicketNumber' />
          <TextField name='HotlineOpInitials' />
          <TextField name='TicketType' />
          <TextField name='ObserverName' />
          <TextField name='ObserverInitials' />
          <TextField name='ObserverPhone' />
          <SelectField name='ObserverType' />
          <SelectField name='Sector' />
          <NumField name='xNumHundredFt' decimal={false} />
          <TextField name='xAnimalBehavior' />
          <SelectField name='xTagYN' />
          <TextField name='TagNumber' />
          <SelectField name='TagSide' />
          <SelectField name='TagColor' />
          <SelectField name='xBandYN' />
          <SelectField name='xBandColor' />
          <SelectField name='xBleachMarkYN' />
          <TextField name='xBleachMarkNum' />
          <SelectField name='xScarsYN' />
          <TextField name='xScarsLocation' />
          <SelectField name='MainIdentification' />
          <SelectField name='xIsland' />
          <SubmitField value='Submit' />
          <ErrorsField />
        </Segment>
      );
    }
  }

  handleImage(image) {
    let images = [];
    image.forEach(element => {
      let newObject = {url: element};
      images.push(newObject);
    });
    console.log("huh" + images.length);
    if (images.length > 1) {
    return <SimpleImageSlider
    width={400}
    height={400}
    images={images}
    showBullets={true}
    showNavs={true}
    navSize={25}
    navMargin={20}
    autoplay={true}
    navStyle={2}
    />
  } else if (images.length == 1) {
    return <Image centered src={image}/>
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