import { render } from '@testing-library/react'
import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import { Route, Routes } from "react-router";
import Questionnaire4 from "./Questionnaire4";
import { QuestionnaireState, QuestionnaireProps } from "../../features/types/QuestionnaireTypes";

const termPeriods = [
  {
    key: '<2 years',
    text: '<2 years',
    value: '<2 years'
  },
  {
    key: '2-5 years',
    text: '2-5 years',
    value: '2-5 years'
  },
  {
    key: '5-10 years',
    text: '5-10 years',
    value: '5-10 years'
  },
  {
    key: '10+ years',
    text: '10+ years',
    value: '10+ years'
  },
]



class Questionnaire3 extends React.Component<QuestionnaireProps, QuestionnaireState> {
  state: QuestionnaireState = {
    answers: {},
  };

  UpdateTerm = (newTerm: string) => {
    return this.setState({
      answers: {
        termPeriod: newTerm
      }
    })
  }

  DropdownSelection = () => (
    <Dropdown
      placeholder='Select Term'
      fluid
      selection
      options={termPeriods}
      onChange={(e, data) => { this.UpdateTerm(data.value as string) }}
    />
  )
  constructor(props: QuestionnaireProps) {
    super(props)
    this.state.answers = props.answers
    this.state.answers.termPeriod = '';
  }

  render() {
    
    return (
      <div className="App">
        <label htmlFor="sliderinput" >
          <h4>3. What is the estimated term period of the portfolio?</h4>
        </label>
        <form action = "/questionnaire4">
          <input required value={this.state.answers.termPeriod} className="hidden"/>
          {this.DropdownSelection()}
          <br />
          <input type = "submit"></input>
          </form>
        <Routes>
          <Route path="/questionnaire4" element={<Questionnaire4 answers={this.state.answers} />} />
        </Routes>
      </div>
    )
  }
}


export default Questionnaire3