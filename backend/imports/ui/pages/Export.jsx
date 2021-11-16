import React from 'react';
import { Grid, Segment, Text, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Stuffs } from '../../api/stuff/Stuff';

import { Turtles } from '../../api/turtle/Turtle';
import { Birds } from '../../api/bird/Bird';
import { Seals } from '../../api/seal/Seal';
import { Others } from '../../api/other/Other';

import Sample from '../components/Sample';


// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class Export extends React.Component {

  getDate() {
    let inputGroups = document.getElementsByClassName("react-datetimerange-picker__inputGroup");
    // console.log(JSON.stringify("inputGroups: " + inputGroups));
    // console.log("splitting: " + JSON.stringify(inputGroups[0].innerHTML.split('"')[11]));
    // console.log("splitting: " + JSON.stringify(inputGroups[1].innerHTML.split('"')[11]));
    let from = new Date(inputGroups[0].innerHTML.split('"')[11]);
    let to = new Date(inputGroups[1].innerHTML.split('"')[11]);

    console.log("from: " + from);
    console.log("to: " + to);
    
    return [from, to];
  }

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
      <Grid style={{fontFamily: 'Poppins'}} container centered>
        <Grid.Row style={{marginTop: 20}}>
        <Sample  />

          </Grid.Row>

          <Header as="h2" style={{fontFamily: 'Poppins'}} textAlign="center">Export</Header>
           <div style={{fontSize: 18, textAlign: 'center'}}>Choose which animal sightings you would like to export. Once you click on the button, a file with the data will be downloaded.</div>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.exportSealData(data, fRef)} >
              <SubmitField style={{fontFamily: 'Poppins', marginTop: 20}} value='Export Seal Data' />
              <ErrorsField />
          </AutoForm>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.exportBirdData(data, fRef)} >
              <SubmitField style={{fontFamily: 'Poppins', marginTop: 20}} value='Export Sea Bird Data' />
              <ErrorsField />
          </AutoForm>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.exportTurtleData(data, fRef)} >
              <SubmitField style={{fontFamily: 'Poppins', marginTop: 20}} value='Export Turtle Data' />
              <ErrorsField />
          </AutoForm>
      </Grid>
    );
  }

  /*
   * data : data from collection
   * whichOne : which aggregation to be done
   */
  combine(data, whichOne) {
    // console.log("In combine");
    switch (whichOne) {
      case (0):
        // console.log("GPS");
        return "Latitude: " + data[0] + "; Longitude: " + data[1] + "; On the island of " + data[2];
    }

  }


  exportSealData(data, ref) {
    console.log("in exportSealData");
    // Grab the date range that the user selected
    let fromTo = this.getDate();
    let from = new Date(fromTo[0]);
    let to = new Date(fromTo[1]);
    
    // Problems with: "ID Temp (Bleach #)" , "# of Volunteers Engaged"
    // Headers copied from Sightings Data Template
    let theHeaders = ["Date", "Time", "Ticket Number", "Hotline Operator Initials", "Ticket Type", "Observer", "Observer Contact Number", "Observer Initials", "Observer Type", "Sector", "Location", "Location Notes", "Seal Present?", "Size", "Sex", "Beach Position", "How Identified?", "ID Temp", "Tag Number", "Tag Side", "Tag Color", "ID Perm", "Molt", "Additional Notes on ID", "ID Verified By", "Seal Logging", "Mom & Pup Pair", "SRA Set Up", "SRA Set By", "Num of Volunteers Engaged", "Seal Depart Info Avail?", "Seal Departed Date", "Seal Departed Time", "Number of Calls Received", "Other Notes", "Images", "RelatedID"]

    // Get everything in the Seals collection (after filtering)
    let sealsToExport = Seals.find({
      // Filtering by date
      DateObjectObserved : {
        $gte : from,
        $lte : to,
      }
    }).fetch(); // an array of seal objects
    // console.log("sealsToExport after filtering: " + JSON.stringify(sealsToExport));

    // For each seal, put its fields into an array 
    let rows = []
    // Push the headers on 
    rows.push(theHeaders);
    // console.log("before putting data in");
    for (let index = 0; index < sealsToExport.length; index++) {
      // Initialize an empty array for this seal
      rows.push([]);
      // Grab the fields from the collection to put into the array
      rows[index + 1].push(sealsToExport[index].DateObserved);
      rows[index + 1].push(sealsToExport[index].TimeObserved);
      rows[index + 1].push(sealsToExport[index].TicketNumber);
      rows[index + 1].push(sealsToExport[index].HotlineOpInitials);
      rows[index + 1].push(sealsToExport[index].TicketType);
      rows[index + 1].push(sealsToExport[index].ObserverName);
      rows[index + 1].push(sealsToExport[index].ObserverPhone);
      rows[index + 1].push(sealsToExport[index].ObserverInitials);
      rows[index + 1].push(sealsToExport[index].ObserverType);
      rows[index + 1].push(sealsToExport[index].Sector);
      rows[index + 1].push(sealsToExport[index].LocationName);
      rows[index + 1].push(this.combine([sealsToExport[index].xLatitude, sealsToExport[index].xLongitude, sealsToExport[index].xIsland], 0));
      rows[index + 1].push(sealsToExport[index].SealPresent);
      rows[index + 1].push(sealsToExport[index].Size);
      rows[index + 1].push(sealsToExport[index].Sex);
      rows[index + 1].push(sealsToExport[index].BeachPosition);
      rows[index + 1].push(sealsToExport[index].MainIdentification);
      rows[index + 1].push("");
      rows[index + 1].push(sealsToExport[index].TagNumber);
      rows[index + 1].push(sealsToExport[index].TagSide);
      rows[index + 1].push(sealsToExport[index].TagColor);
      rows[index + 1].push(sealsToExport[index].IDPerm);
      rows[index + 1].push(sealsToExport[index].Molt);
      rows[index + 1].push(sealsToExport[index].AdditionalNotesOnID);
      rows[index + 1].push(sealsToExport[index].IDVerifiedBy);
      rows[index + 1].push(sealsToExport[index].SealLogging);
      rows[index + 1].push(sealsToExport[index].MomPup);
      rows[index + 1].push(sealsToExport[index].SRASetBy);
      rows[index + 1].push(sealsToExport[index].SRASetBy);
      rows[index + 1].push(sealsToExport[index].NumVolunteers);
      rows[index + 1].push(sealsToExport[index].SealDepart);
      rows[index + 1].push(sealsToExport[index].SealDepartDate);
      rows[index + 1].push(sealsToExport[index].SealDepartTime);
      rows[index + 1].push(sealsToExport[index].xSightings);

      // Other notes:
      let data = [sealsToExport[index].xBandYN, sealsToExport[index].xBandColor, sealsToExport[index].xBleachMarkYN, sealsToExport[index].xScarsYN];
      let notes = []
      let labels = ["Band: ", "Band color: ", "Bleachmark: ", "Scar: ", "Number of people within 100ft: " + "Animal behavior: "];
      for (let index = 0; index < data.length; index++) {
          (data[index] === "" || data[index] === undefined) ? notes.push("") : notes.push(labels[index] + data[index]);
        }
      (sealsToExport[index].xNumHundredFt === "" ? notes.push("") : notes.push("Number of people within 100ft: " + sealsToExport[index].xNumHundredFt));
      (sealsToExport[index].xAnimalBehavior === "" ? notes.push("") : notes.push("Animal behavior: " + sealsToExport[index].xAnimalBehavior));
      notes =  notes.join(" | ");
      rows[index + 1].push(notes);

      // Images: 
      let images = sealsToExport[index].xImages.join(" | ");
      rows[index + 1].push(images);
      rows[index + 1].push(sealsToExport[index].xRelated);
    }


    

    // console.log("exporting result: " + JSON.stringify(rows));
    // const rows = [
    //   theHeaders,
    //   ["name1", "city1", "some other info"],
    //   ["name2", "city2", "more info"]
    // ];

    let csvContent = "data:text/csv;charset=utf-8,"
      + rows.map(e => e.join(",")).join("\n");

    console.log("csvContent:\n" + csvContent);

    // encodeURI doesn't encode: , / ? : @ & = + $ # ()
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI <- figure out how to encode it by replacing it or using encodeURIComponent?
    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  }

  exportBirdData(data, ref) {
    console.log("in exportBirdData");
    // Grab the date range that the user selected
    let fromTo = this.getDate();
    let from = new Date(fromTo[0]);
    let to = new Date(fromTo[1]);
    
    // Problems with: "ID Temp (Bleach #)" , "# of Volunteers Engaged"
    // Headers copied from Sightings Data Template
    let theHeaders = ["Date", "Time", "Ticket Number", "Hotline Operator Initials", "Ticket Type", "Observer", "Observer Contact Number", "Observer Initials", "Observer Type", "Sector", "Location", "Location Notes", "Type of Bird", "Number of Calls Received", "RelatedID", "Other Notes", "Images"]

    // Get everything in the Seals collection (after filtering)
    let birdsToExport = Birds.find({
      // Filtering by date
      DateObjectObserved : {
        $gte : from,
        $lte : to,
      }
    }).fetch(); // an array of seal objects
    // console.log("birdsToExport after filtering: " + JSON.stringify(birdsToExport));

    // For each seal, put its fields into an array 
    let rows = []
    // Push the headers on 
    rows.push(theHeaders);
    // console.log("before putting data in");
    for (let index = 0; index < birdsToExport.length; index++) {
      // Initialize an empty array for this seal
      rows.push([]);
      // Grab the fields from the collection to put into the array
      rows[index + 1].push(birdsToExport[index].DateObserved);
      rows[index + 1].push(birdsToExport[index].TimeObserved);
      rows[index + 1].push(birdsToExport[index].TicketNumber);
      rows[index + 1].push(birdsToExport[index].HotlineOpInitials);
      rows[index + 1].push(birdsToExport[index].TicketType);
      rows[index + 1].push(birdsToExport[index].ObserverName);
      rows[index + 1].push(birdsToExport[index].ObserverPhone);
      rows[index + 1].push(birdsToExport[index].ObserverInitials);
      rows[index + 1].push(birdsToExport[index].ObserverType);
      rows[index + 1].push(birdsToExport[index].Sector);
      rows[index + 1].push(birdsToExport[index].LocationName);
      rows[index + 1].push(this.combine([birdsToExport[index].xLatitude, birdsToExport[index].xLongitude, birdsToExport[index].xIsland], 0));
      rows[index + 1].push(birdsToExport[index].LocationNotes);
      rows[index + 1].push(birdsToExport[index].BirdType);
      rows[index + 1].push("");
      rows[index + 1].push(birdsToExport[index].xSightings);


      // Other notes:
      let data = [birdsToExport[index].xBandYN, birdsToExport[index].xBandColor, birdsToExport[index].xBleachMarkYN, birdsToExport[index].xScarsYN];
      let notes = []
      let labels = ["Band: ", "Band color: ", "Bleachmark: ", "Scar: ", "Number of people within 100ft: " + "Animal behavior: "];
      for (let index = 0; index < data.length; index++) {
          (data[index] === "" || data[index] === undefined) ? notes.push("") : notes.push(labels[index] + data[index]);
        }
      (birdsToExport[index].xNumHundredFt === "" ? notes.push("") : notes.push("Number of people within 100ft: " + birdsToExport[index].xNumHundredFt));
      (birdsToExport[index].xAnimalBehavior === "" ? notes.push("") : notes.push("Animal behavior: " + birdsToExport[index].xAnimalBehavior));
      notes =  notes.join(" | ");
      rows[index + 1].push(notes);

      // Images: 
      let images = birdsToExport[index].xImages.join(" | ");
      rows[index + 1].push(images);
      rows[index + 1].push(birdsToExport[index].xRelated);
    }


    

    // console.log("exporting result: " + JSON.stringify(rows));
    // const rows = [
    //   theHeaders,
    //   ["name1", "city1", "some other info"],
    //   ["name2", "city2", "more info"]
    // ];

    let csvContent = "data:text/csv;charset=utf-8,"
      + rows.map(e => e.join(",")).join("\n");

    console.log("csvContent:\n" + csvContent);

    // encodeURI doesn't encode: , / ? : @ & = + $ # ()
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI <- figure out how to encode it by replacing it or using encodeURIComponent?
    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  }

  exportTurtleData(data, ref) {
    console.log("in exportTurtleData");
    // Grab the date range that the user selected
    let fromTo = this.getDate();
    let from = new Date(fromTo[0]);
    let to = new Date(fromTo[1]);
    
    // Problems with: "ID Temp (Bleach #)" , "# of Volunteers Engaged"
    // Headers copied from Sightings Data Template
    let theHeaders = ["Date", "Time", "Ticket Number", "Hotline Operator Initials", "Ticket Type", "Observer", "Observer Contact Number", "Observer Initials", "Observer Type", "Island", "Sector", "Location", "Location Notes", "Type of Turtle", "Size", "Status", "Number of Calls Received", "Other Notes", "Images", "RelatedID"]

    // Get everything in the Seals collection (after filtering)
    let turtleToExport = Turtles.find({
      // Filtering by date
      DateObjectObserved : {
        $gte : from,
        $lte : to,
      }
    }).fetch(); // an array of seal objects
    // console.log("turtleToExport after filtering: " + JSON.stringify(turtleToExport));

    // For each seal, put its fields into an array 
    let rows = []
    // Push the headers on 
    rows.push(theHeaders);
    // console.log("before putting data in");
    for (let index = 0; index < turtleToExport.length; index++) {
      // Initialize an empty array for this seal
      rows.push([]);
      // Grab the fields from the collection to put into the array
      rows[index + 1].push(turtleToExport[index].DateObserved);
      rows[index + 1].push(turtleToExport[index].TimeObserved);
      rows[index + 1].push(turtleToExport[index].TicketNumber);
      rows[index + 1].push(turtleToExport[index].HotlineOpInitials);
      rows[index + 1].push(turtleToExport[index].TicketType);
      rows[index + 1].push(turtleToExport[index].ObserverName);
      rows[index + 1].push(turtleToExport[index].ObserverPhone);
      rows[index + 1].push(turtleToExport[index].ObserverInitials);
      rows[index + 1].push(turtleToExport[index].ObserverType);
      rows[index + 1].push(turtleToExport[index].Island);
      rows[index + 1].push(turtleToExport[index].Sector);
      rows[index + 1].push(turtleToExport[index].LocationName);
      rows[index + 1].push(this.combine([turtleToExport[index].xLatitude, turtleToExport[index].xLongitude, turtleToExport[index].xIsland], 0));
      rows[index + 1].push(turtleToExport[index].LocationNotes);
      rows[index + 1].push(turtleToExport[index].TurtleType);
      rows[index + 1].push(turtleToExport[index].Size);
      rows[index + 1].push(turtleToExport[index].Status);
      rows[index + 1].push("");
      rows[index + 1].push(turtleToExport[index].xSightings);


      // Other notes:
      let data = [turtleToExport[index].xBandYN, turtleToExport[index].xBandColor, turtleToExport[index].xBleachMarkYN, turtleToExport[index].xScarsYN];
      let notes = []
      let labels = ["Band: ", "Band color: ", "Bleachmark: ", "Scar: ", "Number of people within 100ft: " + "Animal behavior: "];
      for (let index = 0; index < data.length; index++) {
          (data[index] === "" || data[index] === undefined) ? notes.push("") : notes.push(labels[index] + data[index]);
        }
      (turtleToExport[index].xNumHundredFt === "" ? notes.push("") : notes.push("Number of people within 100ft: " + turtleToExport[index].xNumHundredFt));
      (turtleToExport[index].xAnimalBehavior === "" ? notes.push("") : notes.push("Animal behavior: " + turtleToExport[index].xAnimalBehavior));
      notes =  notes.join(" | ");
      rows[index + 1].push(notes);

      // Images: 
      let images = turtleToExport[index].xImages.join(" | ");
      rows[index + 1].push(images);
      rows[index + 1].push(turtleToExport[index].xRelated);
    }


    

    // console.log("exporting result: " + JSON.stringify(rows));
    // const rows = [
    //   theHeaders,
    //   ["name1", "city1", "some other info"],
    //   ["name2", "city2", "more info"]
    // ];

    let csvContent = "data:text/csv;charset=utf-8,"
      + rows.map(e => e.join(",")).join("\n");

    console.log("csvContent:\n" + csvContent);

    // encodeURI doesn't encode: , / ? : @ & = + $ # ()
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI <- figure out how to encode it by replacing it or using encodeURIComponent?
    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  }

}

export default Export;
