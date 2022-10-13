<<<<<<< HEAD
import React from 'react';
// Class or function
import * as React from 'react';
export default function Questionnaire() {
    return <h1>Questions</h1>
}
=======
import React from "react";
import ControlledSlider from "./Slider/Slider";
import Input from "./Input";
import "./styles.css";
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";
import { Route, Routes } from "react-router";
import Questionnaire2 from "./Questionnaire2";

// Constands for these for simplicity, would typically be props
const max = 10000;
const min = 1000;
const step = 100;
const value = 25000;
const step2 = 1;
const value2 = 8;

class Questionnaire extends React.Component {
  state = {
    // Set state values to reflect consts/props
    sum: value,
    sliderSum: value,
    step: step
  };
  state2 = {
    sum: value2,
    sliderSum: value2,
    step: step2
  };

  onInputChange = (value:string) => {
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
      sliderSum: sum
    });
  };

  render() {
    return (
      <div className="App">
        <label htmlFor="sliderinput"
        >
            <h4>1. How much money are you willing to invest?</h4>
        </label>
        
        <Input 
          type = "text"
          name={"sliderinput"}
          id={"sliderinput"}
          value= {this.state.sum}
          placeholder = "$10000"
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
            <Link to="/questionnaire2">Question 2</Link>
          </li>

          <Routes>
          <Route path="/questionnaire2" element={<Questionnaire2/>}/>
          </Routes>
      </div>
    );
  }
}

export default Questionnaire;
>>>>>>> cb3de07 (Added question 1)
