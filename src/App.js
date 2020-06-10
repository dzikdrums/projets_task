import './styles.css';

import React, { useEffect } from 'react';
import {
  editItemRequest,
  getPeople,
  getRequest,
  loadFromExternalServerRequest,
  loadFromLocalServerRequest,
  removeItemRequest,
} from './redux/peopleRedux';

import Table from './Table';
import { connect } from 'react-redux';

const App = ({
  people,
  request,
  loadFromLocalServerRequest,
  loadFromExternalServerRequest,
  removeItemRequest,
  editItemRequest,
}) => {
  useEffect(() => {
    loadFromLocalServerRequest();
  }, [loadFromLocalServerRequest]);

  const editItem = (editedItem) => {
    editItemRequest(editedItem);
  };

  const removeItem = (id) => {
    removeItemRequest(id);
  };

  if (request.success === true && people.length === 0) {
    loadFromExternalServerRequest();
  }

  return (
    <>
      <Table
        request={request}
        data={people}
        removeItem={removeItem}
        editItem={editItem}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  people: getPeople(state),
  request: getRequest(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadFromLocalServerRequest: () => dispatch(loadFromLocalServerRequest()),
  removeItemRequest: (id) => dispatch(removeItemRequest(id)),
  editItemRequest: (id) => dispatch(editItemRequest(id)),
  loadFromExternalServerRequest: () =>
    dispatch(loadFromExternalServerRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
