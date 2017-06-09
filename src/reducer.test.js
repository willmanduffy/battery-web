import reducer, {
  initializeApp,
  initialState,
  searchChanged
} from './reducer';

const atomicData = {
  'cool-class-name': {
    'padding-top': '0rem'
  },
  'sick-class-name': {
    'padding-top': '1rem',
    'padding-bottom': '2rem'
  }
};

const coolClass = {
  className: 'cool-class-name',
  css: [
    {
      cssProp: 'padding-top',
      cssValue: '0rem'
    }
  ]
};

const sickClass = {
  className: 'sick-class-name',
  css: [
    {
      cssProp: 'padding-top',
      cssValue: '1rem'
    },
    {
      cssProp: 'padding-bottom',
      cssValue: '2rem'
    }
  ]
}

const data = [coolClass, sickClass];

describe('initializeApp', () => {
  describe('when atomic data is present', () => {
    it('updates the state to contain the new data', () => {
      const expectation = {
        data,
        matchingData: data,
        term: null
      };

      const subject = reducer(initialState(), initializeApp(atomicData));

      expect(subject).toEqual(expectation);
    });
  });

  describe('when no data is supplied', () => {
    const subject = reducer(initialState(), initializeApp(undefined));

    expect(subject).toEqual(initialState());
  });
});

describe('searchChanged', () => {
  const state = { ...initialState(), data };

  describe('when there is matching data via className', () => {
    it('matches that CSS', () => {
      const expectation = {
        data,
        matchingData: [coolClass],
        term: 'cool'
      };

      const subject = reducer(state, searchChanged('cool'));

      expect(subject).toEqual(expectation);
    });
  });

  describe('when there is matching data via cssProp', () => {
    it('matches that CSS', () => {
      const expectation = {
        data,
        matchingData: [sickClass],
        term: 'padding-bottom'
      };

      const subject = reducer(state, searchChanged('padding-bottom'));

      expect(subject).toEqual(expectation);
    });
  });

  describe('when there is no matching data', () => {
    it('returns an empty array', () => {
      const expectation = {
        data,
        matchingData: [],
        term: 'bullshit'
      };

      const subject = reducer(state, searchChanged('bullshit'));

      expect(subject).toEqual(expectation);
    });
  });
});