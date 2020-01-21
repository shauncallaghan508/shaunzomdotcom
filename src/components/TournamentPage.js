import React from "react";
import base from "../base";
import BracketInfo from "./BracketInfo";

class TournamentPage extends React.Component {
    state = {
        tournament: {},
        brackets: {},
        editing: false
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
        });
    };

    toggleEdit = () => {
        this.setState(editing => ({
            editing: !this.state.editing
        }));
    }

    addBracket = async () => {
        const bracket = {
            name: "",
            director: "",
            gamers: {},
            location: "",
            tempid: Date.now()
        }
        this.createBracket(bracket);
    }

    handleChange = (event) => {
        const updatedTourney = {
            ...this.state.tournament,
            [event.currentTarget.name]: event.currentTarget.value
        };
        this.updateTourney(this.props.index, updatedTourney);
    };

    updateTourney = (key, updatedTourney) => {
        const tournament = updatedTourney;
        this.setState({ tournament });
    }

    updateBracket = (key, updatedBracket) => {
        const brackets = { ...this.state.brackets };
        brackets[key] = updatedBracket;
        this.setState({ brackets });
    };

    render() {
        const { date, desc, directorRuleset, image, name, playerRuleset, prize, status, prelims } = this.state.tournament;

        return(
            <main>
                <section className="tournament--info">
                    { this.state.editing &&
                        <div>
                            <input name="name" type="text" value={name} placeholder="Tournament Name" onChange={this.handleChange}/>
                            <input name="date" type="text" value={date} placeholder="Tournament Date" onChange={this.handleChange}/>
                            <input name="prize" type="text" value={prize} placeholder="Prize Pool" onChange={this.handleChange}/>
                            <select name="status" value={status} onChange={this.handleChange}>
                                <option value="">Set Status</option>
                                <option value="open">Open</option>
                                <option value="closed">Closed</option>
                            </select>
                            <textarea name="desc" value={desc} placeholder="Description of event" onChange={this.handleChange}/>
                            <textarea name="playerrules" value={playerRuleset} placeholder="Player Ruleset" onChange={this.handleChange}/>
                            <textarea name="directorrulesset" value={directorRuleset} placeholder="Director Ruleset" onChange={this.handleChange}/>
                            <input name="image" type="text" value={image} placeholder="Tournament Image" onChange={this.handleChange}/>
                            <button onClick={this.toggleEdit}>Save</button>
                        </div>
                    }
                    { !this.state.editing &&
                        <div>
                            <h1>{name}</h1>
                            <img src={image} alt={name} />
                            <div>{date}</div>
                            <div>${prize}</div>
                            <p>{desc}</p>
                            <div># of prelims: {prelims}</div>
                            <div>Status: {status}</div>
                            <p>Player Ruleset: {playerRuleset}</p>
                            <p>Director Ruleset: {directorRuleset}</p>
                            <button onClick={this.toggleEdit}>Edit</button>
                        </div>
                    }
                </section>
                <section>
                    <ul className="brackets">
                        {Object.keys(this.state.brackets).map(key => (
                            <BracketInfo
                                key={key}
                                index={key}
                                details={this.state.brackets[key]}
                                updateBracket={this.updateBracket}
                            />
                        ))}
                    </ul>
                    <button onClick={this.addBracket}>Add Bracket</button>
                </section>
            </main>
        );
    }
}

export default TournamentPage;