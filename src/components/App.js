import React from 'react';
import base from "../base";
import TournamentInfoCard from "./TournamentInfoCard";

class MainApp extends React.Component {
  state = {
    tournaments: {}
  };

  componentDidMount() {
    // const { params } = this.props.match;
    // //reinstate local storage
    // const localStorageRef = localStorage.getItem(params.tournaments);
    // if (localStorageRef) {
    //   this.setState({ order: JSON.parse(localStorageRef) });
    // }
    this.ref = base.syncState(`tournament`, {
      context: this,
      state: 'tournaments'
    });
  }

  goToTourneyMaker = event => {
    event.preventDefault();
    this.props.history.push(`/darwin/tourneymaker`);
  };

  render() {
    return (
      <div className="mainpage">
        <h1>ShaunZom.com</h1>
        <a href="/darwin">Darwin Project</a>
      </div>
    );
  }
}

export default MainApp;