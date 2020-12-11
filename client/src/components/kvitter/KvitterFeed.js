import React, { Fragment, useEffect, useState } from 'react';
import { getAllKvitter } from '../../services/kvitter';
import Kvitter from './Kvitter';

const Tweets = () => {
  const [state, setState] = useState({
    kvitter: [],
    error: null,
    loading: true
  });

  useEffect(() => {
    (async () => {
      const kvitter = await getAllKvitter();
      setState(state => ({
        ...state,
        error: kvitter.error,
        kvitter: kvitter.data,
        loading: false
      }));
    })();
  }, []);

  return (
    <Fragment>
      <h2>Kvitter feed</h2>
      <h4>Se det ferskeste kvitter her...</h4>
      <div className='kvitter-container'>
        <Kvitter data={state.kvitter} />
      </div>
    </Fragment>
  );
};

export default Tweets;