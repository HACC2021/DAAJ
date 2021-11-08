import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class RelatedReportItem extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(this.props.report.DateObjectObserved)}</Table.Cell>
        <Table.Cell>{new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', timeZone: 'HST' }).format(this.props.report.DateObjectObserved)}</Table.Cell>
        <Table.Cell>{this.props.report.type}</Table.Cell>
        <Table.Cell>{this.props.report.Sector}</Table.Cell>
        <Table.Cell>{this.props.report.LocationName}</Table.Cell>
        <Table.Cell>{this.props.report.Size}</Table.Cell>
        <Table.Cell>{this.props.report.MainIdentification}</Table.Cell>
        <Table.Cell>{this.props.report.xAnimalBehavior}</Table.Cell>
        <Table.Cell>{this.props.report.xTagYN}</Table.Cell>
        <Table.Cell>{this.props.report.xBandYN}</Table.Cell>
        <Table.Cell>{this.props.report.xBleachMarkYN}</Table.Cell>
        <Table.Cell>{this.props.report.xScarsYN}</Table.Cell>
        {/*this.props.report.xChecked === 1 ? <Table.Cell>Yes</Table.Cell> : <Table.Cell>No</Table.Cell>*/}
        <Table.Cell>{this.props.report.xSightings}</Table.Cell>
        <Table.Cell>{this.props.report.xRelated}</Table.Cell>
      </Table.Row>
    );
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

    xRelated: PropTypes.string,
    xTagYN: PropTypes.string,
    xBandYN: PropTypes.string,
    xBleachMarkYN: PropTypes.string,
    xScarsYN: PropTypes.string,
    xSightings: PropTypes.string,
    xConfirmRelated: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(RelatedReportItem);
