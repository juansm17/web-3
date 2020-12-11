import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Navebar = () => {
  return (
    <Fragment>
      <h1>Kvitter</h1>
      <ul>
        <li><Link to='/'>Forside</Link></li>
        <li><Link to='/kvitter'>Kvitter feed</Link></li>
        <li><Link to='profil'>Profil</Link></li>
      </ul>
    </Fragment>
  );
};

export default Navebar;
