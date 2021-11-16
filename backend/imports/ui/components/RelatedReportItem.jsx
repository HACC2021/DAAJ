import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class RelatedReportItem extends React.Component {
  findFunction(relatedID, animal, mode) {
    if (mode === 1) {
      if (animal === "Seal") {
        Meteor.call('updateMatchingSeals', relatedID)
      }
      if (animal === "Bird") {
        Meteor.call('updateMatchingBirds', relatedID)
      }
      if (animal === "Turtle") {
        Meteor.call('updateMatchingTurtles', relatedID)
      }
      if (animal === "Other") {
        Meteor.call('updateMatchingOthers', relatedID)
      }
    }
    else if (mode === 0) {
      if (animal === "Seal"){
        Meteor.call('reverseMatchingSeals', relatedID)
      }
      if (animal === "Bird") {
        Meteor.call('reverseMatchingBirds', relatedID)
      }
      if (animal === "Turtle") {
        Meteor.call('reverseMatchingTurtles', relatedID)
      }
      if (animal === "Other") {
        Meteor.call('reverseMatchingOthers', relatedID)
      }
  
    }

  }

  render() {
    if (this.props.report.color === true){
      return (        
        <Table.Row positive>
          <Table.Cell>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(this.props.report.DateObjectObserved)}</Table.Cell>
          <Table.Cell>{new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', timeZone: 'HST' }).format(this.props.report.DateObjectObserved)}</Table.Cell>
          <Table.Cell className="center aligned">{this.props.report.type}</Table.Cell>
          <Table.Cell className="center aligned">{this.props.report.Sector}</Table.Cell>
          <Table.Cell>{this.props.report.LocationName}</Table.Cell>
          <Table.Cell>{this.props.report.Size}</Table.Cell>
          <Table.Cell className="center aligned">{this.props.report.MainIdentification}</Table.Cell>
          <Table.Cell>{this.props.report.xAnimalBehavior}</Table.Cell>
          <Table.Cell className="center aligned">{this.props.report.xTagYN}</Table.Cell>
          <Table.Cell className="center aligned">{this.props.report.xBandYN}</Table.Cell>
          <Table.Cell className="center aligned">{this.props.report.xBleachMarkYN}</Table.Cell>
          <Table.Cell className="center aligned">{this.props.report.xScarsYN}</Table.Cell>
          <Table.Cell><Button.Group>
            <Button positive value={this.props.report.xRelated} onClick={e => this.findFunction(this.props.report.xRelated, this.props.report.type, 1)}>
            Confirm</Button>
            <Button.Or />
            <Button negative value={this.props.report.xRelated} onClick={e => this.findFunction(this.props.report.xRelated, this.props.report.type, 0)}>
            Deny</Button>
          </Button.Group></Table.Cell>
        </Table.Row> 
      );
    } else {
      return (
        <Table.Row warning>
          <Table.Cell>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(this.props.report.DateObjectObserved)}</Table.Cell>
          <Table.Cell>{new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', timeZone: 'HST' }).format(this.props.report.DateObjectObserved)}</Table.Cell>
          <Table.Cell className="center aligned">{this.props.report.type}</Table.Cell>
          <Table.Cell className="center aligned">{this.props.report.Sector}</Table.Cell>
          <Table.Cell>{this.props.report.LocationName}</Table.Cell>
          <Table.Cell>{this.props.report.Size}</Table.Cell>
          <Table.Cell className="center aligned">{this.props.report.MainIdentification}</Table.Cell>
          <Table.Cell>{this.props.report.xAnimalBehavior}</Table.Cell>
          <Table.Cell className="center aligned">{this.props.report.xTagYN}</Table.Cell>
          <Table.Cell className="center aligned">{this.props.report.xBandYN}</Table.Cell>
          <Table.Cell className="center aligned">{this.props.report.xBleachMarkYN}</Table.Cell>
          <Table.Cell className="center aligned">{this.props.report.xScarsYN}</Table.Cell>
          <Table.Cell><Button.Group>
            <Button positive value={this.props.report.xRelated} onClick={e => this.findFunction(this.props.report.xRelated, this.props.report.type, 1)}>
            Confirm</Button>
            <Button.Or />
            <Button negative value={this.props.report.xRelated} onClick={e => this.findFunction(this.props.report.xRelated, this.props.report.type, 0)}>
            Deny</Button>
          </Button.Group></Table.Cell>
        </Table.Row>
      );
  
    }
  }
}

// Require a document to be passed to this component.
RelatedReportItem.propTypes = {
  report: PropTypes.shape({
    DateObjectObserved: PropTypes.instanceOf(Date),
    type: PropTypes.string,
    Sector: PropTypes.string,
    LocationName: PropTypes.string,
    Size: PropTypes.string,
    MainIdentification: PropTypes.string,
    xAnimalBehavior: PropTypes.string,
    // xChecked: PropTypes.number,
    //ObserverPhone: PropTypes.string,
    _id: PropTypes.string,
    color: PropTypes.bool,
    xRelated: PropTypes.string,
    xTagYN: PropTypes.string,
    xBandYN: PropTypes.string,
    xBleachMarkYN: PropTypes.string,
    xScarsYN: PropTypes.string,
    xSightings: PropTypes.number,
    xConfirmRelated: PropTypes.number,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(RelatedReportItem);
