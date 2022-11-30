import React from 'react';
// Class

interface DashboardProps {
  // only prop to pass in: auth state username and/or token (most likely, completely unsure)

  // next prop to pass in: not sure yet
}

// endpoint: /api/portfolio
// how to call?
// hypothesized logic:
//  1 - request portfolios for user from endpoint
//    a - if request successful, set the portfolios to the state
//    b - otherwise throw error
//  2 - if portfolios are empty, display text that links to /questionnaire to create a new portfolio (thus removing the need to have a questionnaire tab on the navbar)
//  3 - otherwise display portfolios as desired and add the "new portfolio" text/button somewhere on the page
function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

export default Dashboard;