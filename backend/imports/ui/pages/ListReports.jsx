import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Button, Icon, Table, Header, Dropdown, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';
import { Turtles } from '../../api/turtle/Turtle';
import { Birds } from '../../api/bird/Bird';
import { Seals } from '../../api/seal/Seal';
import { Others } from '../../api/other/Other';
import ReportItem from '../components/ReportItem';
//import { getReports }  from '../../startup/server/GetReports';
import Sample from '../components/Sample';
import { Link } from 'react-router-dom';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListReports extends React.Component {
  constructor(props) {
    console.log("In the constructor");
    super(props);
    this.state = this.getInitialState();

  }

  getInitialState = () => ({
      results: [],
      filteredAnimalReports: [],
      searchPressed: false,
      filteredLocationReports: [], //the locations user chooses
      noResults: false,
   })

   resetState = () => {
    this.setState(this.getInitialState());
 }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready && this.props.sealReady && this.props.turtleReady && this.props.birdReady && this.props.otherReady) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

    // updates user's selected location choices
    handleLocationChange = (e, {value}) => {
      this.setState({ filteredLocationReports: value});
      console.log("clicked locations: " + this.state.filteredLocationReports);
    }


    // updates user's selected location choices
    handleAnimalChange = (e, {value}) => {
    this.setState({ filteredAnimalReports: value});
    console.log("clicked animals: " + this.state.filteredAnimalReports);
  }
  
  getReports() {
/*
    console.log("turtles");
    console.log(this.props.turtles);
    console.log("birds");
    console.log(this.props.birds);
    console.log("seals");
    console.log(this.props.seals);
    console.log("others");
    console.log(this.props.others);
    */
    // adding fields to each array to indicate the animal of the report
    //const turtles = this.props.turtles.map(report => ({...report, type: "Turtle"}));
    const turtles = this.props.turtles.map(report => ({...report, type: "Turtle"}));
    const birds = this.props.birds.map(report => ({...report, type: "Bird"}));
    const seals = this.props.seals.map(report => ({...report, type: "Seal"}));
    const others = this.props.others.map(report => ({...report, type: "Other"}));
   
    console.log([...turtles, ...birds, ...seals, ...others]);

    // stitching arrays of objects of reports for each animal type together, to map it to ReportItem
    return [...turtles, ...birds, ...seals, ...others].sort(function(a,b){
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.DateObjectObserved) - new Date(a.DateObjectObserved);
    });
    ;
  }

  findDistinctAnimals() {
      // Find distinct animals:
  let distinctAnimals = ["Seal", "Turtle", "Bird"];
  let otherAnimals = Others.find({}, { fields: { 'Animal': 1 } }).fetch();
  
  otherAnimals.forEach(report => {
    distinctAnimals.push(report.Animal);
  });

  // Use a set to get rid of duplicate animals
  distinctAnimals = [... new Set(distinctAnimals)];

  // Remove null
  distinctAnimals = distinctAnimals.filter(function (el) {
    return el != null;
  });

return distinctAnimals;
  }

  findDistinctLocations() {
    let sealLocations = Seals.find({}, { fields: { 'LocationName': 1 } }).fetch();
    let turtleLocations = Turtles.find({}, { fields: { 'LocationName': 1 } }).fetch();
    let birdLocations = Birds.find({}, { fields: { 'LocationName': 1 } }).fetch();
    let otherLocations = Others.find({}, { fields: { 'LocationName': 1 } }).fetch();
  
      // Combine all of the report objects into one array
  let allLocations = sealLocations.concat(turtleLocations, birdLocations, otherLocations);

  // For each report object, get the text in the locationName field
  let distinctLocations = [];
  allLocations.forEach(report => {
    distinctLocations.push(report.LocationName);
  });

  // https://stackoverflow.com/questions/11246758/how-to-get-unique-values-in-an-array
  // Use a set to get rid of duplicate locations
  distinctLocations = [... new Set(distinctLocations)];

  // https://stackoverflow.com/questions/281264/remove-empty-elements-from-an-array-in-javascript#:~:text=For%20example%2C%20if%20you%20want,null%3B%20%7D)%3B%20console.
  // Remove null (May keep replace with no location)
  distinctLocations = distinctLocations.filter(function (el) {
    return el != null;
  });
  return distinctLocations;

  }

  handleReset() {
    this.setState({results: this.getReports()});
    this.resetState();
  }

  handleClick() {
    this.setState({searchPressed: true, results: this.filter(this.state.filteredLocationReports, this.state.filteredAnimalReports)});
    console.log(this.state.results);
  }

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

    
    if (animalFilter.length == 0 ) {
      animalFilter = this.findDistinctAnimals();
   }

   if (locationFilter.length == 0) {
     locationFilter = this.findDistinctLocations();
   }

    // Turtle filtering
    if (animalFilter.includes("Turtle")) {
      turtlesFiltered = Turtles.find({
        $and : [
          {'LocationName' : { $in : locationFilter }},
          {'DateObjectObserved' : { $gte : from, $lte : to }}
        ]      }).fetch();
    } 

    // Bird filtering
    if (animalFilter.includes("Bird")) {
      birdsFiltered = Birds.find({
        $and : [
          {'LocationName' : { $in : locationFilter }},
          {'DateObjectObserved' : { $gte : from, $lte : to }}
        ]      }).fetch();
    }

    // Seal filtering
    if (animalFilter.includes("Seal")) {
      sealsFiltered = Seals.find({
        $and : [
          {'LocationName' : { $in : locationFilter }},
          {'DateObjectObserved' : { $gte : from, $lte : to }}
        ]      }).fetch();
    }

    // Others filtering
    let otherAnimalFilter = animalFilter.filter(function (el) {
      return (el !== "Turtle") && (el !== "Seal") && el !== "Bird";
    });
    if (otherAnimalFilter.length > 0) {
      othersFiltered = Others.find({
        $and : [
          {'LocationName' : { $in : locationFilter }},
          {'Animal' : { $in : otherAnimalFilter }},
          {'DateObjectObserved' : { $gte : from, $lte : to }}
        ]
      }).fetch();
    }

    // Combine the animals using a set thing that Abdullah did
    let filteredResults = [...turtlesFiltered, ...birdsFiltered, ...sealsFiltered, ...othersFiltered]
    console.log("filteredResults: " + JSON.stringify(filteredResults));

    if (filteredResults.length == 0) {
      this.setState({noResults: true});
    }

    return filteredResults;
  }
  // dkdkd

  // SAY NO RESULTS FOUNDS
  // Render the page once subscriptions have been received.
  renderPage() {
    console.log("WAAAA" + this.state.filteredAnimalReports);
    return (
        <Container style={{fontFamily: 'Poppins'}}>      
        <Header style={{fontFamily: 'Poppins', paddingTop: 20}} as="h2" textAlign="center">Latest Reports</Header>
        <Dropdown
            placeholder='Location'
            floated
            style={{marginRight: 20, marginBottom: 20 }}
            multiple
            defaultValue={this.state.filteredLocationReports}
            search
            onChange={this.handleLocationChange.bind(this)}
            options={this.findDistinctLocations().map(location =>({key: location, text:location, value: location }))}
            selection
          />
          <Dropdown
            placeholder='Animal'
            floated
            multiple
            search
            onChange={this.handleAnimalChange.bind(this)}
            options={this.findDistinctAnimals().map(location =>({key: location, text:location, value: location }))}
            selection
          />
          <Button 
          onClick={() => this.handleClick()}
          style={{fontFamily: 'Poppins', marginLeft: 20, marginTop: 20 }}
          primary>Search</Button>
       <Button 
       negative
       style={{fontFamily: 'Poppins'}}
          onClick={() => this.handleReset()}
          primary>Reset</Button>
                    <Link to="/listRelated">
         <Button
          color='red'
          content='Related Sightings'
          icon='bell'
          style={{marginBottom: 20, fontFamily: 'Poppins'}}
          label={{ basic: true, color: 'red', pointing: 'left', content: this.props.unConfirmedRelated }}
        />      
        </Link>
                
         <Sample/>
                   
                    {this.state.noResults ? 
        <Header as="h1"> No results found. </Header> :
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Time</Table.HeaderCell>
              <Table.HeaderCell>Animal</Table.HeaderCell>
              <Table.HeaderCell>Sector</Table.HeaderCell>
              <Table.HeaderCell>Island</Table.HeaderCell>
              <Table.HeaderCell>Size</Table.HeaderCell>
              <Table.HeaderCell>MainIdentification</Table.HeaderCell>
              <Table.HeaderCell>AnimalBehavior</Table.HeaderCell>
              <Table.HeaderCell>#Reports</Table.HeaderCell>
              <Table.HeaderCell>Checked?</Table.HeaderCell>
              <Table.HeaderCell>Reporter phone #</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
          {!this.state.searchPressed ? 
            (this.getReports().map((report) => <ReportItem key={report._id} report={report} />))
                      :
            (this.state.results.map((report) => <ReportItem key={report._id} report={report} />))
          }
          </Table.Body>
        </Table>}
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ListReports.propTypes = {
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

  unConfirmedRelated: PropTypes.number.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Stuffs.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const stuffs = Stuffs.collection.find({}).fetch();
  const turtleSubscription = Meteor.subscribe('TurtlesCollection');
  const turtleReady = turtleSubscription.ready();
  const turtles = Turtles.find({ xSightings: { $gte : 1 } }).fetch();
  const birdSubscription = Meteor.subscribe('BirdsCollection');
  const birdReady = birdSubscription.ready();
  const birds = Birds.find({ xSightings: { $gte : 1 } }).fetch();
  const sealSubscription = Meteor.subscribe('SealsCollection');
  const sealReady = sealSubscription.ready();
  const seals = Seals.find({ xSightings: { $gte : 1 } }).fetch();
  const otherSubscription = Meteor.subscribe('OthersCollection');
  const otherReady = otherSubscription.ready();
  const others = Others.find({ xSightings: { $gte : 1 } }).fetch();

  // Find counts of xConfirmRelated that is == to 0:
  let unConfirmedRelated = Seals.find({xConfirmRelated : {$eq : 0 }}, { fields: { 'xConfirmRelated': 1 } }).count() + Turtles.find({xConfirmRelated : {$eq : 0 }}, { fields: { 'xConfirmRelated': 1 } }).count() + Birds.find({xConfirmRelated : {$eq : 0 }}, { fields: { 'xConfirmRelated': 1 } }).count();
  console.log("unConfirmedRelated:" + unConfirmedRelated);
  
  // Find distinct locations:
  let sealLocations = Seals.find({}, { fields: { 'LocationName': 1 } }).fetch();
  let turtleLocations = Turtles.find({}, { fields: { 'LocationName': 1 } }).fetch();
  let birdLocations = Birds.find({}, { fields: { 'LocationName': 1 } }).fetch();
  let otherLocations = Others.find({}, { fields: { 'LocationName': 1 } }).fetch();

  // Combine all of the report objects into one array
  let allLocations = sealLocations.concat(turtleLocations, birdLocations, otherLocations);

  // For each report object, get the text in the locationName field
  let distinctLocations = [];
  allLocations.forEach(report => {
    distinctLocations.push(report.LocationName);
  });

  // https://stackoverflow.com/questions/11246758/how-to-get-unique-values-in-an-array
  // Use a set to get rid of duplicate locations
  distinctLocations = [... new Set(distinctLocations)];

  // https://stackoverflow.com/questions/281264/remove-empty-elements-from-an-array-in-javascript#:~:text=For%20example%2C%20if%20you%20want,null%3B%20%7D)%3B%20console.
  // Remove null (May keep replace with no location)
  distinctLocations = distinctLocations.filter(function (el) {
    return el != null;
  });

  console.log("distinctLocations:" + distinctLocations);

  // Find distinct animals:
  let distinctAnimals = ["Seal", "Turtle", "Bird"];
  let otherAnimals = Others.find({}, { fields: { 'Animal': 1 } }).fetch();
  
  otherAnimals.forEach(report => {
    distinctAnimals.push(report.Animal);
  });

  // Use a set to get rid of duplicate animals
  distinctAnimals = [... new Set(distinctAnimals)];

  // Remove null
  distinctAnimals = distinctAnimals.filter(function (el) {
    return el != null;
  });

  console.log("distinctAnimals: " + distinctAnimals);

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
    others,
    unConfirmedRelated,
  };
})(ListReports);