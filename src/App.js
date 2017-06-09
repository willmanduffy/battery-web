import React from 'react';

import reducer, {
  searchChanged
} from './reducer';

import './atoms.css';

const App = ({ state, dispatch }) => {
  const matchingData = state.matchingData;

  const results = matchingData.map((datum, index) => {
    const backgroundStyle = index % 2 ? 'bg-grey-200' : '';

    const attributes = datum.css.map((cssItem) => {
      return (
        <p className='pl1'>{cssItem.cssProp}: {cssItem.cssValue}</p>
      );
    });

    return(
      <li className={`p2 ${backgroundStyle}`} key={datum.className}>
        <p>{`${datum.className} {`}</p>
        {attributes}
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

      <ul className='pl0 list-none'>
        {results}
      </ul>
    </div>
  );
};

export default App;
