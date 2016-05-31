import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { loadEntries } from '../actions/entries';
import EntryListing from '../components/EntryListing';

class DashboardPage extends React.Component {
  componentDidMount() {
    const { collection, dispatch } = this.props;

    if (collection) {
      dispatch(loadEntries(collection));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { collection, dispatch } = this.props;
    if (nextProps.collection !== collection) {
      dispatch(loadEntries(nextProps.collection));
    }
  }

  render() {
    const { collections, collection } = this.props;

    if (collections == null) {
      return <h1>No collections defined in your config.yml</h1>;
    }

    const entries = collection.get('entries');

    return <div>
      <h1>Dashboard</h1>
      <div>
        {collections.map((collection) => (
          <div key={collection.get('name')}>
            <Link to={`/collections/${collection.get('name')}`}>{collection.get('name')}</Link>
          </div>
        )).toArray()}
      </div>
      <div>
        {entries ? <EntryListing collection={collection} entries={entries}/> : 'No entries...'}
      </div>
    </div>;
  }
}

function mapStateToProps(state, ownProps) {
  const { collections } = state;
  const { name, slug } = ownProps.params;
  const collection = name ? collections.get(name) : collections.first();

  return {slug, collection, collections};
}

export default connect(mapStateToProps)(DashboardPage);
