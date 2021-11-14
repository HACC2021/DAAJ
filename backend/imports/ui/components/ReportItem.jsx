import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ReportItem extends React.Component {
  findCheck(animalId, animal) {
    if (animal === "Seal") {
      Meteor.call('checkSealReport', animalId)
    }
    if (animal === "Bird") {
      Meteor.call('checkBirdReport', animalId)
    }
    if (animal === "Turtle") {
      Meteor.call('checkTurtleReport', animalId)
    }
    if (animal === "Other") {
      Meteor.call('checkOtherReport', animalId)
    }
  }

  render() {
    return (
      <Table.Row>
        <Table.Cell>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(this.props.report.DateObjectObserved)}</Table.Cell>
        <Table.Cell>{new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', timeZone: 'HST' }).format(this.props.report.DateObjectObserved)}</Table.Cell>
        <Table.Cell>{this.props.report.Animal}</Table.Cell>
        <Table.Cell>{this.props.report.Sector}</Table.Cell>
        <Table.Cell>{this.props.report.Island || this.props.report.xIsland}</Table.Cell>
        <Table.Cell>{this.props.report.Size}</Table.Cell>
        <Table.Cell>{this.props.report.MainIdentification}</Table.Cell>
        <Table.Cell>{this.props.report.xAnimalBehavior}</Table.Cell>
        <Table.Cell>{this.props.report.xSightings}</Table.Cell>
        <Table.Cell>{this.props.report.ObserverPhone}</Table.Cell>
        {this.props.report.xChecked === 1 ? <Table.Cell><button class="ui disabled button" disabled="" tabindex="-1">Closed</button></Table.Cell>
         : <Table.Cell><Button positive value={this.props.report.xChecked} onClick={e => this.findCheck(this.props.report._id, this.props.report.type)}>Close</Button>
</Table.Cell>}
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
ReportItem.propTypes = {
  report: PropTypes.shape({
    DateObjectObserved: PropTypes.instanceOf(Date),
    type: PropTypes.string,
    Sector: PropTypes.string,
    Island: PropTypes.string,
    LocationName: PropTypes.string,
    Size: PropTypes.string,
    MainIdentification: PropTypes.string,
    xAnimalBehavior: PropTypes.string,
    xSightings: PropTypes.number,
    xChecked: PropTypes.number,
    ObserverPhone: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ReportItem);
