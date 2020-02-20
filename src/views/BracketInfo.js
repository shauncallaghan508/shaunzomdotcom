import React from "react";
import GamerListing from "./GamerListing";

class BracketInfo extends React.Component {
    state = {
        editing: false,
        showAvailablePlayers: false,
        gamers: this.props.details.gamers || {},
    };

    handleChange = (event) => {
        const updatedBracket = {
            ...this.props.details,
            [event.currentTarget.name]: event.currentTarget.value
        };
        this.props.updateBracket(this.props.index, updatedBracket);
    };

    toggleEdit = () => {
        this.setState(editing => ({
            editing: !this.state.editing
        }));
        if (this.state.showAvailablePlayers) {
            this.setState(showAvailablePlayers => ({
                showAvailablePlayers: !this.state.showAvailablePlayers
            }));
        }
    }

    toggleShowAvailablePlayers = () => {
        this.setState(showAvailablePlayers => ({
            showAvailablePlayers: !this.state.showAvailablePlayers
        }));
    }

    getGamerListingsMarkup (action) {
        if (!this.state.showAvailablePlayers) return

        return (
            <div className="tournament__available-players">
                {Object.keys(this.props.availableGamers).map((value, key) => (
                    <GamerListing
                        key={key}
                        gamerId={value}
                        gamerDetails={this.props.availableGamers[value]}
                        action={action}
                        addGamerToBracket={this.props.addGamerToBracket}
                        bracketId={this.props.index}
                        bracketFull={this.props.gamersInBracketCount === 10}
                    />
                ))}
            </div>
        )
    }

    getPlayerListMarkup (action) {
        if (this.props.gamersInBracket) {
            return Object.keys(this.props.gamersInBracket).map((value, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                        <GamerListing
                            key={value}
                            bracketId={this.props.index}
                            gamerId={value}
                            gamerDetails={this.props.gamersInBracket[value]}
                            action={action}
                            removeGamerFromBracket={this.props.removeGamerFromBracket}/>
                        </td>
                    </tr>
            ))
        }
    }

    showAddPlayersBtn () {
        if (this.props.gamersInBracketCount !== 10) {
            return (<div><button onClick={this.toggleShowAvailablePlayers}>Add Players</button></div>)
        }
    }

    render() {
        const { director, name, location } = this.props.details;

        const editingPlayers = this.getPlayerListMarkup('editing');
        const addingPlayers = this.getGamerListingsMarkup('adding');
        const otherPlayers = this.getPlayerListMarkup();
        const showAddPlayersBtn = this.showAddPlayersBtn();

        return (
            <div className="bracket">
                { this.state.editing &&
                    <div className="bracket__info">
                        <div><button onClick={() => this.props.deleteBracket(this.props.index)}>Delete Bracket</button></div>
                        <div>Bracket Name: <input name="name" type="text" placeholder="Bracket Name" value={name} onChange={this.handleChange}/></div>
                        <div>Director: <input name="director" type="text" placeholder="Director Name" value={director} onChange={this.handleChange}/></div>
                        <div>Location: <select name="location" value={location} onChange={this.handleChange}>
                                <option value="">Select Location</option>
                                <option value="NA East">NA East</option>
                                <option value="NA West">NA West</option>
                                <option value="EU">EU</option>
                        </select></div>
                        <div>Players:
                            <table className="table">
                                <tbody>{ editingPlayers }</tbody>
                            </table>
                        </div>

                    { addingPlayers }

                    {!this.state.showAvailablePlayers &&
                        showAddPlayersBtn
                    }
                        <div><button onClick={this.toggleEdit}>Save</button></div>
                    </div>
                }
                { !this.state.editing &&
                    <div className="bracket__info">
                        <div>Bracket Name: {name}</div>
                        <div>Director: {director}</div>
                        <div>Location: {location}</div>
                        <div>Players:
                            <table className="table">
                                <tbody>{ otherPlayers }</tbody>
                            </table>
                        </div>
                        <button onClick={this.toggleEdit}>Edit</button>
                    </div>
                }
            </div>

        );
    }
}

export default BracketInfo;
