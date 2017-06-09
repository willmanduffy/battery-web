export const initialState = () => {
  return {
    data: [],
    matchingData: [],
    term: null
  }
};

// Actions
export const initializeApp = (atomicData) => {
  return { type: 'INITIALIZE_APP', atomicData };
}

export const searchChanged = (term) => {
  return { type: 'SEARCH_CHANGED', term };
}

// Reducer
const reducer = (state = initialState(), action) => {
  switch(action.type) {
    case 'INITIALIZE_APP':
      const { atomicData } = action;

      if (atomicData) {
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

        return { ...state, data, matchingData: data };
      } else {
        return state;
      }


    case 'SEARCH_CHANGED':
      const { term } = action;

      // Decide search results from term
      const matchingData = state.data.filter((item) => {
        return item.className.search(term) !== -1 ||
          item.css.map((cssData) => {
            return cssData.cssProp.search(term) !== -1 ||
              cssData.cssValue.toString().search(term) !== -1;;
          }).filter((item) => { return item }).length > 0;
      });

      return { ...state, term, matchingData };

    default:
      return state;
  };
};

export default reducer;
