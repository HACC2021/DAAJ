import React from 'react';
import { Grid, Segment, Header, Loader, Button } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Turtles } from '../../api/turtle/Turtle';
import { Birds } from '../../api/bird/Bird';
import { Seals } from '../../api/seal/Seal';
import { Others } from '../../api/other/Other';
import { VictoryBar } from 'victory';
import Sample from '../components/Sample';


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
          <Sample/>
          <Button className="ui olive basic button">Filter</Button>
          <Header as="h2" textAlign="center">Dashboard</Header>
          <VictoryBar/>
          {/*JSON.stringify(this.filter(new Date(), new Date(), ["Turtle Bay"], ["Bird", "Dolphin"]))*/}
        </Grid.Column>
      </Grid>
    );
  }

  /*
   * locationFilter : array of locations to include 
   * animalFilter : array of the animals (i.e. Seal, Turtle, Bird, and Other which can have multiple things) to include
   */
  filter(locationFilter, animalFilter) {
    // Filters: Time, Location, Animal

    // Get the date and time chosen from the react-datetimerange picker
    let fromTo = this.getDate();
    let from = new Date(fromTo[0]);
    let to = new Date(fromTo[1]);

    /* To implement after
    $and : [
          {'LocationName' : { $in : locationFilter }},
          {'Animal' : { $in : otherAnimalFilter }},
          {'DateObjectObserved' : { $gte : from, $lte : to }}
        ]
    */
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
    let filteredResults = [...turtlesFiltered, ...birdsFiltered, ...sealsFiltered, ...othersFiltered]
    console.log("filteredResults: " + JSON.stringify(filteredResults));

    return filteredResults;
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