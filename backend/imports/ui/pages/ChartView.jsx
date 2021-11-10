import React from 'react';
import { Grid, Segment, Header, Loader, Button } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Turtles } from '../../api/turtle/Turtle';
import { Birds } from '../../api/bird/Bird';
import { Seals } from '../../api/seal/Seal';
import { Others } from '../../api/other/Other';
import { VictoryChart, VictoryTheme, VictoryLine } from 'victory';
import Sample from '../components/Sample';


/** Renders the Page for adding a document. */
class ChartView extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.sealReady && this.props.turtleReady && this.props.birdReady && this.props.otherReady) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    let fRef = null;
    let sealTimeSeries = this.getSealTimeSeriesData();
    sealTimeSeries = Array.from(sealTimeSeries);
    console.log("sealTimeSeries: " + JSON.stringify(sealTimeSeries));
    return (
      <Grid container centered>
        <Grid.Column>
          <Sample />
          <Button onClick={() => this.handleClick()} className="ui olive basic button">Filter</Button>
          <Header as="h2" textAlign="center">Dashboard</Header>
          <VictoryChart
            theme={VictoryTheme.material}
          >
            <VictoryLine
              style={{
                data: { stroke: "#c43a31" },
                parent: { border: "1px solid #ccc" }
              }}
              // Seal
              data={[
                { x: new Date("11-02-21"), y: 2 },
                { x: new Date("11-03-21"), y: 3 },
                { x: new Date("11-04-21"), y: 4 },
                { x: new Date("11-05-21"), y: 5 },
                { x: new Date("11-01-21"), y: 6 },
              ]}
            />
            <VictoryLine
              style={{
                data: { stroke: "#c43a31" },
                parent: { border: "1px solid #ccc" }
              }}
              // Turtle
              data={[
                { x: new Date("11-02-21"), y: 2 },
                { x: new Date("11-03-21"), y: 3 },
                { x: new Date("11-04-21"), y: 4 },
                { x: new Date("11-05-21"), y: 5 },
                { x: new Date("11-01-21"), y: 6 },
              ]}
            />
            <VictoryLine
              style={{
                data: { stroke: "#c43a31" },
                parent: { border: "1px solid #ccc" }
              }}
              // Bird
              data={[
                { x: new Date("11-02-21"), y: 2 },
                { x: new Date("11-03-21"), y: 3 },
                { x: new Date("11-04-21"), y: 4 },
                { x: new Date("11-05-21"), y: 5 },
                { x: new Date("11-01-21"), y: 6 },
              ]}
            />
          </VictoryChart>

        </Grid.Column>
      </Grid>
    );
  }

  getSealTimeSeriesData() {
    console.log("in getSealTimeSeriesData");
    
    // Grab the DateObjectObserved field
    let sealsDates = Seals.find({}, {field : { DateObjectObserved : 1 }}).fetch();

    console.log("sealsDates: " + JSON.stringify(sealsDates));

    // Grab each date and put it into the array
    let allDates = [];
    sealsDates.forEach(seal => {
      allDates.push(new Date(seal.DateObjectObserved));
    });
    console.log("dateCounts: " + JSON.stringify(allDates));

    // Get unique dates
    let uniqueArray = allDates
    .map(function (date) { return date.getTime() })
    .filter(function (date, i, array) {
        return array.indexOf(date) === i;
    })
    .map(function (time) { return new Date(time); });

    console.log("uniqueArray: " + JSON.stringify(uniqueArray));

    // Create an object where each item is a date and it's equal to the count of it in the array above
    let counts = {};
    allDates.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
    console.log("counts: " + JSON.stringify(counts));
    console.log("counts['Tue Nov 09 2021 18:52:39 GMT-1000 (Hawaii-Aleutian Standard Time)]: " + counts['Tue Nov 09 2021 18:52:39 GMT-1000 (Hawaii-Aleutian Standard Time)']);

    return counts;
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