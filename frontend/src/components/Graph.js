import React, { Component } from 'react';
import DataContext from '../contexts/DataContext';
import DefaultTooltipContent from 'recharts/lib/component/DefaultTooltipContent';
import { Paper, Typography } from '@material-ui/core';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Label, ResponsiveContainer } from 'recharts';
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
    /*
            <input type="radio" id="category"
              checked={this.state.category}
              onChange={this.handleChange} />
            Category
            <input type="radio" id="country"
                  checked={this.state.country}
                  onChange={this.handleChange}
            />
              Country
    */
    const CustomTooltip = props => {
      if (props.payload[0] != null) {

        const newPayload = [
          {
            name: 'Number of projects',
            value: props.payload[0].payload.totalNumber,
          },
          ...props.payload,
        ];

        return <DefaultTooltipContent {...props} payload={newPayload} />;
      }
      return <DefaultTooltipContent {...props} />;
    }

    return (
      <DataContext.Consumer>
        {context => (
          <div id="container" >
            <div style={{ marginBottom: '30px', padding: '30px' }}>
              <Paper elevation={1}>
                <Typography variant="h5" component="h3">
                  Startup projects success average by country.
                </Typography>
              </Paper>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={context.countries}
                margin={{ top: 0, right: 30, left: 30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={"country"} allowDataOverflow={true} domain={['auto', 'auto']} >
                </XAxis>
                <YAxis tick={{ fontSize: 15 }}>
                  <Label value="Accuracy" angle={-90} position="insideLeft" textAnchor="middle" />
                </YAxis>
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="stat" fill="#0F2105" />
              </BarChart>
            </ResponsiveContainer>
            <div style={{ marginBottom: '30px', padding: '30px' }}>
              <Paper elevation={1}>
                <Typography variant="h5" component="h3">
                  Startup projects success average by category.
                </Typography>
              </Paper>
            </div>

            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={context.categories}
                margin={{ top: 0, right: 30, left: 30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis tick={{fontSize: '10px'}} dataKey={"category"} allowDataOverflow={true} domain={['auto', 'auto']} >
                </XAxis>
                <YAxis tick={{ fontSize: 15 }}>
                  <Label value="Accuracy" angle={-90} position="insideLeft" textAnchor="middle" />
                </YAxis>
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="stat" fill="#31c110" />
              </BarChart>
            </ResponsiveContainer>

          </div>
        )}
      </DataContext.Consumer>
    )
  }
}

export default Graph;