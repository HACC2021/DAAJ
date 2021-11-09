import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
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
      <Grid container centered>
        <Grid.Column>
          <Sample />
          <Header as="h2" textAlign="center">Export</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.exportSealData(data, fRef)} >
            <Segment>
              <SubmitField value='Submit' />
              <ErrorsField />
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }

  exportSealData(data, ref) {
    console.log("in exportSealData");
    // Grab the date range that the user selected
    let fromTo = this.getDate();
    let from = new Date(fromTo[0]);
    let to = new Date(fromTo[1]);
    
    // Problems with: "ID Temp (Bleach #)" , "# of Volunteers Engaged"
    // Headers copied from Sightings Data Template
    let theHeaders = ["Date", "Time", "Ticket Number", "Hotline Operator Initials", "Ticket Type", "Observer", "Observer Contact Number", "Observer Initials", "Observer Type", "Sector", "Location", "Location Notes", "Seal Present?", "Size", "Sex", "Beach Position", "How Identified?", "ID Temp", "Tag Number", "Tag Side", "Tag Color", "ID Perm", "Molt", "Additional Notes on ID", "ID Verified By", "Seal Logging", "Mom & Pup Pair", "SRA Set Up", "SRA Set By", "Num of Volunteers Engaged", "Seal Depart Info Avail?", "Seal Departed Date", "Seal Departed Time", "Number of Calls Received", "Other Notes"]

    // Get everything in the Seals collection (after filtering)
    let sealsToExport = Seals.find({
      // Filtering by date
      DateObjectObserved : {
        $gte : from,
        $lte : to,
      }
    }).fetch(); // an array of seal objects
    console.log("sealsToExport after filtering: " + JSON.stringify(sealsToExport));

    // For each seal, put its fields into an array 
    let rows = []
    // Push the headers on 
    rows.push(theHeaders);
    for (let index = 0; index < sealsToExport.length; index++) {
      // Initialize an empty array for this seal
      rows.push([]);
      // Grab the fields from the collection to put into the array
      rows[index + 1].push(sealsToExport[index].ObserverName);
      rows[index + 1].push(sealsToExport[index].ObserverPhone);
      rows[index + 1].push(sealsToExport[index].DateObjectObserved);
    }

    console.log("exporting result: " + JSON.stringify(rows));
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
    // window.open(encodedUri);
  }
}

export default Export;
