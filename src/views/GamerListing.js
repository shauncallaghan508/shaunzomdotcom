import React from "react";
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

class GamerListing extends React.Component {
    static propTypes = {
        gamerDetails: PropTypes.shape({
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
        }),
        addGamer: PropTypes.func,
        removeGamer: PropTypes.func,
        action: PropTypes.string
    };

    render() {
        return (
            <div className={"gamer-listing " + (this.props.bracketFull ? 'disabled' : '')}>
                <span>{ this.props.gamerDetails.name }</span>
                { this.props.action === "editing" &&
                    <button className="interact-btn remove" onClick={() => this.props.removeGamerFromBracket(this.props.bracketId, this.props.gamerId)}>X</button>
                }
                { this.props.action === "adding" &&
                    <button className="interact-btn add" onClick={() => this.props.addGamerToBracket(this.props.bracketId, this.props.gamerId)} disabled={this.props.bracketFull}><FontAwesomeIcon icon={faPlus} /></button>
                }
            </div>
        )
    }
}

GamerListing.propTypes = {
    gamerDetails: PropTypes.object.isRequired
}

export default GamerListing;
