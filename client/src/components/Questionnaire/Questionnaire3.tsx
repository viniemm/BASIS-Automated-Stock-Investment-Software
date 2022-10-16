import { render } from '@testing-library/react'
import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

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

const DropdownSelection = () => (
  <Dropdown
    placeholder='Select Term'
    fluid
    selection
    options={termPeriods}
  />
)

class Questionnaire3 extends React.Component {
    render() {
        return (
            <div className="App">
                <label htmlFor="sliderinput" >
                    <h4>3. What is the estimated term period of the portfolio?</h4>
                </label>
                {DropdownSelection()}
            </div>
        )
    }
}


export default Questionnaire3