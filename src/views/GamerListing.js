import React from "react";
import PropTypes from 'prop-types';

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
            <div className="gamer-listing">
                <span>{this.props.gamerDetails.name}</span>
                {this.props.action === "editing" &&
                    <span onClick={() => this.props.removeGamerFromBracket(this.props.index)}>X</span>
                }
                {this.props.action === "adding" &&
                    <span onClick={() => this.props.addGamerToBracket(this.props.index)}>Add</span>
                }
            </div>
        )
    }
}

GamerListing.propTypes = {
    gamerDetails: PropTypes.object.isRequired
}

export default GamerListing;
