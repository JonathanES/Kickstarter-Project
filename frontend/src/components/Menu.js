import React, { Component } from 'react';
import MenuContext from '../contexts/MenuContext';
import '../public/main.css';


class Menu extends Component {
    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(id, context) {
        switch (id) {
          case "form" || "logo":
            context.handleMenuChange(true, false);
            break;
          case "graph":
            context.handleMenuChange(false, true);
            break;
          default:
            break;
        }
    }
    
      render() {
          return (
            <MenuContext.Consumer>
            {context => (
        <div>
        <div className="header">
          <nav>
            <div id="menuToggle">
              <input type="checkbox" />
              <span></span>
              <span></span>
              <span></span>
              <ul id="menu">
                <a href="/" onClick={(e) => this.handleClick("form", context)} id="form">Form</a>
                <a href="" onClick={(e) => this.handleClick("graph", context)} id="graph">Graph </a>
              </ul>
            </div>
          </nav>
          <img id="logo" src={require("../public/Kickstarter_logo.svg.png")} alt="logo" onClick={(e) => this.handleClick("logo", e)} />
          <div className="links">
          <a onClick={(e) => this.handleClick("form", context)} id="form" >Test your project</a>
          <a onClick={(e) => this.handleClick("graph", context)} id="graph">Statistics </a>
          </div>
        </div>
        <div>
       </div>
      </div>
            )}
</MenuContext.Consumer>
          )};
}
export default Menu;