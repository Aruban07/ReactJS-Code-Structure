import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userLast } from '../redux/actions/actions-user';

const PageNotFound = () => {
  const { name } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <div>
      This is PageNotFound page
      {name}
      <button type="button" onClick={() => dispatch(userLast({ lastname: 'a' }))}>add</button>
    </div>
  );
};

export default PageNotFound;
