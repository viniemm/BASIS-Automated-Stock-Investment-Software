import React, { useState } from "react";
import { Form, Input, Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import axios, { AxiosRequestConfig } from "axios";
import { Auth } from "../../features/authSlice";

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

export default function Questionnaire({ auth }: QuestionnaireProps) {
  const [moneyInvested, setMoneyInvested] = useState(100)
  const [riskThreshold, setRiskThreshold] = useState(1)
  const [termPeriod, setTermPeriod] = useState("")
  const [investPrev, setInvestPrev] = useState(false)
  const [industries, setIndustries] = useState([""])
  const [name, setName] = useState("")

  return (
    <Form >

      {/* Question 1 */}
      <Form.Field>
        <label>
          <h4>1. How much money are you willing to invest (In $)?</h4>
        </label>
        <input
          placeholder="Money Invested"
          onChange={(input) => {
            setMoneyInvested(+input.target.value)
          }}
        ></input>
      </Form.Field>

      {/* Question 2 */}
      <Form.Field>
        <label>
          <h4>2. What is your risk threshold?</h4>
        </label>
        <input
          placeholder="Risk Threshold"
          onChange={(input) => {
            setRiskThreshold(+input.target.value)
          }}
        ></input>
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