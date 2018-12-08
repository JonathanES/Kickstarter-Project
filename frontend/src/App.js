import React, { Component } from 'react';
import FormContext  from './contexts/FormContext'
import MainLayout from './layouts/MainLayout';
import Form from './components/Form';
import Graph from './components/Graph';

class App extends Component {
  state = {
    result: "",
    countries: this.countries,
    categories: this.categories,
    onSubmit: this.onSubmit
  };
  componentDidMount(){

  }
  onSubmit = (result) => {
    this.setState({
      result: result
    })
}  
  render() {
    return (
      <FormContext.Provider value={{countries: this.state.countries, categories: this.state.categories, onSubmit: this.onSubmit}}>
        <MainLayout>
          {/*<Graph></Graph>*/}
          <Form></Form>
          <label htmlFor={this.state.result} style={{ color: 'white' }}>
          {this.state.result}
        </label>
        </MainLayout>
        </FormContext.Provider>
    );
  }
}

export default App;

