import React from 'react';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { GoogleMap, InfoWindow, Marker, LoadScript } from '@react-google-maps/api';
import ReportItem from '../components/ReportItem';
import { Container, Grid, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';
import { Turtles } from '../../api/turtle/Turtle';
import { Birds } from '../../api/bird/Bird';
import { Seals } from '../../api/seal/Seal';
import { Others } from '../../api/other/Other';

const mapStyles = {
  marginTop: "-10px",
  height: "100vh",
  width: "100%"};

const defaultCenter = {
  lat: 20.3069, lng: -157.5583
}
class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pin: {},
      pinPressed: false,
      isOpen: false
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
  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    let fRef = null;

    return (
      <Grid>
        {this.state.pinPressed ? 
        <Grid.Column width={4}>
          <Grid.Row> <Header as='h1'>{this.state.pin.Animal}</Header> </Grid.Row>
          <Grid.Row> <Header as='h3'>Observed: {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(this.state.pin.DateObjectObserved)} 
          {" "} {new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', timeZone: 'HST' }).format(this.state.pin.DateObjectObserved)} HST </Header> </Grid.Row>
          <Grid.Row> <Header as='h3'>Location: {this.state.pin.LocationName}</Header> </Grid.Row>
          <Grid.Row> <Header as='h3'>Status: {this.state.pin.status}</Header> </Grid.Row>
        </Grid.Column> :
         <Grid.Column width={4}>
         <Grid.Row> <Header as='h1'>Click on pin to get started! </Header> </Grid.Row>
        </Grid.Column>
         }
        <Grid.Column width={12}>
          <LoadScript
            googleMapsApiKey='AIzaSyDy4lATc_hd8VHpkRBfDYUgfD3pGNQtdXA'>
           <GoogleMap
              mapContainerStyle={mapStyles}
              zoom={7}
              center={defaultCenter}
            >
            {this.getReports().map(report => {
              return <Marker onClick={() => {this.pinPressed(report); this.handleToggleOpen()}} position={{lat: report.xLatitude, lng:report.xLongitude}} key={report._id}>
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
