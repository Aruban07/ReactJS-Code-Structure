import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

// eslint-disable-next-line react/prop-types
const PrivateRoute = (ComposedComponent) => ({ isLoggedIn, ...props }) => {
  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <ComposedComponent {...props} />
  );
};

const mapStateToProps = ({ auth }) => ({
  isLoggedIn: !!auth?.token,
});

export default compose(connect(mapStateToProps), PrivateRoute);
