import React from 'react';
import base from "../base";
import TournamentInfoCard from "./TournamentInfoCard";

class DarwinApp extends React.Component {
  state = {
    tournaments: {}
  };

  componentDidMount() {
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

export default DarwinApp;