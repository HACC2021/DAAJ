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
import RelatedReportItem from '../components/RelatedReportItem';
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
    
    // stitching arrays of objects of reports for each animal type together
    // then filtering to only include those with the xRelated field set
    // (this means there exists a related sighting for this report)
    // then sorting on that xRelated field to group the related sightings together
    const filteredAndSorted = [...turtles, ...birds, ...seals, ...others].filter(report => {
      return (typeof report.xRelated !== 'undefined' && report.xRelated !== '' && report.xConfirmRelated !== 1);
  }).sort((a,b) => (a.xRelated > b.xRelated) ? 1 : ((b.xRelated > a.xRelated) ? -1 : 0));

    console.log("filtered");
    console.log(filteredAndSorted);

    const arrayOfGroupings = [];
    let color = false;
    while (filteredAndSorted.length > 0){
      const oneGroup = filteredAndSorted.filter(report => {
        return report.xRelated === filteredAndSorted[0].xRelated;
      });
      //swap color every pass of the loop
      color === true ? color = false : color = true;
      const oneGroupWithColor = oneGroup.map(report => ({...report, color: color})).sort(
        (a,b) => (a.xSightings < b.xSightings) ? 1 : ((b.xSightings < a.xSightings) ? -1 : 0));;
      filteredAndSorted.splice(0, oneGroupWithColor.length);
      arrayOfGroupings.push(oneGroupWithColor);
    }
    console.log("groups of related reports");
    console.log(arrayOfGroupings);
    return arrayOfGroupings;
  }
  // Render the page once subscriptions have been received.
  renderPage() {
    // FOR TESTING PURPOSES
    let sealDate = new Date();
    let sealMonth = String(sealDate.getMonth() + 1)
    let sealDay = String(sealDate.getDate())
    if (sealDay.length === 1){
      sealDay = "0" + sealDay 
    }
    let sealYear = String(sealDate.getFullYear()).slice(-2)
    let sealFullDate = sealMonth + sealDay + sealYear;
    let sealTime = (sealDate.toTimeString()).slice(0,5);

    let sealTest = {
      dateObjectObserved: sealDate,
      date: sealFullDate,
      timeObserved: sealTime,
      observerName: "Bumblebee",
      observerPhone: "808-381-4912",
      observerInitials: "BB",
      observerType: "P",
      sector: "East",
      location: "Laniakea",
      locationNotes: "",
      size: "6ft",
      sex: "M",
      beachPosition: "In-water",
      mainIdentification: "T",
      bleachNumber: "",
      tagNumber: "K888",
      tagSide: "Tail",
      tagColor: "N",
      momPup: "N",
      sealDepart: "N",
      departDate: "",
      departTime: "",
      otherNotes: "",
      xlatitude: 21.6188,
      xlongitude: -158.0854,
      xnumHundredFt: "15",
      xanimalBehavior: "Chasing me in the water",
      xTagYN: "Y",
      xBandYN: "N",
      xbandColor: "",
      xbleachMarkYN: "N",
      xscarsYN: "N",
      xscarsLocation: "",
      ximages: ["akdfhas.jpeg"],
      xisland: "Oahu", 
    }
      
    if (Seals.find().count() <= 5) {
      console.log("adding bumblebee")
      Meteor.call('addSeal', sealTest);
    }
   

    let aDate = new Date();
    let month = String(aDate.getMonth() + 1) 
    let day = String(aDate.getDate())
    if (day.length === 1){
        day = "0" + day
    }
    let year = String(aDate.getFullYear()).slice(-2)
    let date = month + day + year;
    let time = (aDate.toTimeString()).slice(0,5);

    let birdTest = {
      dateObjectObserved: aDate,
      date: date,
      timeObserved: time,
      observerName: "Deceptacon",
      observerPhone: "808-843-9381",
      observerInitials: "DC",
      observerType: "P",
      sector: "South",
      birdType: "LAAL",
      otherNotes: "",
      location: "Kaiaka Bay Beach Park",
      locationNotes: "",
      xlatitude: 21.582583,
      xlongitude: -158.124545,
      xnumHundredFt: "25",
      xanimalBehavior: "Screeching at nearby rocks",
      xTagYN: "Y",
      xBandYN: "N",
      xbandColor: "",
      xbleachMarkYN: "N",
      xBleachMarkNum: "",
      xtagNumber: "H102",
      xtagSide: "Right wing",
      xtagColor: "R",
      xscarsYN: "N",
      xscarsLocation: "",
      ximages: ["yuiqwebnfdsj.jpeg"],
      xmainIdentification: "T",
      xIsland: "Oahu",
    }

    if (Birds.find().count() <= 5) {
      console.log("adding Deceptacon");
      console.log("birdTest.location: " + birdTest.location);
      Meteor.call('addBird', birdTest);
    }
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
              <Table.HeaderCell>Confirm/Deny group</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.getReports().map((group) => group.map((report) => <RelatedReportItem key={report._id} report={report} />))}
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
