import React from "react";
import GamerListing from "../views/GamerListing";

class LiveBracketRow extends React.Component {


    handleChange = (event) => {
        this.props.updateBracketRoundScore(
            this.props.bracketId,
            this.props.gamerId,
            this.props.bracketGameNumber,
            event.currentTarget.name,
            event.currentTarget.value);
    };

    handleFirstBlood = (event) => {
        this.props.updateBracketRoundScore(
            this.props.bracketId,
            this.props.gamerId,
            this.props.bracketGameNumber,
            'firstblood',
            event.currentTarget.checked);
    }

    render() {
        return (
            <tr>
                <td className="live-bracket__name">
                    <GamerListing
                        gamerId={this.props.gamerId}
                        gamerDetails={this.props.gamerDetails}
                    />
                </td>
                <td className="live-bracket__input">
                    <input type="text" name="placement" value={this.props.bracketScore.placement} onChange={this.handleChange}></input>
                </td>
                <td className="live-bracket__name">
                    <input type="text" name="kills" value={this.props.bracketScore.kills} onChange={this.handleChange}></input>
                </td>
                <td className="live-bracket__name">
                    <input type="checkbox" name="firstblood" checked={this.props.bracketScore.firstblood} onChange={this.handleFirstBlood}></input>
                </td>
                <td className="live-bracket__total">

                </td>
            </tr>
        )
    }
}

export default LiveBracketRow;