import React from 'react';
import DebounceInput from 'react-debounce-input';

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
        <p key={`${datum.className}-${cssItem.cssProp}`} className='pl3'>{cssItem.cssProp}: {cssItem.cssValue}</p>
      );
    });

    return(
      <li className={`p2 lh2 ${backgroundStyle}`} key={index}>
        <div className='lh2'>
          <span>{`.${datum.className} `}</span>
          <span>{`{`}</span>
        </div>
        <div className='lh2'>{attributes}</div>
        <div className='lh2'>{`}`}</div>
      </li>
    )
  });

  return(
    <div className="bg-grey-200 mh100vh pt6 border-box">
      <div className='w80p mx-auto p4 bg-white shadow-2 rounded'>
        <h2 className="light fz-48 mt0 mb3">Atomic Classes</h2>
        <DebounceInput
          minLength={1}
          debounceTimeout={300}
          onChange={event => dispatch(searchChanged(event.target.value))}
          className='w100p p2 border-box rounded border border-grey-400 outline-none fz-16'
        />

        <ul className='pl0 list-none type-mono'>
          {results}
        </ul>
      </div>
    </div>
  );
};

export default App;
