import React from 'react';

import reducer, {
  searchChanged
} from './reducer';

import './atoms.css';

const App = ({ state, dispatch }) => {
  const matchingData = state.matchingData;

  const results = matchingData.map((datum) => {
    return(
      <li key={datum.className}>
        <p>{`${datum.className} {`}</p>
        <p className='pl1'>{datum.cssProp}: {datum.cssValue}</p>
        <p>{`}`}</p>
      </li>
    )
  });

  return(
    <div>
      <input
        onChange={event => dispatch(searchChanged(event.target.value))}
        className='w100p p2'
      />

      <ul className='list-none'>
        {results}
      </ul>
    </div>
  );
};

export default App;
