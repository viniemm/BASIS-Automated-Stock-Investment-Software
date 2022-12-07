import React, { FormEvent, useState } from "react";
import { Form, Input, Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import axios, { AxiosRequestConfig } from "axios";
import { Auth } from "../../features/authSlice";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack"


interface QuestionnaireState {
  moneyInvested?: number,
  riskThreshold?: number,
  termPeriod?: string,
  investPrev?: boolean,
  industries?: string[],
  name?: string
}

export interface QuestionnaireProps {
  auth: Auth,
}

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

const riskValues = [
  {
    key: '1',
    text: '1',
    value: '1'
  },
  {
    key: '2',
    text: '2',
    value: '2'
  },
  {
    key: '3',
    text: '3',
    value: '3'
  },
  {
    key: '4',
    text: '4',
    value: '4'
  },
  {
    key: '5',
    text: '5',
    value: '5'
  },
  {
    key: '6',
    text: '6',
    value: '6'
  },
  {
    key: '7',
    text: '7',
    value: '7'
  },
  {
    key: '8',
    text: '8',
    value: '8'
  },
  {
    key: '9',
    text: '9',
    value: '9'
  },
  {
    key: '10',
    text: '10',
    value: '10'
  },
]

const investValues = [
  {
    key: '1000',
    text: '1000',
    value: '1000'
  },
  {
    key: '2000',
    text: '2000',
    value: '2000'
  },
  {
    key: '3000',
    text: '3000',
    value: '3000'
  },
  {
    key: '4000',
    text: '4000',
    value: '4000'
  },
  {
    key: '5000',
    text: '5000',
    value: '5000'
  },
  {
    key: '6000',
    text: '6000',
    value: '6000'
  },
  {
    key: '7000',
    text: '7000',
    value: '7000'
  },
  {
    key: '8000',
    text: '8000',
    value: '8000'
  },
  {
    key: '9000',
    text: '9000',
    value: '9000'
  },
  {
    key: '10000',
    text: '10000',
    value: '10000'
  },
]

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

function SendAlert(question:string) {
  return (
  <Stack>
    <Alert severity="error">Question {question} can not be <strong>blank</strong>.</Alert>
  </Stack>)
}

export default function Questionnaire({ auth }: QuestionnaireProps) {
  const [moneyInvested, setMoneyInvested] = useState(100)
  const [riskThreshold, setRiskThreshold] = useState(1)
  const [termPeriod, setTermPeriod] = useState("")
  const [investPrev, setInvestPrev] = useState(false)
  const [industries, setIndustries] = useState([""])
  const [name, setName] = useState("")
  let noQ1 = true

  return (
    <Form onSubmit={() => {
        const answers: QuestionnaireState = {
          moneyInvested,
          riskThreshold,
          termPeriod,
          investPrev,
          industries,
          name
        }
        console.log(moneyInvested)
        if (auth.isAuthenticated) {
          const config: AxiosRequestConfig = {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${auth.token}`
            }
          };
          // TODO: this.state.answers doesn't work
          const body = JSON.stringify({ answers: answers })
          axios.post('/api/questionnaire', body, config)
            .then(response => {
              console.log(response.data);
            })
            .catch(error => {
              console.log(error);
            });
    }}}>

      {/* Question 1 */}
      <Form.Field>
        <label>
          <h4>1. How much money are you willing to invest (In $)?</h4>
        </label>
        <Form.Dropdown
          placeholder='Select Amount to Invest'
          fluid
          selection
          options={investValues}
          onChange={(e, data) => { 
            if(data.value == undefined) {
              data.value = 100
            }
            noQ1 = false
            setMoneyInvested(+data.value
            ) 
          }}
        />
        { noQ1 && 
          <p style={{color: "red"}}>This field is required.</p>
        }
      </Form.Field>

      {/* Question 2 */}
      <Form.Field>
        <label>
          <h4>2. What is your risk threshold? (Where 1 is low risk and 10 is high risk tolerance)</h4>
        </label>
        <Dropdown
          placeholder='Select Risk'
          fluid
          selection
          options={riskValues}
          onChange={(e, data) => { 
            if(data.value == undefined) {
              data.value = 0
            }
            setRiskThreshold(+data.value) 
          }}
        />
      </Form.Field>

      {/* Question 3 */}
      <Form.Field>
        <label>
          <h4>3. What is the estimated term period of the portfolio?</h4>
        </label>
        <Dropdown
          placeholder='Select Term'
          fluid
          selection
          options={termPeriods}
          onChange={(e, data) => { setTermPeriod(data.value as string) }}
        />
      </Form.Field>

      {/* Question 4 */}
      <Form.Field>
        <label>
          <h4>4. Have you invested in the stock market before?</h4>
        </label>
        <Dropdown
          placeholder='Select Answer'
          fluid
          selection
          options={answerOptions}
          onChange={(e, data) => { 
            setInvestPrev((data.value as string) === "Yes") 
          }}
        />
      </Form.Field>

      {/* Question 5 */}
      <Form.Field>
        <label>
          <h4>5. Which industry of stocks are you interested in investing in?</h4>
        </label>
        <Dropdown 
          placeholder='Industries'
          fluid
          multiple
          selection
          options={options}
          onChange={(e, data) => { setIndustries(data.value as string[]) }}
        />
      </Form.Field>

      {/* Question 6 */}
      <Form.Field>
        <label>
          <h4>6. What would you like to name your portfolio?</h4>
        </label>
        <input 
          required
          placeholder="Portfolio name"
          onChange={(input) => {
            setName(input.target.value as string)
          }}
        ></input>
      </Form.Field>

      <Form.Button content='Submit' />
    </Form>
  )
}