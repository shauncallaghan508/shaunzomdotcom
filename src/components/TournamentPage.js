import React from "react";
import base from "../base";
import BracketInfo from "./BracketInfo";

class TournamentPage extends React.Component {
    state = {
        tournament: {},
        brackets: {}
    };

    componentDidMount() {
        const { params } = this.props.match;
        //reinstate local storage
        const localStorageRef = localStorage.getItem(params.tournamentId);
        if (localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) });
        }
        base.syncState(`tournament/${params.tourneyId}`, {
            context: this,
            state: 'tournament'
        });
        base.syncState(`tournament/${params.tourneyId}/brackets`, {
            context: this,
            state: 'brackets'
        });
    }

    createBracket = bracket => {
        const { params } = this.props.match;
        return new Promise(resolve => {
            base.push(`tournament/${params.tourneyId}/brackets`, {
                data: bracket
            }).then(() => {
                console.log('bracket created');
            }).catch(err => {
                console.log('shit broke');
            });
            // a 2s delay will make any latency problems really noticeable
            // setTimeout(resolve, 2000);
        });
    };

    addBracket = async () => {
        const bracket = {
            name: "",
            director: "",
            gamers: {},
            tempid: Date.now()
        }
        this.createBracket(bracket);
    }

    render() {
        const { date, desc, directorRuleset, image, name, playerRuleset, prize, status, prelims } = this.state.tournament;

        return(
            <main>
                <section className="tournament--info">
                    <h1>{name}</h1>
                    <img src={image} alt={name} />
                    <div>{date}</div>
                    <div>${prize}</div>
                    <p>{desc}</p>
                    <div># of prelims: {prelims}</div>
                    <div>Status: {status}</div>
                    <p>Player Ruleset: {playerRuleset}</p>
                    <p>Director Ruleset: {directorRuleset}</p>
                </section>
                <section>
                    <button onClick={this.addBracket}>Add Bracket</button>
                    <ul className="brackets">
                        {Object.keys(this.state.brackets).map(key => (
                            <BracketInfo
                                key={key}
                                index={key}
                                details={this.state.brackets[key]}
                            />
                        ))}
                    </ul>
                </section>
            </main>
        );
    }
}

export default TournamentPage;