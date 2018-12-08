import React from 'react';

const FormContext = React.createContext({
  result: "",
  countries: "",
  categories: "",
  onSubmit: () => {}
});

export default FormContext;