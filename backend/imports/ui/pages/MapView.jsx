import React from 'react';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { GoogleMap, InfoWindow, Marker, LoadScript } from '@react-google-maps/api';
import ReportItem from '../components/ReportItem';
import { Container, Grid, Dropdown, Image, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';
import { Turtles } from '../../api/turtle/Turtle';
import { Birds } from '../../api/bird/Bird';
import { Seals } from '../../api/seal/Seal';
import { Others } from '../../api/other/Other';

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
      pin: this.getReports(),
      pinPressed: false,
      isOpen: false,
      filteredLocationReports: [], 
    };
  }
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
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
        const turtles = this.props.turtles.map(report => ({...report, type: "Turtle"}));
        const birds = this.props.birds.map(report => ({...report, type: "Bird"}));
        const seals = this.props.seals.map(report => ({...report, type: "Seal"}));
        const others = this.props.others.map(report => ({...report, type: "Other"}));
        // stitching arrays of objects of reports for each animal type together, to map it to ReportItem
        return [...turtles, ...birds, ...seals, ...others];
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

      handleExtraFields(text) {
        return <Header style={{paddingTop: 20}} as='h3'>{text}</Header>;
      }

      // check if image array works
  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    let fRef = null;

    return (
      <Grid>
        {this.state.pinPressed ? 
        <Grid.Column width={4}>
          <Grid.Row> <Image src='/images/logo.jpg' size='medium' rounded /></Grid.Row>
          <Grid.Row> <Header textAlign='center' as='h1'>{this.handleFields(this.state.pin.Animal, "animal")}</Header> </Grid.Row>
          <Grid.Row> <Header style={{paddingTop: 20}} as='h3'>Observed:</Header> {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(this.state.pin.DateObjectObserved)} 
          {" "} {new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', timeZone: 'HST' }).format(this.state.pin.DateObjectObserved)} HST </Grid.Row>
          <Grid.Row>{this.getType(this.state.pin.Animal)} {this.state.pin.BirdType || this.state.pin.TurtleType}</Grid.Row>
          <Grid.Row> <Header style={{paddingTop: 20}} as='h3'>Tag Number:</Header> {this.handleFields(this.state.pin.xTagNumber, "tag number")}</Grid.Row>
          <Grid.Row> <Header style={{paddingTop: 20}} as='h3'>Location:</Header> {this.handleFields(this.state.pin.LocationName, "location")}</Grid.Row>
          <Grid.Row>{this.handleExtraFields("Location Notes: ")} {this.state.pin.LocationNotes} </Grid.Row>
          <Grid.Row> <Header style={{paddingTop: 20}} as='h3'>Status:</Header> {this.handleFields(this.state.pin.Status, "status")}</Grid.Row>
          <Grid.Row> <Header style={{paddingTop: 20}} as='h3'>Size:</Header> {this.handleFields(this.state.pin.Size, "size")}</Grid.Row>
          <Grid.Row> <Header style={{paddingTop: 20}} as='h3'>Behavior:</Header> {this.handleFields(this.state.pin.xAnimalBehavior, "animal behavior")}</Grid.Row>
          <Grid.Row> <Header style={{paddingTop: 20}} as='h3'>Images</Header> {this.handleImage(this.state.pin.xImages)}</Grid.Row>
        </Grid.Column> :
         <Grid.Column width={4}>
         <Grid.Row> <Image src='/images/logo.jpg' size='medium' rounded /></Grid.Row>
         <Grid.Row> <Header style={{paddingTop: 20}} textAlign='center' as='h2'>Click on a pin to get started! </Header> </Grid.Row>
        </Grid.Column>
         }
        <Grid.Column width={12}>
          <Grid.Row style={{backgroundColor: '#02c0e8', paddingLeft: 20, paddingTop: 20, marginTop: -10, paddingBottom: 20}}>
        <Dropdown
            placeholder='Location'
            multiple
            search
            floating
            onChange={this.handleChange.bind(this)}
            options={this.reformatLocation().map(location =>({key: location, text:location, value: location }))}
            selection
          />
          </Grid.Row>
          <LoadScript
            googleMapsApiKey='AIzaSyDy4lATc_hd8VHpkRBfDYUgfD3pGNQtdXA'>
           <GoogleMap
              mapContainerStyle={mapStyles}
              zoom={7}
              center={defaultCenter}
            >
            {this.state.pin.map(report => {
              return <Marker onClick={() => {this.pinPressed(report); this.handleToggleOpen()}} strokeColor="#2383ab"position={{lat: report.xLatitude, lng:report.xLongitude}} key={report._id}>
     </Marker>
           })}
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
})(MapView);
