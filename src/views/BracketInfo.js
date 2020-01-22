import React from "react";
import GamerListing from "./GamerListing";

class BracketInfo extends React.Component {
    state = {
        editing: false,
        showAvailablePlayers: false,
        gamers: this.props.details.gamers || [],
        details: this.props.details
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

    addGamer = (key) => {
        const gamers = this.state.gamers.concat(key);
        this.setState({ gamers });
        const details = {...this.state.details};
        details.gamers = gamers;
        this.props.updateBracket(this.props.index, details);
        this.props.removeGamerFromAvailable(key);
    }

    removeGamer = (key) => {
        //Remove Gamer from bracket, add back to available
    }

    getGamerListingsMarkup () {
        if (!this.state.showAvailablePlayers) return

        return (
            <div className="tournament__available-players">
            {Object.keys(this.props.availableGamers).map(key => (
                <GamerListing
                    key={key}
                    index={key}
                    gamerName={this.props.availableGamers[key].name}
                    action="adding"
                    addGamer={this.addGamer}
                    gamerDetails={this.props.availableGamers[key]}
                />
            ))}
        </div>
        )
    }

    getPlayerListMarkup (action) {
        const removeGamer = this.removeGamer
        const firstTenGamers = this.state.gamers.slice(0, 10)
        return firstTenGamers.map((gamer, index) => {
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                        <GamerListing 
                            index={index} 
                            gamerName={ gamer } 
                            action={action} 
                            removeGamer={removeGamer}
                        />
                    </td>
                </tr>
            )
        })
    }

    render() {
        const { director, name, gamers, location, tempid } = this.props.details;

        // i don't know what the difference is between these two groups of gamer listings
        const editingPlayers = this.getPlayerListMarkup('editing')
        const otherPlayers = this.getPlayerListMarkup()
        const gamerListings = this.getGamerListingsMarkup()

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
                            <table>
                                <tbody>{ editingPlayers }</tbody>
                            </table>
                        </div>

                    { gamerListings }

                    { !this.state.showAvailablePlayers &&
                        <div><button onClick={this.toggleShowAvailablePlayers}>Add Players</button></div>
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
                            <table>
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
