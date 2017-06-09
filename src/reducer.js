// import loop, { Effects } from 'redux-loop';

import atomicData from './atomic.json';

export const initialState = () => {
  return {
    data: [],
    matchingData: [],
    term: null
  }
};

// Actions
export const initializeApp = () => {
  return { type: 'INITIALIZE_APP' };
}

export const searchChanged = (term) => {
  return { type: 'SEARCH_CHANGED', term };
}

// Reducer
const reducer = (state = initialState(), action) => {
  switch(action.type) {
    case 'INITIALIZE_APP':
      const data = Object.keys(atomicData).map((className) => {
        const values = atomicData[className];
        const cssProps = Object.keys(values);

        const css = cssProps.map((cssProp) => {
          return {
            cssProp,
            cssValue: values[cssProp]
          }
        })

        return {
          className,
          css
        };
      });

      return { ...state, data };

    case 'SEARCH_CHANGED':
      const { term } = action;

      const matchingData = state.data.filter((item) => {
        return item.className.search(term) !== -1 ||
          item.css.map((cssData) => {
            return cssData.cssProp.search(term) !== -1;
          }).filter((item) => { return item }).length > 0;
      });

      return { ...state, term, matchingData };

    default:
      return state;
  };
};

export default reducer;
