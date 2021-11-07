import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';
import { Seals } from '../../api/seal/Seal';
import { Turtles } from '../../api/turtle/Turtle';
import { Birds } from '../../api/bird/Bird';
import { Others } from '../../api/other/Other';
import StuffItem from '../components/StuffItem';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class TableView extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready && this.props.sealsReady && this.props.turtlesReady && this.props.birdsReady && this.props.othersReady) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    let aDate = new Date();
    let month = String(aDate.getMonth() + 1) 
    let day = String(aDate.getDate())
    if (day.length === 1){
        day = "0" + day
    }
    let year = String(aDate.getFullYear()).slice(-2)
    // let date = month + day + year;
    // let time = (aDate.toTimeString()).slice(0,5);

    let turtleTest = {
      dateObjectObserved: new Date("2021-11-07T03:14:24.284+00:00"),
      date: "110621",
      timeObserved: "17:14",
      observerName: "Optimum Prime",
      observerPhone: "808-234-5739",
      observerInitials: "OP",
      observerType: "P",
      island: "Mayu",
      sector: "West",
      beachLocation: "Laniakea",
      locationNotes: "On beach",
      turtleType: "Cm",
      size: "2ft",
      status: "Alive",
      otherNotes: "",
      xlatitude: 21.6188,
      xlongitude: -158.0854,
      xnumHundredFt: "10",
      xanimalBehavior: 'Digging in the sand',
      xTagYN: "N",
      xtagNumber: "L123",
      xtagSide: "Right front flipper",
      xtagColor: "R",
      xBandYN: "Y",
      xbandColor: "R",
      xbleachMarkYN: "",
      xBleachMarkNum: "",
      xscarsYN: "Y",
      xscarsLocation: "On shell",
      xampFlipper: "Y",
      xwhichFlipper: "Left",
      ximages: ["sdfghjty.jpeg", "ertyughj.jpeg"],
      xmainIdentification: "S",
    }
    if (Turtles.find().count() <= 5) {
      console.log("adding optimus prime")
      Meteor.call('addTurtle', turtleTest);
    }
    return (
      <h1> {/* <Container>
        <Header as="h2" textAlign="center">List Stuff</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Quantity</Table.HeaderCell>
              <Table.HeaderCell>Condition</Table.HeaderCell>
              <Table.HeaderCell>Edit</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.stuffs.map((stuff) => <StuffItem key={stuff._id} stuff={stuff} />)}
          </Table.Body>
        </Table>
      </Container> */}
      {JSON.stringify(this.props.turtles)}<br></br></h1>
    );
  }
}

// Require an array of Stuff documents in the props.
TableView.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,

  seals: PropTypes.array.isRequired,
  sealsReady: PropTypes.bool.isRequired,

  turtles: PropTypes.array.isRequired,
  turtlesReady: PropTypes.bool.isRequired,

  birds: PropTypes.array.isRequired,
  birdsReady: PropTypes.bool.isRequired,

  others: PropTypes.array.isRequired,
  othersReady: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Stuffs.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const stuffs = Stuffs.collection.find({}).fetch();

  sealsSubscription = Meteor.subscribe("SealsCollection");
  sealsReady = sealsSubscription.ready();
  let seals = Seals.find({}).fetch();

  turtlesSubscription = Meteor.subscribe("TurtlesCollection");
  turtlesReady = turtlesSubscription.ready();
  let turtles = Turtles.find({}).fetch();

  birdsSubscription = Meteor.subscribe("BirdsCollection");
  birdsReady = birdsSubscription.ready();
  let birds = Birds.find({}).fetch();

  othersSubscription = Meteor.subscribe("OthersCollection");
  othersReady = othersSubscription.ready();
  let others = Others.find({}).fetch();

  return {
    stuffs,
    ready,
    seals,
    sealsReady,
    turtles,
    turtlesReady,
    birds,
    birdsReady,
    others,
    othersReady,
  };
})(TableView);