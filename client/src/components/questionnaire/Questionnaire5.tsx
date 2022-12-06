import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import axios, { AxiosRequestConfig } from "axios";
import { Auth } from "../../features/authSlice";
import { RootState } from "../../app/store";
import { useNavigate } from 'react-router';

export interface QuestionnaireState {
  answers: QuestionnaireOutput,
  // Slider Info
  sum?: number | string,
  sliderSum?: number,
  step?: number,
  questionnaireDone?: boolean,
  auth?: Auth,
  authState?: RootState
}

export interface QuestionnaireProps {
  answers: QuestionnaireOutput,
  auth?: Auth,
  authState?: RootState
}

export interface QuestionnaireOutput {
  moneyInvested?: number,
  riskThreshold?: number,
  termPeriod?: string,
  investPrev?: boolean,
  industries?: string[]
}


const options = [
  { key: 'oil', text: 'Oil and Gas', value: 'oil' },
  { key: 'food', text: 'Food and Beverages', value: 'food' },
  { key: 'pharm', text: 'Pharmaceutical', value: 'pharm' },
  { key: 'realEstate', text: 'Real Estate', value: 'realEstate' },
  { key: 'tech', text: 'Technology', value: 'tech' },
  { key: 'services', text: 'Services', value: 'services' },
  { key: 'util', text: 'Utilities', value: 'util' },
  { key: 'machinery', text: 'Machinery', value: 'machinery' },
  { key: 'retail', text: 'Retail', value: 'retail' },
  { key: 'metals', text: 'Metals', value: 'metals' },
  { key: 'accessories', text: 'Accessories', value: 'accessories' },
  { key: 'travel', text: 'Travel', value: 'travel' },
  { key: 'insurance', text: 'Insurance', value: 'insurance' },
  { key: 'banks', text: 'Banks, Business, and Finance', value: 'banks' },
]

class Questionnaire5 extends React.Component<QuestionnaireProps, QuestionnaireState> {
  constructor(props: QuestionnaireProps) {
    super(props);
    this.state.answers = props.answers;
    this.state.auth = this.props.auth;
    console.log(this.props.auth?.user);
    console.log(this.state.auth?.isAuthenticated);
  }
  state: QuestionnaireState = {
    answers: {},
    questionnaireDone: false
  };

  UpdateIndustries = (newIndustries: string[]) => {
    return this.setState({
      answers: {
        industries: newIndustries
      }
    })
  }

  DropdownMultipleSelection = () => (
    <Dropdown
      placeholder='Skills'
      fluid
      multiple
      selection
      options={options}
      onChange={(e, data) => { this.UpdateIndustries(data.value as string[]) }}
    />
  )

  submitClick = async () => {
    // Make request
    // await sendQuestionnaire(this.state.answers)
    //send user to new page
    if (this.state.auth?.isAuthenticated) {
      const config: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${this.state.auth.token}`
        }
      };
      // TODO: this.state.answers doesn't work
      const body = JSON.stringify({ answers: this.state.answers })
      axios.post('/api/questionnaire', body, config)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  render() {
    return (
      <div className="App">
        <label htmlFor="sliderinput" >
          <h4>5. Which industry of stocks are you interested in investing in?</h4>
        </label>
        {this.DropdownMultipleSelection()}
        <a>
          <input type="submit" onClick={this.submitClick} value="Submit" />
        </a>

      </div>
    )
  }
}


export default Questionnaire5