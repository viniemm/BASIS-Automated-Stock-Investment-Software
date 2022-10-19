import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import { QuestionnaireState, QuestionnaireProps } from "../../types/QuestionnaireTypes";
import { Dashboard } from '../../pages';

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
    state:QuestionnaireState = {
        answers: {},
        questionnaireDone: false 
      };
      DropdownMultipleSelection = () => (
        <Dropdown
          placeholder='Skills'
          fluid
          multiple
          selection
          options={options}
          onChange={(e,data) => {this.state.answers.industries=data.value as string[]}}
        />
      )
      constructor(props:QuestionnaireProps) {
        super(props)
        this.state.answers = props.answers
        this.state.answers.industries = [] as string[];
      }

      submitClick() {
        // Make request

      }

    render() {
        return (
            <div className="App">
                <label htmlFor="sliderinput" >
                    <h4>5. Which industry of stocks are you interested in investing in?</h4>
                </label>
                {this.DropdownMultipleSelection()}
                <input type="submit" onClick={this.submitClick} value="Submit" />

            </div>
        )
    }
}


export default Questionnaire5