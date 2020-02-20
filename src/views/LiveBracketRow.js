import React from "react";
import GamerListing from "../views/GamerListing";

class LiveBracketRow extends React.Component {
    state = {
        positionPoints: [0, 100, 80, 60, 40, 30, 25, 20, 15, 10, 5],
        killPoints: [0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150]
    };

    handleChange = (event) => {
        this.props.updateBracketRoundScore(
            this.props.bracketId,
            this.props.gamerId,
            this.props.bracketGameNumber,
            event.currentTarget.name,
            event.currentTarget.value);
    }

    // When first blood checkbox is checked - update
    // TODO: disable all other FB checkboxes in bracket when one is checked
    handleFirstBlood = (event) => {
        this.props.updateBracketRoundScore(
            this.props.bracketId,
            this.props.gamerId,
            this.props.bracketGameNumber,
            'firstblood',
            event.currentTarget.checked);
    }

    //update total points for selected bracket
    //TODO: save total score to sttate and database
    totalScore = () => {
        const totalPoints = this.state.positionPoints[this.props.bracketScore.placement] + this.state.killPoints[this.props.bracketScore.kills];
        // this.props.updateBracketRoundScore(
        //     this.props.bracketId,
        //     this.props.gamerId,
        //     this.props.bracketGameNumber,
        //     'total',
        //     totalPoints);
        return totalPoints;
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
                    { this.totalScore() }
                </td>
            </tr>
        )
    }
}

export default LiveBracketRow;