import React from "react";
import ControlledSlider from "./Slider/Slider";
import Input from "./Input";
import "./styles.css";
import { Link, Route } from "react-router-dom";

// Constands for these for simplicity, would typically be props
const max = 10;
const min = 1;
const step = 1;
const value = 1;


class Questionnaire2 extends React.Component {
  state = {
    // Set state values to reflect consts/props
    sum: value,
    sliderSum: value,
    step: step
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
      </div>
    );
  }
}

export default Questionnaire2;
