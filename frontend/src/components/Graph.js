import React, { Component } from 'react';
import DataContext from '../contexts/DataContext';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import '../public/main.css';
class Graph extends Component {
    state = {
        category: true,
        country: false
      };
    handleChange = (event) => {
        switch (event.target.id) {
            case "category":
              this.setState({ category: true, country: false });
              break;
            case "country":
              this.setState({ country: true, category: false });
              break;
            default:
              break;
        }
    }
    render() {
        return (
              <DataContext.Consumer>
                {context => (
                  
                  <div id="container"> 
        <input type="radio" id="category"
                      checked={this.state.category} 
                      onChange={this.handleChange} />
        Category
        <input type="radio" id="country"
                      checked={this.state.country} 
                      onChange={this.handleChange} />
        Country
                       <ResponsiveContainer width="100%" height="100%">
    	<BarChart data={this.state.category ? context.categories : context.countries}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
         <CartesianGrid strokeDasharray="3 3"/>
         <XAxis dataKey={this.state.category ? "category" : "country"} tick={{fontSize: 10}} allowDataOverflow={true} domain={['auto', 'auto']}/>
         <YAxis tick={{fontSize: 15}}/>
         <Tooltip/>
         <Legend />
         <Bar dataKey="stat" fill="#8884d8" />
      </BarChart>
      </ResponsiveContainer>
                   </div>
                )}
            </DataContext.Consumer>
        )}
}

export default Graph;