import React, { Component } from 'react';
import DataContext from '../contexts/DataContext';
import '../public/main.css';
import  createSpeechRecognitionPonyfill  from 'web-speech-cognitive-services/lib/SpeechServices/SpeechToText';
const key1 = "ae3a0e0bd0d4445c93ffcc3fd4f8d3d7";
//const key2 = "f8e036097992477ab1786bcadf5e1e09";



class Form extends Component {
  constructor() {
    super();
    this.state = {
    category: '',
    backers: "",
    country: '',
    usd_goal_real: "",
    days_before_deadline: "",
    recognition: null
  };
  this.handleClick = this.handleClick.bind(this);
}
async componentDidMount() {
  console.log(this.props.context);
  const {SpeechRecognition} = await createSpeechRecognitionPonyfill({  region: 'westeurope',  subscriptionKey: key1});
  const recognition =  new SpeechRecognition();
  recognition.interimResults = true;
  recognition.lang = 'fr-FR';
  this.setState({recognition: recognition});
}

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

  handleClick = async (event) => {
    this.state.recognition.start();
    switch (event.target.id) {
      case "category":
        this.setState({ category: event.target.value });
        break;
      case "backers":
      this.state.recognition.onresult = ({ results }) => {
        this.setState({ backers: results[0][0].transcript });
      };
        break;
      case "country":
      this.state.recognition.onresult = ({ results }) => {
        this.setState({ country: results[0][0].transcript });
      };
      break;
      case "usd_goal_real":
      this.state.recognition.onresult = ({ results }) => {
        this.setState({ usd_goal_real: results[0][0].transcript });
      };
        break;
      case "days_before_deadline":
      this.state.recognition.onresult = ({ results }) => {
        this.setState({ days_before_deadline: results[0][0].transcript });
      };
      break;
      default:
        break;
    }
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
            <div className="form-style-9" >
              <ul>
                <li>
                  <select className="field-style field-split align-left" placeholder="Category" name="category" id="category" value={this.state.value} onChange={this.handleChange}>
                    {context.categories.map(elt =>
                      <option value={elt.category} key={elt.category}> {elt.category} </option>
                    )}
                  </select>
                  <select className="field-style field-split align-right" name="country" id="country" placeholder="Countries" value={this.state.value} onChange={this.handleChange} onClick={this.handleClick}>
                    {context.countries.map(elt =>
                      <option value={elt.country} key={elt.country}> {elt.country} </option>
                    )}
                  </select>
                </li>
                <li>
                  <input type="backers" className="field-style field-full align-none" placeholder="Backers" name="backers" id="backers" onChange={this.handleChange} onClick={this.handleClick} value={this.state.backers}/>
                </li>
                <li>
                  <input type="text" className="field-style field-full align-none" placeholder="Goals in USD" name="usd_goal_real" id="usd_goal_real" onChange={this.handleChange} onClick={this.handleClick} value={this.state.usd_goal_real}/>
                </li>
                <li>
                  <input type="text" className="field-style field-full align-none" placeholder="Days before deadline" name="days_before_deadline" id="days_before_deadline" onChange={this.handleChange} onClick={this.handleClick} value={this.state.days_before_deadline}/>
                </li>
                <li>
                  <button
                    onClick={() => this.onSubmit(context)}
                    value="Submit"
                    className="submit"
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
