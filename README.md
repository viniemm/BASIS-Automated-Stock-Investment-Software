
![Logo](https://github.com/viniemm/BASIS-Automated-Stock-Investment-Software/blob/master/Images/basis%20logo.png?raw=true)


# BASIS Automated Stock Investment Software

## Abstract
BASIS Automated Stock Investment Software is a React and Django based web application that provides novice stock market investors with unique personalized equity stock portfolios from the NASDAQ and NYSE based on answers to set questions. BASIS determines a user’s risk threshold, time period of the investment, selected industries, acclimatization with market principles and preference towards growth or value investments based on these answers. The application utilizes the criteria to filter public stock data and generate portfolios using Modern Portfolio Theory (Markowitz 1952), Sharpe ratio optimization and efficient frontier calculations. It also lets users visualize the historical and overall performance of the portfolio. BASIS aims to level the playing field for newcomers in the investing world and give them the tools to compete in a volatile market.
## Introduction
- BASIS is a recursive acronym (like GNU: GNU is Not Unix) that stands for “BASIS Automated Stock Investment Software”. 
It is a web application that provides the user
with unique personalized stock portfolios based on answers the user provides to set
questions. The questions include, but are not limited to: 
- “What is your risk threshold?",
- "Have you invested in the stock market before?", 
- "What is the term period of the portfolio?". 
The project seeks to provide someone with little to no prior knowledge about
the stock market a personalized recommendation/portfolio fit for even the most
experienced investor. The application utilizes the answers to the questions to filter public
stock data in order to generate an example portfolio. It would also allow users to
visualize the historical performance of the portfolio if they chose to invest into particular
stocks. In addition, it would provide tools like filters on different properties of stocks to
analyze their performance.

- BASIS is a tool that is both user-friendly and geared towards everyone, including those with little to no stock knowledge. 
Many users may find investment in stock very
complicated and more of a gamble due to the idea of investing money and the number of
stocks that are available for purchase. However, based on the questionnaire provided to
the user, the application is able to generate an example of an easily-readable portfolio,
giving users recommendations on the stocks they would like to invest as well as options
to filter different stock datas based on the user’s preferences. This could benefit both
expert and novice investors, as they would be able to view the options and pick and
choose what they would like to invest in. The goal of this application is to make investing
easier and to minimize the losses users may face from investing.
- In order to generate the most ideal portfolio for the user, on top of considering the user’s answers from the questionnaire, BASIS would keep track of stock price history and all the related information about the stock in order to minimize the Sharpe ratio of a portfolio and maximize expected returns calculated using classical portfolio optimization methods.

## Methodology and Theory

![Harry Markowitz](https://www.investopedia.com/thmb/N2j_axLJmt8AYf8swmwvHdy5SEo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/harrymarkowitz_round2-1b3eb541bca840ffbe11c8c849f688da.png)

Harry Markowitz’s 1952 paper is the undeniable classic, which turned portfolio
optimization from an art into a science. The key insight is that by combining assets with
different expected returns and volatilities, one can decide on a mathematically optimal
allocation which minimises the risk for a target return – the set of all such optimal
portfolios is referred to as the efficient frontier.

![Efficient Frontier](https://github.com/robertmartin8/PyPortfolioOpt/raw/master/media/efficient_frontier_white.png?raw=true)

Although much development has been made in the subject, more than half a century
later, Markowitz's core ideas are still fundamentally important and see daily use in many
portfolio management firms. The main drawback of mean-variance optimization is that
the theoretical treatment requires knowledge of the expected returns and the future
risk-characteristics (covariance) of the assets. Obviously, if we knew the expected returns
of a stock life would be much easier, but the whole game is that stock returns are
notoriously hard to forecast. As a substitute, we can derive estimates of the expected
return and covariance based on historical data – though we do lose the theoretical
guarantees provided by Markowitz, the closer our estimates are to the real values, the
better our portfolio will be. (Martin)

## Technologies
- Frontend - React, TypeScript, and CSS
React is a JavaScript library used for building user interfaces in the frontend. BASIS
utilizes React to create communication channels between the client and the server
through fundamental API calls. React was implemented in TypeScript to ensure strong
typing and CSS was used in conjunction with these languages to improve aesthetics and
user experience. The visual graphics we provide to the user are built upon Recharts, a
React library, that plots the historical stock data for a user’s portfolio.
- Backend & Database - Python, Django Framework
The backend of BASIS relies on the Django framework to store multiple levels of financial
data that is queried in the portfolio calculation process. Additionally, Django provides the
foundation for our authentication system and the storage of user profile data, utilizing
Django’s JSON API when sending data to the client.
- Portfolio Analysis - Python
Portfolio analysis and allocation is achieved through the open source PyPortfolioOpt
package in Python. The selected stocks are weighted to achieve the maximum weighted
Sharpe ratio on the efficient frontier using Markowitz’s portfolio theory.
## Screenshots

![Screenshot 1](https://github.com/viniemm/BASIS-Automated-Stock-Investment-Software/blob/master/Images/sc1.png?raw=true)

![Screenshot 2](https://github.com/viniemm/BASIS-Automated-Stock-Investment-Software/blob/master/Images/sc2.png?raw=true)

![Screenshot 3](https://github.com/viniemm/BASIS-Automated-Stock-Investment-Software/blob/master/Images/sc3.png?raw=true)

![Screenshot 4](https://github.com/viniemm/BASIS-Automated-Stock-Investment-Software/blob/master/Images/sc4.png?raw=true)

## SOURCE Intersections Fall 2022 Poster

![Poster](https://github.com/viniemm/BASIS-Automated-Stock-Investment-Software/blob/master/Images/CSDS%20395_%20Intersections%20Poster.png?raw=true)

## Team pictures

![Team pic 1](https://raw.githubusercontent.com/viniemm/BASIS-Automated-Stock-Investment-Software/master/Images/team1.jpg)

![Team pic 1](https://raw.githubusercontent.com/viniemm/BASIS-Automated-Stock-Investment-Software/master/Images/team2.jpg)

## Authors

- [Vinayak Mathur](https://www.github.com/viniemm)
- [Oleksii Fedorenko](https://www.github.com/fedorenkood)
- [William Franzen](https://www.github.com/wfranzen)
- [William Haskey](https://www.github.com/whaskey)
- [Tarun Sepuri](https://www.github.com/tsepuri)
- [Eunseo Choo](https://www.github.com/eschoo)
- [Muhammed Demirak](https://www.github.com/mtdem)
- [Hunter Welch](https://www.github.com/hwelch)


## Acknowledgements
 - [PyPortfolioOpt](https://pyportfolioopt.readthedocs.io/en/latest/)
 - [Portfolio Selection, Harry Markowitz](https://www.jstor.org/stable/2975974?origin=crossref#metadata_info_tab_contents)
 - [Shuai Xu, Assistant Professor, Computer & Data Sciences, Case Western Reserve University](https://engineering.case.edu/profiles/sxx214)

