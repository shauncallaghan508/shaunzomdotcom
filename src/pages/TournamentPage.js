import React from "react";
import base from "../base";
import Header from "../views/Header";
import BracketInfo from "../views/BracketInfo";
import PointsTable from "../views/PointsTable";
import gamers from "../darwin-gamers";
import LiveBracket from "../views/LiveBracket";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

class TournamentPage extends React.Component {
    state = {
        tournament: {},
        editing: false,
        availableGamers: {},
        signedUpGamers: gamers,
        showDelete: false
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
        this.setState({availableGamers: gamers});
    }

    // handle changes when editing tournament
    handleChange = (event) => {
        const updatedTourney = {
            ...this.state.tournament,
            [event.currentTarget.name]: event.currentTarget.value
        };
        this.updateTourney(this.props.index, updatedTourney);
    };

    // show prompt for 'are you sure you want to delete?'
    showDeleteTournamentToggle = () => {
        this.setState(() => ({
            showDelete: !this.state.showDelete
        }));
    }

    // delete tournament from db
    deleteTournament = () => {
        const { params } = this.props.match;
        base.remove(`tournament/${params.tourneyId}`);
        this.props.history.push(`/darwin/`);
    }

    //setup new bracket to send to be created in db
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

    //creates new bracket in db
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

    //set tournament started to true if brackets are built
    //add bracket rounds to database for easier storing points later
    // TODO: check if brackets are full, not just created.  Show warning if not full.
    startTournament = () => {
        if (this.state.tournament.brackets) {
            const tournament = {...this.state.tournament}
            tournament.started = true
            this.addBracketRounds();
            this.setState({ tournament });
        } else {
            alert("You don't have any brackets!");
            return;
        }
    }

    // update tournament obj
    updateTourney = (key, updatedTourney) => {
        const tournament = updatedTourney;
        this.setState({ tournament });
    }

    updateBracket = (key, updatedBracket) => {
        console.log('updating bracket', key);
        const tournament = {...this.state.tournament }
        const brackets = tournament.brackets;
        brackets[key] = updatedBracket;
        this.setState({ tournament }, () => {console.log('state has been updated')});
    };

    deleteBracket = (key) => {
        const tournament = { ...this.state.tournament }
        const brackets = tournament.brackets;
        const availableGamers = { ...this.state.availableGamers }
        let gamersToAddBack = {};
        if ( brackets[key].gamers ) {
            {Object.keys(brackets[key].gamers).map(gamerId =>
                availableGamers[gamerId] = this.state.signedUpGamers[gamerId]
            )}
        }
        brackets[key] = null;
        this.setState({ tournament, availableGamers });
    };

    addGamerToBracket = (bracketId, gamerId) => {
        const tournament = { ...this.state.tournament }
        const bracketGamers = {
            ...tournament.brackets[bracketId].gamers,
            [gamerId]: this.state.signedUpGamers[gamerId]
        }
        tournament.brackets[bracketId].gamers = bracketGamers;
        this.setState({ tournament }, () => { this.removeGamerFromAvailable(gamerId) });

    }

    removeGamerFromBracket = (bracketId, gamerId) => {
        console.log('deleting', gamerId);
        const updatedTournament = { ...this.state.tournament }
        const bracketGamers = {...updatedTournament.brackets[bracketId].gamers}
        bracketGamers[gamerId] = null;
        updatedTournament.brackets[bracketId].gamers = bracketGamers;
        console.log('updated tournament ', updatedTournament);
        this.setState({ tournament: updatedTournament });
        this.addGamerToAvailable(gamerId);
    }

    removeGamerFromAvailable = (key) => {
        const availableGamers = {...this.state.availableGamers};
        delete availableGamers[key];
        this.setState({ availableGamers });
    }

    addGamerToAvailable = (gamerId) => {
        console.log('adding back to available ', gamerId);
        const availableGamers = {
            ...this.state.availableGamers,
            [gamerId]: this.state.signedUpGamers[gamerId]
        };
        this.setState({ availableGamers }, () => {return});
    }

    // when a new tournament is started, this creates the bracket rounds and scores set to
    // 0 so it's easier to update on change

    addBracketRounds = () => {
        const tournament = { ...this.state.tournament }
        {
            Object.keys(tournament.brackets).map(bracketIndex => {
                let bracketData = tournament.brackets[bracketIndex];
                bracketData.games = {};
                let bracketGamers = bracketData.gamers;
                let bracketGamerScores = {};

                    // bracketData.games['game' + gameIndex] = {}
                Object.keys(bracketGamers).map(gamerId => {
                    bracketGamerScores[gamerId]=
                        {
                            placement: 0,
                            kills: 0,
                            firstblood: false,
                            total: 0
                        }
                })
                for (let gameIndex = 1; gameIndex <= tournament.prelims; gameIndex++) {
                    bracketData.games['game' + gameIndex] = bracketGamerScores
                }
                bracketData.games['finals'] = bracketGamerScores
            })
        }
        this.updateTourney(this.props.index, tournament);
    }

    updateBracketRoundScore = (bracketId, gamerId, gameRound, statName, statValue) => {
        console.log('gamer: ', gamerId);
        console.log('bracket: ', bracketId);
        console.log('gameRound: ', gameRound);
        console.log('statName: ', statName);
        console.log('statValue: ', statValue);
        const tournament = { ...this.state.tournament }
        const updatedStat = {
                [gameRound]: {
                    [gamerId]: {[statName]: statValue}
                }
        }

        const gameDetails = {
            ...tournament.brackets[bracketId],
            games: updatedStat
        }

        console.log(tournament.brackets[bracketId]);

        tournament.brackets[bracketId] = gameDetails;

        console.log(tournament);

        this.updateTourney(this.props.index, tournament);
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
                                    <button onClick={this.showDeleteTournamentToggle}>Delete Tournament</button>
                                    { this.state.showDelete &&
                                        <div className="delete-prompt">
                                            <p>Bruv, are you absolutely fucking sure you want to delete this tournament?!</p>
                                            <button onClick={this.deleteTournament}>DELETE IT, YOU BITCH</button>
                                            <button onClick={this.showDeleteTournamentToggle}>Nah, I'm big dumb</button>
                                        </div>
                                    }
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
                            { !this.state.tournament.started &&
                                <button className="btn btn--success" onClick={this.startTournament}>Start Tournament</button>
                            }
                        </section>
                        <section className="tournament__pointstable col-md-4">
                            <PointsTable />
                        </section>
                    </section>
                    { !this.state.tournament.started &&
                        <section className="brackets-section">
                            <ul className="brackets row">
                                {this.state.tournament.brackets &&
                                    Object.keys(this.state.tournament.brackets).map(key => (
                                        <BracketInfo
                                            key={key}
                                            index={key}
                                            details={this.state.tournament.brackets[key]}
                                            updateBracket={this.updateBracket}
                                            deleteBracket={this.deleteBracket}
                                            availableGamers={this.state.availableGamers}
                                            signedUpGamers={this.state.signedUpGamers}
                                            gamersInBracket={this.state.tournament.brackets[key].gamers}
                                            addGamerToAvailable={this.addGamerToAvailable}
                                            addGamerToBracket={this.addGamerToBracket}
                                            removeGamerFromBracket={this.removeGamerFromBracket}
                                            gamersInBracketCount={Object.keys(this.state.tournament.brackets[key].gamers || 0).length}
                                        />
                                    ))
                                }
                                <div className="bracket" onClick={this.addBracket}>
                                    <div className="bracket__info add-bracket">
                                        <FontAwesomeIcon icon={faPlus} size='10x'/>
                                    </div>
                                </div>
                            </ul>
                        </section>
                    }
                    { this.state.tournament.started &&

                        <section className="brackets--live">

                        {
                            Object.keys(this.state.tournament.brackets).map(key => (
                                <LiveBracket
                                    key={key}
                                    index={key}
                                    gameCount={parseInt(this.state.tournament.prelims)}
                                    details={this.state.tournament.brackets[key]}
                                    gamersInBracket={this.state.tournament.brackets[key].gamers}
                                    updateBracketRoundScore={this.updateBracketRoundScore}
                                />
                            ))
                        }
                        </section>
                    }
                </div>
            </main>
        );
    }
}

export default TournamentPage;