import { lineHeight } from '@mui/system';
import React from 'react';
import './About.css'

export default function About() {
  return (
    <div className='About'>
      <span />
      <h1>ABOUT BASIS: </h1>
      <h3>
      BASIS is an application that provides stock recommendations for stock portfolios 
      based on answers provided by the client to pre-set questions. Users are paired with portfolios 
      that match their comfort with risk-tolerance without having to go through the hassle of researching
      investments and avoiding the expensive fees of wealth management firms. Users are 
      able to create various portfolios and could compare the stocks within the portfolio, compare 
      the datas from various portfolios. Users would fill out a Questionnaire page in order to 
      generate an example Portfolio based on their answers.
      </h3>
      <span />
      <h3>
      Users would fill out the Questionnaire Page in order to analyze their experience 
      and knowledge in stock exchange. After completing the Questionnaire, users would be able to
      obtain an example portfolio in which they could filter the stocks or change
       the visualization of the data as they please. Our algorithm to automatically pick best performing stocks 
       of the subset from the given criteria and risk threshold of the user. Filtering option would be
       available for the users once a portfolio has been generated
      </h3>
      <span />
      <h3>
        In the filtering page, each user would have the ability to use the analytics
         framework built into the website to see historical performance of their stock pics and portfolio.
        They would be able to visualize the correlations between different stock indicators like price, 
        volume, market cap, PE ratio, etc. They would also be able to filter out stocks based on different 
        criteria like industry, brokerage, and other stock indicators. 
      </h3>
      <span />
      <h3>
        The goal of this application is for anyone who is an amateur or an expert investor to 
        obtain an example portfolio of stocks based on their preferences that was obtained from their 
        answers in the Questionnaire Page.
      </h3>
    </div>
  );
}