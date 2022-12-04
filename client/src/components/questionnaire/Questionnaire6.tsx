import { render } from '@testing-library/react'
import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import { Route, Routes } from "react-router";
import { QuestionnaireState, QuestionnaireProps } from "../../features/types/QuestionnaireTypes";
import axios, {AxiosRequestConfig} from "axios";
import Input from "./Input.js";




class Questionnaire6 extends React.Component<QuestionnaireProps, QuestionnaireState> {
  state: QuestionnaireState = {
    answers: {},
  };

  UpdateTerm = (newName: string) => {
    return this.setState({
      answers: {
        name: newName
      }
    })
  }

  constructor(props: QuestionnaireProps) {
    super(props)
    this.state.answers = props.answers
    this.state.answers.name = '';
  }
  submitClick = async () => {
    // Make request
    // await sendQuestionnaire(this.state.answers)
    //send user to new page
    console.log("Yo1");
    console.log(this.state.auth?.user);
    if (this.state.auth?.isAuthenticated) {
      const config: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${this.state.auth.token}`
        }
      };
      // TODO: this.state.answers doesn't work
      axios.post('/api/questionnaire', JSON.stringify({
        user: this.state.auth?.user,
        answers: this.state.answers
      }), config)
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
          <h4>6. What would you like to name your portfolio?</h4>
        </label>
        <form action = "/dashboard">
        <Input required
            type="text"
            name={"sliderinput"}
            id={"sliderinput"}
            value={this.state.sum}
            placeholder="Business Portfolio"
          />
          <br />
          <a>
          <input type="submit" onClick={this.submitClick} value="Submit" />
          </a>
          </form>
      </div>
    )
  }
}


export default Questionnaire6