import React from 'react';

export const graphMenu = false;
export const formMenu = true;

const MenuContext = React.createContext({
  graphMenu: graphMenu,
  formMenu: formMenu,
  handleMenuChange: () => {}
});

export default MenuContext;