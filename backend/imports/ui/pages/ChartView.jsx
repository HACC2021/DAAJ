import React from 'react';
import { Grid, Segment, Header, Loader } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Turtles } from '../../api/turtle/Turtle';
import { Birds } from '../../api/bird/Bird';
import { Seals } from '../../api/seal/Seal';
import { Others } from '../../api/other/Other';
// import * as V from 'victory';
import { VictoryBar } from 'victory';

/** Renders the Page for adding a document. */
class ChartView extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.sealReady && this.props.turtleReady && this.props.birdReady && this.props.otherReady) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    let fRef = null;
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Add Stuff</Header>
          <VictoryBar/>
          {this.filter(new Date(), new Date(), ["Turtle Bay"], ["Bird", "Dolphin"])}
        </Grid.Column>
      </Grid>
    );
  }

  /*
   * from : date object of what time to start from
   * to : date object of what time to end to 
   * locationFilter : array of locations to include 
   * animalFilter : array of the animals (i.e. Seal, Turtle, Bird, and Other which can have multiple things) to include
   */
  filter(from, to, locationFilter, animalFilter) {
    console.log("locationFilter: " + locationFilter);
    // Filters needed: Time, Location, Animal
    // Default empty arrays
    let turtlesFiltered = [];
    let birdsFiltered = [];
    let sealsFiltered = [];
    let othersFiltered = [];

    // Turtle filtering
    if (animalFilter.includes("Turtle")) {
      turtlesFiltered = Turtles.find({
        'LocationName' : { $in : locationFilter}
      }).fetch();
    } 

    // Bird filtering
    if (animalFilter.includes("Bird")) {
      birdsFiltered = Birds.find({
        'LocationName' : { $in : locationFilter}
      }).fetch();
    }

    // Seal filtering
    if (animalFilter.includes("Seal")) {
      sealsFiltered = Seals.find({
        'LocationName' : { $in : locationFilter}
      }).fetch();
    }

    // Others filtering
    let otherAnimalFilter = animalFilter.filter(function (el) {
      return (el !== "Turtle") && (el !== "Seal") && el !== "Bird";
    });
    if (otherAnimalFilter.length > 0) {
      othersFiltered = Others.find({
        $and : [
          {'LocationName' : { $in : locationFilter}},
          {'Animal' : { $in : otherAnimalFilter }}
        ]
      }).fetch();
    }

    // Combine the animals using a set thing that Abdullah did
    let theSet = [...turtlesFiltered, ...birdsFiltered, ...sealsFiltered, ...othersFiltered]
    console.log("theSet: " + JSON.stringify(theSet));
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
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  const turtleSubscription = Meteor.subscribe('TurtlesCollection');
  const turtleReady = turtleSubscription.ready();
  const turtles = Turtles.find({});
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
  

  return {
    turtleReady,
    turtles,
    birdReady,
    birds,
    sealReady,
    seals,
    otherReady,
    others,
  };
})(ChartView);

// int days : the number of days to go forward or back. Positive number for forward; negative for backward
// int minutes : the number of minutes to go forward or back. Positive number for forward; negative for backward
//               can go beyond 60 mins
function chooseTime (days = 0, minutes = 0) {
  let time = new Date();
  time.setDate(time.getDate() + days); // Change the date
  time.setMinutes(time.getMinutes() + minutes); // Change the time
  return time;
}