import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import { Route, Routes } from "react-router";
import Questionnaire5 from "./Questionnaire5";
import { QuestionnaireState, QuestionnaireProps } from "../../types/QuestionnaireTypes";

const answerOptions = [
  {
    key: 'Yes',
    text: 'Yes',
    value: 'Yes'
  },
  {
    key: 'No',
    text: 'No',
    value: 'No'
  },
]

class Questionnaire4 extends React.Component<QuestionnaireProps, QuestionnaireState> {
  state:QuestionnaireState = {
    answers: {},
  };

  UpdateInvestPrev = (invested:string) => {
    return this.setState({
      answers: {
        investPrev:(invested==="Yes")
      }
    })
  }

  DropdownSelection = () => (
    <Dropdown
      placeholder='Select Answer'
      fluid
      selection
      options={answerOptions}
      onChange={(e,data) => {this.UpdateInvestPrev(data.value as string)}}
    />
  )
  constructor(props:QuestionnaireProps) {
    super(props)
    this.state.answers = props.answers
    this.state.answers.investPrev = false;
  }

    render() {
        return (
            <div className="App">
                <label htmlFor="sliderinput" >
                    <h4>4. Have you invested in the stock market before?</h4>
                </label>
                {this.DropdownSelection()}

                <li>
                    <Link to="/questionnaire5">Next Question</Link>
                </li>

                <Routes>
                    <Route path="/questionnaire5" element={<Questionnaire5 answers={this.state.answers}/>} />
                </Routes>
            </div>
        )
    }
}


export default Questionnaire4