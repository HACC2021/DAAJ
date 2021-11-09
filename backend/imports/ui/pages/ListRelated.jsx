import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';
import { Turtles } from '../../api/turtle/Turtle';
import { Birds } from '../../api/bird/Bird';
import { Seals } from '../../api/seal/Seal';
import { Others } from '../../api/other/Other';
import ReportItem from '../components/ReportItem';
//import { getReports }  from '../../startup/server/GetReports';


/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListRelated extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready && this.props.sealReady && this.props.turtleReady && this.props.birdReady && this.props.otherReady) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  getReports() {
    console.log("combined");
    console.log([...this.props.turtles, ...this.props.birds, ...this.props.seals, ...this.props.others]);

    // adding fields to each array to indicate the animal of the report
    //const turtles = this.props.turtles.map(report => ({...report, type: "Turtle"}));
    const turtles = this.props.turtles.map(report => ({...report, type: "Turtle"}));
    const birds = this.props.birds.map(report => ({...report, type: "Bird"}));
    const seals = this.props.seals.map(report => ({...report, type: "Seal"}));
    const others = this.props.others.map(report => ({...report, type: "Other"}));
    // stitching arrays of objects of reports for each animal type together, to map it to ReportItem
    return [...turtles, ...birds, ...seals, ...others].sort(function(a,b){
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.DateObjectObserved) - new Date(a.DateObjectObserved); // Change to sort by xRelated
    });
    ;
  }
  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">Confirm Related Sightings</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Time</Table.HeaderCell>
              <Table.HeaderCell>Animal</Table.HeaderCell>
              <Table.HeaderCell>Sector</Table.HeaderCell>
              <Table.HeaderCell>Location</Table.HeaderCell>
              <Table.HeaderCell>Size</Table.HeaderCell>
              <Table.HeaderCell>MainIdentification</Table.HeaderCell>
              <Table.HeaderCell>AnimalBehavior</Table.HeaderCell>
              <Table.HeaderCell>Tag present?</Table.HeaderCell>
              <Table.HeaderCell>Band present?</Table.HeaderCell>
              <Table.HeaderCell>Bleach mark present?</Table.HeaderCell>
              <Table.HeaderCell>Scars present?</Table.HeaderCell>
              <Table.HeaderCell>#Reports</Table.HeaderCell>
              <Table.HeaderCell>Related ID</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.getReports().map((report) => <ReportItem key={report._id} report={report} />)}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ListRelated.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,

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
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Stuffs.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const stuffs = Stuffs.collection.find({ $and: [
    { xRelated: { $ne: "" } },
    { xConfirmRelated: { $ne: "" } }
 ] }).fetch();
  
  
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

  return {
    stuffs,
    ready,
    turtleReady,
    turtles,
    birdReady,
    birds,
    sealReady,
    seals,
    otherReady,
    others
  };
})(ListRelated);
