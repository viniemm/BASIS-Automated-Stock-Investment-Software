import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import { Route, Routes } from "react-router";
import Questionnaire5 from "./Questionnaire5";

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

const DropdownSelection = () => (
  <Dropdown
    placeholder='Select Answer'
    fluid
    selection
    options={answerOptions}
  />
)

class Questionnaire4 extends React.Component {
    render() {
        return (
            <div className="App">
                <label htmlFor="sliderinput" >
                    <h4>4. Have you invested in the stock market before?</h4>
                </label>
                {DropdownSelection()}

                <li>
                    <Link to="/questionnaire5">Next Question</Link>
                </li>

                <Routes>
                    <Route path="/questionnaire5" element={<Questionnaire5/>} />
                </Routes>
            </div>
        )
    }
}


export default Questionnaire4