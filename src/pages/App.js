import React from 'react';
import base from "../base";
import Header from "../views/Header";

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
        <Header />
      </div>
    );
  }
}

export default MainApp;