import React from "react";
import GamerListing from "../views/GamerListing";
import PropTypes from 'prop-types';
import LiveBracketRow from '../views/LiveBracketRow';

class LiveBracket extends React.Component {
    static propTypes = {
        details: PropTypes.shape({
            director: PropTypes.string,
            gamers: PropTypes.shape({
                director: PropTypes.bool,
                name: PropTypes.string.isRequired,
                discord: PropTypes.string,
                email: PropTypes.string,
                image: PropTypes.string,
                location: PropTypes.string,
                mainclass: PropTypes.string,
                notes: PropTypes.string,
                stream: PropTypes.string,
                tourneycount: PropTypes.number,
                twitter: PropTypes.string,
                uid: PropTypes.number
            }).isRequired,
            location: PropTypes.string,
            name: PropTypes.string,
            tempid: PropTypes.number
        }),
        index: PropTypes.string
    };

    createBracket = () => {
        let data = [];

        for(let i=1; i <= this.props.gameCount; i++) {
            data.push(
                <section className="live-bracket__table">
                    <table className="table live" key={i}>
                    <thead>
                        <tr>
                            <td>Player</td>
                            <td>#</td>
                            <td>Kills</td>
                            <td>FB</td>
                            <td>Total</td>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(this.props.details.gamers).map((value, index) => (
                                <LiveBracketRow
                                    key={index}
                                    gamerId={value}
                                    gamerDetails={this.props.gamersInBracket[value]}
                                    bracketId={this.props.index}
                                    bracketGameNumber={'game'+i}
                                    updateBracketRoundScore={this.props.updateBracketRoundScore}
                                    bracketScore={this.props.details.games['game'+i][value]}
                                />
                        ))}
                    </tbody>
                </table>
                </section>
            );
        }

        return data
    }

    render() {
        return (
            <section className="tournament__bracket">
                <h3>Game </h3>
                <h4>Director: {this.props.details.director}</h4>
                <h5>{this.props.details.name}</h5>
                <h5>{this.props.details.location}</h5>
                <section className="tournament-bracket__row row">

                    {this.createBracket()}

                    <section className="live-bracket__table">
                        <table className="table live">
                            <thead>
                                <tr>
                                    <td>Player</td>
                                    <td>Kill Tally</td>
                                    <td>FB Tally</td>
                                    <td>Total</td>
                                </tr>
                            </thead>
                            <tbody>
                            {Object.keys(this.props.details.gamers).map((value, index) => (
                                <tr key={index}>
                                    <td className="live-bracket__name">
                                        <GamerListing
                                            key={index}
                                            gamerId={value}
                                            gamerDetails={this.props.gamersInBracket[value]}
                                        />
                                    </td>
                                    <td className="live-bracket__input">

                                    </td>
                                    <td className="live-bracket__input">

                                    </td>
                                    <td className="live-bracket__total">

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        </table>
                    </section>
                </section>
            </section>
        )
    }
}

export default LiveBracket;