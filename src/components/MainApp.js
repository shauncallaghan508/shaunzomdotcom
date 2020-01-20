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
        <button onClick={this.goToTourneyMaker}>Create Darwin Tournament</button>
        <h2>Upcoming Tournaments</h2>
        <ul className="tournament-listings">
          {Object.keys(this.state.tournaments).map(key => (
            <TournamentInfoCard
              key={key}
              index={key}
              details={this.state.tournaments[key]}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default MainApp;