import React from "react";
import base from "../base";
import Header from "../views/Header";
import BracketInfo from "../views/BracketInfo";
import PointsTable from "../views/PointsTable";
import gamers from "../darwin-gamers";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

class TournamentPage extends React.Component {
    state = {
        tournament: {},
        brackets: {},
        editing: false,
        availableGamers: {},
        signedUpGamers: gamers
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
        this.setState({availableGamers: gamers});
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

    deleteBracket = (key) => {
        const brackets = { ...this.state.brackets };
        console.log(brackets[key].gamers)
        {  Object.keys(brackets[key].gamers).map(gamer => (
            this.addGamerToAvailable(gamer)
        ))}
        brackets[key] = null;
        this.setState({ brackets });
    };

    removeGamerFromAvailable = (key) => {
        console.log('removing ', this.state.availableGamers.key);
        const availableGamers = {...this.state.availableGamers};
        delete availableGamers[key];
        console.log('availablegamers ', availableGamers);
        this.setState({ availableGamers });
    }

    addGamerToAvailable = (key) => {
        const availableGamers = {
            ...this.state.availableGamers,
            [key]: this.state.signedUpGamers[key]
        };
        this.setState({ availableGamers });
    }

    render() {
        const { date, desc, directorRuleset, image, name, playerRuleset, prize, status, prelims } = this.state.tournament;

        return(
            <main>
                <Header />
                <div className="container">
                    <section className="tournament__header">
                        <h1 className="tournament-name">{name}</h1>
                    </section>
                    <section className="row">
                        <section className="tournament--info col-md-8">
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
                                <div className="tournament__infocard">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <img src={image} alt={name} className="objectfit" />
                                        </div>
                                        <div className="col-md-8">
                                            <div>{date}</div>
                                            <div>${prize}</div>
                                            <p>{desc}</p>
                                            <div># of prelims: {prelims}</div>
                                            <div>Status: {status}</div>
                                            <p>Player Ruleset: {playerRuleset}</p>
                                            <p>Director Ruleset: {directorRuleset}</p>
                                            <button onClick={this.toggleEdit}>Edit</button>
                                        </div>
                                    </div>
                                </div>
                            }
                        </section>
                        <section className="tournament__pointstable col-md-4">
                            <PointsTable />
                        </section>
                    </section>
                    <section>
                    <ul className="brackets row">
                        {Object.keys(this.state.brackets).map(key => (
                            <BracketInfo
                                key={key}
                                index={key}
                                details={this.state.brackets[key]}
                                updateBracket={this.updateBracket}
                                deleteBracket={this.deleteBracket}
                                availableGamers={this.state.availableGamers}
                                removeGamerFromAvailable={this.removeGamerFromAvailable}
                                signedUpGamers={this.state.signedUpGamers}
                                addGamerToAvailable={this.addGamerToAvailable}
                            />
                        ))}
                        <div className="bracket" onClick={this.addBracket}>
                            <div className="bracket__info add-bracket">
                                <FontAwesomeIcon icon={faPlus} size='10x'/>
                            </div>
                        </div>

                    </ul>

                </section>
                </div>
            </main>
        );
    }
}

export default TournamentPage;