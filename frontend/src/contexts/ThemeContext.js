import React from 'react';

export const themes = {
  dark: {
    contrastColor: '#333',
    textColor: 'white',
    linkColor: '#53C6FF'
  }
};

const ThemeContext = React.createContext({
  theme: themes.dark,
});

export default ThemeContext;