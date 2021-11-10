import React from 'react';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { GoogleMap, InfoWindow, Marker, LoadScript } from '@react-google-maps/api';
import ReportItem from '../components/ReportItem';
import { Container, Button, Grid, Dropdown, Image, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';
import { Turtles } from '../../api/turtle/Turtle';
import { Birds } from '../../api/bird/Bird';
import { Seals } from '../../api/seal/Seal';
import { Others } from '../../api/other/Other';
import Sample from '../components/Sample';

const mapStyles = {
  height: "100vh",
  width: "100%"};

const defaultCenter = {
  lat: 20.3069, lng: -157.5583
}

const locationOptions = ["ALA MOANA BEACH PARK","ALA WAI HARBOR","CHINA WALL","CLIFFS","COCKROACH COVE (KAUPO BEACH)","COLONY SURF","WAIKIKI","CONCESSIONS","CROMWELL'S","DIAMOND HEAD","ELK'S CLUB","WAIKIKI",
"ETERNITY BEACH","FORT DERUSSY BEACH","HALONA BLOWHOLE","HANAUMA BAY","HAWAII KAI","HONOLULU HARBOR","IRMA'S","KAHALA BEACH","KAHALA MANDARIN HOTEL","KAHANAMOKU BEACH (HALE KOA HOTEL)","KAIMANA BEACH","WAIKIKI",
"KALOKO BEACH (ALAN DAVIS BIRTH BEACH)","KEEHI LAGOON","KEWALO BASIN/HARBOR","KOKEE FLATS","KUHIO BEACH PARK","WAIKIKI","LANAI LOOKOUT","MAGIC ISLAND (TROUGH)","MAKAI PIER","MAKALEI BEACH PARK","MAKAPUU BEACH PARK",
"OUTRIGGER CANOE CLUB","WAIKIKI","PEARL HARBOR","PELE'S CHAIR (ALAN DAVIS)","QUEEN'S BEACH","REEF RUNWAY","SAND ISLAND BEACH PARK","SANDY BEACH","SPITTING CAVES","SUICIDES","WAIKIKI","AKI'S BEACH","BARBER'S POINT",
"CAMPBELL BOAT RAMP","CAMPBELL INDUSTRIAL PARK","DEPOTS BEACH","NANAKULI","ELECTRIC BEACH","EWA BEACH","GERMAIN'S LUAU","IROQUOIS POINT","IROQUOIS POINT (COVE 1)", "IROQUOIS POINT (COVE 2)", "IROQUOIS POINT (COVE 3)",
"IROQUOIS POINT (COVE 4)","IROQUOIS POINT (COVE 5 - DOG BEACH)","IROQUOIS POINT (COVE 6)","IROQUOIS POINT (COVE 7)","IROQUOIS POINT (COVE 8)","KAENA POINT (LIGHT STATION)","KAENA POINT (WEST SIDE ARCH)","KAENA STATE PARK",
"KAHE POINT","KALAELOA CAMPGROUNDS","KALAELOA HARBOR","KAUPUNI CANAL","KEAAU BEACH PARK (RANCHES)","KOOLINA","KOOLINA (LAGOON 1 - KOHOLA)","KOOLINA (LAGOON 2 - HONU)","KOOLINA (LAGOON 3 - NAIA)","KOOLINA (LAGOON 4 - ULUA)",
"KOOLINA MARINA","LANIKOHONUA (LANI'S)","MAILI BEACH PARK","MAILI CANAL","MAILI GUARDRAILS","MAILI POINT","MAIPALAOA BEACH","MAIPALOA CANAL","MAKAHA BEACH PARK","MAKUA BEACH","MAKUA BEACH (PRAY FOR SETS/SEX)","MAKUA CLIFFS (PUKANO PT.)",
"MAUNA LAHILAHI BEACH","NANAKULI BEACH (ZABLAN)","NANAKULI BEACH PARK","NIMITZ BEACH,NIMITZ COVE","ONEULA BEACH","PARADISE COVE","POKAI BAY","SECRET BEACH (KOOLINA)","TRACKS BEACH","ULEHAWA BEACH PARK (PUKA PANTS)","WAIANAE","WAIANAE BEACH (PUKA PANTS)",
"WAIANAE BEACH PARK","WAIANAE BOAT HARBOR","WAIANAE CANAL","WHITE PLAINS BEACH","YOKOHAMA BEACH (KEAWAULA)","ALLIGATOR ROCK (HAUULA)","AUKAI BEACH (HAUULA FIRE STATION)","BATHTUB BEACH","LAIE","BELLOWS BEACH","ELBOW BEACH (KAHUKU POINT)","GOAT ISLAND",
"HANAKAILIO BEACH (2ND BEACH / MARCONIS)","HAUULA BEACH PARK","HIGH ROCK","HUKILAU BEACH","JAMES CAMPBELL WILDLIFE REFUGE","KAAAWA BEACH","KAHUKU GOLF COURSE","KAIHALULU BEACH","KAILUA BEACH PARK","KAKELA BEACH","KAUPO BEACH PARK (BABY MAKAPUU)","KEIKI POOL",
"KAIHALULU BEACH","KOKOLOLIO BEACH","KUALOA BEACH PARK","KUALOA RANCH BEACH","KUILIMA COVE","LAIE BEACH PARK (POUNDERS)","LANIKAI BEACH","MALAEKAHANA BAY","MCBH - CABINS BEACH","MCBH - FORT HASE BEACH","MCBH - HALEKOA BEACH","MCBH - NORTH BEACH",
"MCBH - PYRAMID ROCK","MCKENZIES BEACH (KAIHALULU BEACH)","MOKU IKI ISLAND","MOKU MANU","MOKU NUI ISLAND","MOKULUA ISLANDS","PUNALUU BEACH PARK","RABBIT ISLAND","RIGHT SPOTS SPOT (KAIHALULU BEACH)","TEMPLE BEACH (LAIE)","TURTLE BAY (STABLES)","WAIMANALO BAY BEACH PARK","WAIMANALO BEACH",
"ALII BEACH PARK","HALEIWA","ALLIGATOR ROCK (NORTH SHORE)","ARMY BEACH","HALEIWA","ARMY BEACH","MOKULEIA","CAMP ERDMAN","CAMP MOKULEIA","EHUKAI BEACH PARK (PIPELINES)","HALEIWA BEACH PARK","HIDDEN BEACH","KAENA POINT","KAENA POINT","KAENA POINT (10 MINUTE BEACH)","KAENA POINT (HIDDEN BEACH)",
"KAENA POINT (LIGHT STATION)","LANIAKEA BEACH","MOKULEIA BEACH PARK","PAHIPAHIALUA BEACH","PAPAILOA BEACH","PUAENA POINT","HALEIWA","PUPUKEA (GAS CHAMBERS)","PUU NENUE POINT","ROCKY POINT","SHARK'S COVE","SUNSET BEACH PARK","TABLES BEACH","MOKULEIA","THREE TABLES","VELZYLAND","WAIALEE BEACH PARK",
"WAIALUA BEACH","WAIMEA BAY BEACH PARK"];

class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pin: [],
      pinPressed: false,
      isOpen: false,
      results: [],
      filteredAnimalReports: [],
      searchPressed: false,
      filteredLocationReports: [], 
      noResults: false,
    };
  }
  render() {
    return (this.props.ready && this.props.sealReady && this.props.turtleReady && this.props.birdReady && this.props.otherReady) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // updates user's selected location choices
  handleLocationChange = (e, {value}) => {
    this.setState({ filteredLocationReports: value});
    console.log("clicked locations: " + this.state.filteredLocationReports);
  }


  // updates user's selected animals choices
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
        // stitching arrays of objects of reports for each animal type together, to map it to ReportItem
        return [...turtles, ...birds, ...seals, ...others].sort(function(a,b){
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(b.DateObjectObserved) - new Date(a.DateObjectObserved);
        });
        ;
      }

      reformatLocation() {
        let filteredLocationOptions=  [...new Set(locationOptions)].sort();
        let lowercased = filteredLocationOptions.map(name => name.toLowerCase());
        let upperCaseFirstLetter = lowercased.map(name => 
          name.split(' ').map(word => 
            word[0].toUpperCase() + word.slice(1).toLowerCase()
          ).join(' '));
        return upperCaseFirstLetter;
      }

      pinPressed(report) {
        this.setState({pin: report, pinPressed: true});
      }

      handleToggleOpen = () => {
        this.setState({
          isOpen: true
        });
      }
      
      handleToggleClose = () => {
        this.setState({
          isOpen: false
        });
      }

      handleFields(status, type) {
        if (status) {
          return status;
        } else {
          return "The " + type + " is not available.";
        }

      }

      handleChange = (e, {value}) => {
        // this.setState({searchPressed: true, filteredLocationReports: value});
         console.log("clicked locations: " + this.state.filteredLocationReports);
       }
      
      handleImage(image) {
        if (typeof image === 'string') {
          return  <Image src={image}/>
        } else if ( image instanceof Array) {
          for (let i = 0; i < image.length; i++) {
            return <Image src={image[i]}/>
          }
        } else {
          return "Images are not available.";
        }
      }

      getType(type) {
        if (type == "Bird") {
          return <Header style={{paddingTop: 20}} as='h3'>Bird Type:</Header>;
        } else if (type == "Turtle") {
          return <Header style={{paddingTop: 20}} as='h3'>Turtle Type:</Header>;
        }
      }

      handleExtraFields(text, isFieldPresent) {
        if (isFieldPresent) {
        return <Header style={{paddingTop: 20}} as='h3'>{text}</Header>;
        }
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

  handleReset() {
    this.setState({results: this.getReports()});
  }

  handleClick() {
    this.setState({searchPressed: true, results: this.filter(this.state.filteredLocationReports, this.state.filteredAnimalReports)});
    console.log(this.state.results);

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

      // check if image array works
  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    let fRef = null;

    return (
      <Grid style={{fontFamily: 'Poppins'}}>
        {this.state.pinPressed ?
        <Grid.Column textAlign='center' width={4}>
          <Grid.Row> <Image src='/images/logo.jpg' size='medium' rounded /></Grid.Row>
          <Grid.Row> <Header style={{fontFamily: 'Poppins'}} textAlign='center' as='h1'>{this.handleFields(this.state.pin.Animal, "animal")}</Header> </Grid.Row>
          <Grid.Row> <Header style={{ fontFamily: 'Poppins', paddingTop: 20}} as='h3'>Observed:</Header> {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(this.state.pin.DateObjectObserved)} 
          {" "} {new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', timeZone: 'HST' }).format(this.state.pin.DateObjectObserved)} HST </Grid.Row>
          <Grid.Row>{this.getType(this.state.pin.Animal)} {this.state.pin.BirdType || this.state.pin.TurtleType}</Grid.Row>
          <Grid.Row> <Header style={{fontFamily: 'Poppins', paddingTop: 20}} as='h3'>Tag Number:</Header> {this.handleFields(this.state.pin.xTagNumber, "tag number")}</Grid.Row>
          <Grid.Row> <Header style={{fontFamily: 'Poppins', paddingTop: 20}} as='h3'>Island:</Header> {this.state.pin.Island || this.state.pin.xIsland}</Grid.Row>
          <Grid.Row>{this.handleExtraFields("Location Notes: ", this.state.pin.LocationNotes)} {this.state.pin.LocationNotes} </Grid.Row>
          <Grid.Row> <Header style={{fontFamily: 'Poppins', paddingTop: 20}} as='h3'>Status:</Header> {this.handleFields(this.state.pin.Status, "status")}</Grid.Row>
          <Grid.Row> <Header style={{fontFamily: 'Poppins', paddingTop: 20}} as='h3'>Size:</Header> {this.handleFields(this.state.pin.Size, "size")}</Grid.Row>
          <Grid.Row> <Header style={{fontFamily: 'Poppins', paddingTop: 20}} as='h3'>Behavior:</Header> {this.handleFields(this.state.pin.xAnimalBehavior, "animal behavior")}</Grid.Row>
          <Grid.Row> <Header style={{fontFamily: 'Poppins', paddingTop: 20}} as='h3'>Images</Header> {this.handleImage(this.state.pin.xImages)}</Grid.Row>
        </Grid.Column> :
         <Grid.Column width={4}>
         <Grid.Row> <Image src='/images/logo.jpg' size='medium' rounded /></Grid.Row>
         <Grid.Row> <Header style={{fontFamily: 'Poppins', paddingTop: 20}} textAlign='center' as='h2'>Click on a pin to get started! </Header> </Grid.Row>
        </Grid.Column>
         }
        <Grid.Column width={12}>
          <Grid.Row style={{backgroundColor: '#02c0e8', paddingLeft: 20, paddingTop: 20, marginTop: -10, paddingBottom: 20}}>
          
          <Dropdown
            style={{marginRight: 20, marginBottom: 20 }}
            placeholder='Location'
            floated
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
          <Sample/>
          <Button 
          onClick={() => this.handleClick()}
          primary  style={{marginTop: 20, fontFamily: 'Poppins'}}>Search</Button>
       <Button 
       negative
       style={{fontFamily: 'Poppins'}}
          onClick={() => this.handleReset()}
          primary>Reset</Button>
          </Grid.Row>
          <LoadScript
            googleMapsApiKey='AIzaSyDy4lATc_hd8VHpkRBfDYUgfD3pGNQtdXA'>
           <GoogleMap
              mapContainerStyle={mapStyles}
              zoom={7}
              center={defaultCenter}
            >
              {!this.state.searchPressed ?
            (this.getReports().map(report => {
              return <Marker onClick={() => {this.pinPressed(report); this.handleToggleOpen()}} strokeColor="#2383ab"position={{lat: report.xLatitude, lng:report.xLongitude}} key={report._id}>
     </Marker>
           })) :          (this.state.results.map(report => {
            return <Marker onClick={() => {this.pinPressed(report); this.handleToggleOpen()}} strokeColor="#2383ab"position={{lat: report.xLatitude, lng:report.xLongitude}} key={report._id}>
   </Marker>
         })) }
            </GoogleMap>
          </LoadScript>
        </Grid.Column>
      </Grid>
    );
  }}


  // Require an array of Stuff documents in the props.
  MapView.propTypes = {
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
  })(MapView);
