import React from "react";
import ControlledSlider from "./Slider/Slider";
import Input from "./Input";
import "./styles.css";
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import { Route, Routes } from "react-router";
import Questionnaire3 from "./Questionnaire3";
import { Auth } from "../../features/authSlice";
import { RootState } from "../../app/store";

export interface QuestionnaireOutput {
  moneyInvested?: number,
  riskThreshold?: number,
  termPeriod?: string,
  investPrev?: boolean,
  industries?: string[]
}

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

// Constands for these for simplicity, would typically be props
const max = 10;
const min = 1;
const step = 1;
const value = 1;

class Questionnaire2 extends React.Component<QuestionnaireProps, QuestionnaireState> {
  state: QuestionnaireState = {
    answers: {},
    // Set state values to reflect consts/props
    sum: value,
    sliderSum: value,
    step: step
  };
  constructor(props: QuestionnaireProps) {
    super(props)
    this.state.answers = props.answers
    this.state.answers.riskThreshold = 1;
  }


  onInputChange = (value: string) => {
    if (value) {
      const sum = parseInt(value, 10);
      this.setState({
        sum: sum,
      })

      // Update slider with new value only if it’s within the sliders domain
      if (sum >= min && sum <= max) {
        this.setState({ sliderSum: sum });
      }
    } else {
      // Empty string is preferred when dealing with controlled components
      this.setState({ sum: "" });
    }
  };

  onSlideStart = (value: any) => {
    // Set the step value sent to the slider when the user starts dragging
    this.setState({ step: step });
  };

  onSliderChange = (value: string) => {
    const sum = parseInt(value, 10);
    // When the slider is changed, set both input and slider values to reflect new value
    this.setState({
      sum,
      sliderSum: sum,
      answers: {
        riskThreshold: sum
      }
    });
  };

  render() {
    return (
      <div className="App">
        <label htmlFor="sliderinput"
        >
          <h4>2. What is your risk threshold?</h4>
        </label>

        <Input
          type="text"
          name={"sliderinput"}
          id={"sliderinput"}
          value={this.state.sum}
          placeholder="5"
          onChange={(e: { target: { value: string; }; }) => this.onInputChange(e.target.value)}
          onFocus={() => this.setState({ step: 1 })} // When the input is focused, set step value to 1
        />
        <ControlledSlider
          min={min}
          max={max}
          step={this.state.step}
          defaultValue={this.state.sliderSum}
          onUpdate={(value: any) => this.onSliderChange(value)}
          onSlideStart={(value: any) => this.onSlideStart(value)}
        />

        <li>
          <Link to="/questionnaire3">Next Question</Link>
        </li>

        <Routes>
          <Route path="/questionnaire3" element={<Questionnaire3 answers={this.state.answers} />} />
        </Routes>
      </div>
    );
  }
}

export default Questionnaire2;
