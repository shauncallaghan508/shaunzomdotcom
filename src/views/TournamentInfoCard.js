import React from "react";
import base from "../base";

class GamerFullInfoCard extends React.Component {
    state = {
        showDelete: false
    }

    showDeleteTournamentToggle = () => {
        this.setState(() => ({
            showDelete: !this.state.showDelete
        }));
    }

    deleteTournament = () => {
        base.remove(`tournament/${this.props.index}`);
    }

    render() {
        const { date, desc, directorRuleset, image, name, playerRuleset, prize, status } = this.props.details;
        return(
            <li>
                <h3>{name}</h3>
                <img src={image} alt={name}/>
                <div>{date}</div>
                <div>{prize}</div>
                <p>{desc}</p>
                <div>Status: {status}</div>
                <p>Player Ruleset: {playerRuleset}</p>
                <p>Director Ruleset: {directorRuleset}</p>
                <a href={'/darwin/tournament/'+ this.props.index}>View Tournament</a>
                {this.state.showDelete &&
                    <div className="delete-prompt">
                        <p>Bruv, are you absolutely fucking sure you want to delete this tournament?!</p>
                        <button onClick={this.deleteTournament}>DELETE IT, YOU BITCH</button>
                        <button onClick={this.showDeleteTournamentToggle}>Nah, I'm big dumb</button>
                    </div>
                }
                <button onClick={this.showDeleteTournamentToggle}>Delete Tournament</button>
            </li>
        )
    }
}

export default GamerFullInfoCard;