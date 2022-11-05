import React from 'react';
// Class
type DashboardState = {
    user: string
}
class Dashboard extends React.Component<unknown, DashboardState> {
  constructor(props:unknown) {
    super(props);
    this.state = {user: "red"};
  }
  render() {
    return <h2>This is where our portfolio dashboard will go!</h2>;
  }
}
export default Dashboard;