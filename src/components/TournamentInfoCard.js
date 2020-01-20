import React from "react";

class GamerFullInfoCard extends React.Component {
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
            </li>
        )
    }
}

export default GamerFullInfoCard;