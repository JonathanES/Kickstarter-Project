import React, { Component } from 'react';
import DataContext from './contexts/DataContext';
import MainLayout from './layouts/MainLayout';
import Menu from './components/Menu';
import MenuContext, { formMenu, graphMenu } from './contexts/MenuContext';
const Form = React.lazy(() => import('./components/Form'));
const Graph = React.lazy(() => import('./components/Graph'));

class App extends Component {
  constructor() {
    super();
    this.state = {
      result: {},
      countries: this.countries,
      categories: this.categories,
      onSubmit: this.onSubmit,
      handleMenuChange: this.handleMenuChange,
      formMenu: formMenu,
      graphMenu: graphMenu,
      badInput: false,
    };
    this.setBadInput = this.setBadInput.bind(this);
    this.setGoodInput = this.setGoodInput.bind(this);
  }

  async componentDidMount() {
    let result = await fetch("/api/graph/country");
    let response = await result.json();
    this.setState({ countries: response.data });
    result = await fetch("/api/graph/category");
    response = await result.json();
    this.setState({ categories: response.data });
  };
  onSubmit = (result) => {
    this.setState({
      result: result
    })
  }
  handleMenuChange = (form, graph) => {
    this.setState({
      formMenu: form,
      graphMenu: graph
    })
  }

  setGoodInput() {
    this.setState({ badInput: false })
  }

  setBadInput() {
    this.setState({ badInput: true })
  }

  render() {
    return (
      <DataContext.Provider value={{ countries: this.state.countries, categories: this.state.categories, onSubmit: this.onSubmit }}>
        <MenuContext.Provider value={{ graphMenu: this.state.graphMenu, formMenu: this.state.formMenu, handleMenuChange: this.handleMenuChange }}>
          <Menu></Menu>
          <MainLayout>
            <React.Suspense fallback="Loading...">
              {
                this.state.categories && this.state.countries && this.state.graphMenu &&
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>

                  <Graph />
                </div>
              }
              {
                this.state.categories && this.state.countries && this.state.formMenu &&
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <Form onGoodInput={() => this.setGoodInput()} onBadInput={() => this.setBadInput()} />
                </div>
              }
            </React.Suspense >

            {this.state.formMenu && !this.state.badInput && this.state.result.value !== undefined && <label htmlFor={this.state.result} style={{ color: '#17445E' }}>
              <div>
                Accuracy : {(parseFloat(this.state.result.accuracy) * 100).toFixed(4)} %
              </div>
              <div>
                Result : {this.state.result.value}
              </div>
            </label>}
            {this.state.badInput && this.state.formMenu &&
              <div>
                BAD INPUT
            </div>}
          </MainLayout>
        </MenuContext.Provider>
      </DataContext.Provider>
    );
  }
}

export default App;

