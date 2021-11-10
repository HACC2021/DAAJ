import React from 'react';
import { Grid, Segment, Header, Loader, Button } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Turtles } from '../../api/turtle/Turtle';
import { Birds } from '../../api/bird/Bird';
import { Seals } from '../../api/seal/Seal';
import { Others } from '../../api/other/Other';
import { VictoryChart, VictoryTheme, VictoryLine, VictoryPie, VictoryBar } from 'victory';
import Sample from '../components/Sample';


/** Renders the Page for adding a document. */
class ChartView extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.sealReady && this.props.turtleReady && this.props.birdReady && this.props.otherReady) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    let fRef = null;
    let sealTimeSeries = this.getTimeSeriesData(0);
    console.log("sealTimeSeries: " + JSON.stringify(sealTimeSeries));

    let turtleTimeSeries = this.getTimeSeriesData(1);
    console.log("turtleTimeSeries: " + JSON.stringify(turtleTimeSeries));

    let birdTimeSeries = this.getTimeSeriesData(2);
    console.log("birdTimeSeries: " + JSON.stringify(birdTimeSeries));

    let otherTimeSeries = this.getTimeSeriesData(3);
    console.log("otherTimeSeries: " + JSON.stringify(otherTimeSeries));

    return (
      <Grid container centered>
        <Grid.Row>
          <Grid.Column>
            <Sample />
            <Button style={{fontFamily: 'Poppins'}} onClick={() => this.handleClick()} className="ui olive basic button">Filter</Button>
            <Header as="h2" style={{fontFamily: 'Poppins'}} textAlign="center">Dashboard</Header>
            {/* Female vs male seals*/}
            <VictoryBar theme={VictoryTheme.material}
              data={[
                { x: "Females", y: this.props.sexes[0] },
                { x: "Males", y: this.props.sexes[1] }]}
                labels={({ datum }) => `y: ${datum.y}`}
            />
            {/* Tagged animals*/}
            <VictoryBar theme={VictoryTheme.material}
              data={[
                { x: "Seals", y: this.props.taggedSeals },
                { x: "Turtles", y: this.props.taggedTurtles },
                { x: "Birds", y: this.props.taggedBirds },
                { x: "Others", y: this.props.taggedOthers }]}
                labels={({ datum }) => `y: ${datum.y}`}
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <VictoryPie theme={VictoryTheme.material}
            data={[
              { x: "Turtles", y: this.props.turtles.length },
              { x: "Seals", y: this.props.seals.length },
              { x: "Birds", y: this.props.birds.length },
              { x: "Others", y: this.props.others.length }]}
          />

        </Grid.Row>
      </Grid>
    );
  }

  getTimeSeriesData(Animal) {
    console.log("in getTimeSeriesData");

    // Grab the DateObserved field
    let animalDates;
    switch (Animal) {
      case (0):
        animalDates = Seals.find({}, { field: { DateObserved: 1 } }).fetch();
        break;
      case (1):
        animalDates = Turtles.find({}, { field: { DateObserved: 1 } }).fetch();
      case (2):
        animalDates = Birds.find({}, { field: { DateObserved: 1 } }).fetch();
      case (3):
        animalDates = Others.find({}, { field: { DateObserved: 1 } }).fetch();
    }
    // console.log("sealsDates: " + JSON.stringify(animalDates));

    // Grab each date and put it into the array
    let allDates = [];
    animalDates.forEach(animal => {
      allDates.push(animal.DateObserved);
    });
    // console.log("dateCounts: " + JSON.stringify(allDates));

    // Create an object where each item is a date and it's equal to the count of it in the array above
    let counts = {};
    allDates.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
    console.log("counts: " + JSON.stringify(counts));

    // For each date, convert it into the form Victory chart wants it
    let result = [];
    allDates.forEach(aDate => {
      result.push({ x: "", y: "" });
    });

    for (let index = 0; index < allDates.length; index++) {
      let formatted = allDates[index].substring(0, 2) + "-" + allDates[index].substring(2, 4) + "-" + allDates[index].substring(4, 6);
      result[index].x = new Date(formatted);
      result[index].y = counts[allDates[index]];
    }

    console.log("result: " + JSON.stringify(result));


    // console.log("counts['Tue Nov 09 2021 18:52:39 GMT-1000 (Hawaii-Aleutian Standard Time)]: " + counts['Tue Nov 09 2021 18:52:39 GMT-1000 (Hawaii-Aleutian Standard Time)']);

    return result;
  }

  getDate() {
    let inputGroups = document.getElementsByClassName("react-datetimerange-picker__inputGroup");
    // console.log(JSON.stringify("inputGroups: " + inputGroups));
    // console.log("splitting: " + JSON.stringify(inputGroups[0].innerHTML.split('"')[11]));
    // console.log("splitting: " + JSON.stringify(inputGroups[1].innerHTML.split('"')[11]));
    let from = new Date(inputGroups[0].innerHTML.split('"')[11]);
    let to = new Date(inputGroups[1].innerHTML.split('"')[11]);

    // console.log("from: " + from);
    // console.log("to: " + to);
    return [from, to];
  }
}

ChartView.propTypes = {
  seals: PropTypes.array.isRequired,
  sealReady: PropTypes.bool.isRequired,

  turtles: PropTypes.array.isRequired,
  turtleReady: PropTypes.bool.isRequired,

  birds: PropTypes.array.isRequired,
  birdReady: PropTypes.bool.isRequired,

  others: PropTypes.array.isRequired,
  otherReady: PropTypes.bool.isRequired,

  sexes: PropTypes.array.isRequired,
  taggedSeals: PropTypes.number.isRequired,
  taggedTurtles: PropTypes.number.isRequired,
  taggedBirds: PropTypes.number.isRequired,
  taggedOthers: PropTypes.number.isRequired
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  const turtleSubscription = Meteor.subscribe('TurtlesCollection');
  const turtleReady = turtleSubscription.ready();
  const turtles = Turtles.find({}).fetch();
  const birdSubscription = Meteor.subscribe('BirdsCollection');
  const birdReady = birdSubscription.ready();
  const birds = Birds.find({}).fetch();
  const sealSubscription = Meteor.subscribe('SealsCollection');
  const sealReady = sealSubscription.ready();
  const seals = Seals.find({}).fetch();
  const otherSubscription = Meteor.subscribe('OthersCollection');
  const otherReady = otherSubscription.ready();
  const others = Others.find({}).fetch();

  // Calculations for the graphs:
  // Male Female seals
  let sealFemale = Seals.find({ Sex : "F" }).count();
  let sealMale = Seals.find({ Sex : "M" }).count();
  let sexes = [sealFemale, sealMale]
  console.log("sealSexes: " + JSON.stringify(sealMale));

  // Tagged animals
  let taggedSeals = Seals.find({ xTagYN : "Y" }).count();
  let taggedTurtles = Turtles.find({ xTagYN : "Y" }).count();
  let taggedBirds = Birds.find({ xTagYN : "Y" }).count()
  let taggedOthers = Others.find({ xTagYN : "Y" }).count();


  return {
    turtleReady,
    turtles,
    birdReady,
    birds,
    sealReady,
    seals,
    otherReady,
    others,
    sexes,
    taggedSeals,
    taggedTurtles,
    taggedBirds,
    taggedOthers
  };
})(ChartView);

// <VictoryChart width={600}
//               theme={VictoryTheme.material}
//             >
//               <VictoryLine
//                 style={{
//                   data: { stroke: "#c43a31" },
//                   parent: { border: "1px solid #ccc" }
//                 }}
//                 // Seal
//                 data={
//                   sealTimeSeries
//                 }
//               />
//             </VictoryChart>

//             <VictoryChart width={600}
//               theme={VictoryTheme.material}
//             >
//               <VictoryLine
//                 style={{
//                   data: { stroke: "#c43a31" },
//                   parent: { border: "1px solid #ccc" }
//                 }}
//                 // Seal
//                 data={
//                   turtleTimeSeries
//                 }
//               />
//             </VictoryChart>

//             <VictoryChart width={600}
//               theme={VictoryTheme.material}
//             >
//               <VictoryLine
//                 style={{
//                   data: { stroke: "#c43a31" },
//                   parent: { border: "1px solid #ccc" }
//                 }}
//                 // Seal
//                 data={
//                   birdTimeSeries
//                 }
//               />
//             </VictoryChart>

//             <VictoryChart width={600}
//               theme={VictoryTheme.material}
//             >
//               <VictoryLine
//                 style={{
//                   data: { stroke: "#c43a31" },
//                   parent: { border: "1px solid #ccc" }
//                 }}
//                 // Seal
//                 data={
//                   otherTimeSeries
//                 }
//               />
//             </VictoryChart>