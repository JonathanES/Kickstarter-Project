import React, { Component } from 'react';
import DataContext from '../contexts/DataContext';
import '../public/main.css';


class Form extends Component {
  state = {
    category: '',
    backers: 0,
    country: '',
    usd_goal_real: 0,
    days_before_deadline: 0,
    countries: [],
    categories: []
  };

  onSubmit = (context) => {
    let data = {
      category: this.state.category,
      backers: this.state.backers,
      country: this.state.country,
      usd_goal_real: this.state.usd_goal_real,
      days_before_deadline: this.state.days_before_deadline
    }

    fetch("/api/form", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then(async response => {
      response = await response.json();
      context.onSubmit(response.data);
    }).catch(err => {
      console.log(err);
    })
  }

  handleChange = (event) => {
    switch (event.target.id) {
      case "category":
        this.setState({ category: event.target.value });
        break;
      case "backers":
        this.setState({ backers: event.target.value });
        break;
      case "country":
        this.setState({ country: event.target.value });
        break;
      case "usd_goal_real":
        this.setState({ usd_goal_real: event.target.value });
        break;
      case "days_before_deadline":
        this.setState({ days_before_deadline: event.target.value });
        break;
      default:
        break;
    }
  }
  render() {
    return (
          <DataContext.Consumer>
            {context => (
              <div >
                <div class="form-style-9" >
                  <ul>
                    <li>
                    <select class="field-style field-split align-left" placeholder="Category" name="category" id="category" value={this.state.value} onChange={this.handleChange}>
                    {context.categories.map(elt =>
                      <option value={elt.category} > {elt.category} </option>
                    )}
                  </select>
                  <select class="field-style field-split align-right" name="country" id="country" placeholder="Countries" value={this.state.value} onChange={this.handleChange}>
                    {context.countries.map(elt =>
                      <option value={elt.country} > {elt.country} </option>
                    )}
                  </select>
                    </li>
                    <li>
                    <input type="backers" class="field-style field-full align-none" placeholder="Backers" name="backers" id="backers" onChange={this.handleChange} />
                    </li>
                    <li>
                      <input type="text" class="field-style field-full align-none" placeholder="Goals in USD" name="usd_goal_real" id="usd_goal_real" onChange={this.handleChange} />
                    </li>
                    <li>
                    <input  type="text" class="field-style field-full align-none" placeholder="Days before deadline" name="days_before_deadline" id="days_before_deadline" onChange={this.handleChange} />
                    </li>
                    <li>
                    <button
                  onClick={() => this.onSubmit(context)}
                  value="Submit"
                  class="submit"
                >
                  Submit
      </button>
                    </li>
                  </ul>
                </div>              
                
              </div>
            )}
          </DataContext.Consumer>
    )
  }
}

export default Form;
