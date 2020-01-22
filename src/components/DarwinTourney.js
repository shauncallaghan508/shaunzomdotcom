import React from "react";
import darwinGamers from '../darwin-gamers';
import GamerFullInfoCard from '../views/GamerFullInfoCard';
import base from "../base";

class DarwinTourney extends React.Component {
    state = {
        gamers: darwinGamers,
        tournaments: {}
    };
    render(){
        return(
            <main>
                <h1>Darwin Tourney</h1>
                <div className="current-tourneys">
                </div>
                <ul className="Gamers">
                    {Object.keys(this.state.gamers).map(key => (
                        <GamerFullInfoCard
                            key={key}
                            index={key}
                            details={this.state.gamers[key]}
                        />
                    ))}
                </ul>

            </main>
        )
    }
}

export default DarwinTourney;