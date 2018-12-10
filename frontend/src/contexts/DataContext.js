import React from 'react';

const DataContext = React.createContext({
  result: "",
  countries: {country: []},
  categories: {category: []},
  onSubmit: () => {}
});

export default DataContext;